import React, { useEffect, useState } from 'react'
import { record } from "rrweb";

function RRWebRecorder(props) {
    const [RRWebDataArray, setRRWebDataArray] = useState([]);
    const [RRwebSentData, setRRwebSentData] = useState();

    const postReqRRweb = async () => {
        await fetch(import.meta.env.VITE_API_URL+"/rrweb", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // data: RRwebSentData,
                deviceInfo:props.deviceInfo,
                fingerprint:props.fingerprint,
                canvasFingerprint:props.canvasFingerprint,
                ipaddress:props.ip
            })
        }).then((response) => {
            console.log(response);
            if (!response.ok) {
                alert("403 Forbidden")
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
        })
            .then((data) => {
                setRRWebDataArray([])
                setRRwebSentData([])
            })
            .catch((error) => {
                console.error('Error fetching token:', error);
            });
    }


    useEffect(() => {
        // Start recording on mount
        const stopRecording = record({
            emit(event) {
                setRRWebDataArray((prev) => [...prev, event]);
            },
            recordOptions: {
                recordMouseMove: true, // Record mouse movements
                recordKeydown: true,   // Record keystrokes
                recordScroll: true,    // Record scroll events
            },
        });
        return () => {
            stopRecording();
        };
    }, []);
    useEffect(() => {
        console.log(RRWebDataArray);

        setRRwebSentData(RRWebDataArray)
    }, [RRWebDataArray]);
    useEffect(() => {
        // Set interval to run every 60 seconds (60000 ms)
        const intervalId = setInterval(postReqRRweb, 6000);
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [RRwebSentData]);

    return (
        <div></div>
    )
}

export default RRWebRecorder