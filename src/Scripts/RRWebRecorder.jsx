import React, { useEffect, useState } from 'react'
import { record } from "rrweb";

function RRWebRecorder() {
    const [RRWebDataArray, setRRWebDataArray] = useState([]);
    const [RRwebSentData, setRRwebSentData] = useState();

    const postReqRRweb = () => {
        fetch("http://localhost:10000/rrweb", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(RRwebSentData)
        }).then(data => {
            // console.log(data)
            if (data.status === 200) {
                setRRWebDataArray([])
                setRRwebSentData([])
            }
        })
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