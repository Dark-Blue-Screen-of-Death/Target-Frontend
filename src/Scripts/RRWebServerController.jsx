import React, { useState } from 'react'
import { useEffect } from 'react'

function RRWebServerController(url, data) {
    const [RRWebDataArray, setRRWebDataArray] = useState(data);
    const [response, setresponse] = useState(null);

    useEffect(() => {
        // Set interval to run every 60 seconds (60000 ms)
        const intervalId = setInterval(myFunction, 600);
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [url]);


    const myFunction = () => {
        const data = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(RRWebDataArray)
        }).then(data => {
            setresponse(data)
            console.log(data)
        })
    }
    return { response }
}

export default RRWebServerController