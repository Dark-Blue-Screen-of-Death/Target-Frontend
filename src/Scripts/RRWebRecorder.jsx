import React, { useEffect, useState } from 'react'
import { record } from "rrweb";

function RRWebRecorder(props) {
    const accessToken = localStorage.getItem("accessToken");
    const [RRWebDataArray, setRRWebDataArray] = useState([]);
    const [RRwebSentData, setRRwebSentData] = useState();
    const [verified, setverified] = useState(false);
    const postReqRRweb = async () => {
        await fetch(import.meta.env.VITE_API_URL + "/rrweb", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            // credentials: 'include', // Ensure cookies are sent
            body: JSON.stringify({
                // data: RRwebSentData,
                deviceInfo: props.deviceInfo,
                fingerprint: props.fingerprint,
                canvasFingerprint: props.canvasFingerprint,
                ipaddress: props.ip,
            },
            )
        }).then((response) => {
            if (response.status === 200) {
                setverified(true)
            }
            if (!response.ok) {
                alert("403 Forbidden")
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the response as JSON
        })
            .then((data) => {
                console.log(data);
                if (data.accessToken) {
                    localStorage.setItem("accessToken", data.accessToken);
                }
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
        // console.log(RRWebDataArray);

        setRRwebSentData(RRWebDataArray)
    }, [RRWebDataArray]);
    useEffect(() => {
        postReqRRweb();
        // Set interval to run every 60 seconds (60000 ms)
        const intervalId = setInterval(postReqRRweb, 6000);
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [props]);
    if (verified === true) {
        // console.log(verified);
        return props.app.app
    }

}

export default RRWebRecorder