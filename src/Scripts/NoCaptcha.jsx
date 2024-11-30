import React from 'react'
import useDeviceFingerprint from './ClientJSController';
import RRWebRecorder from './RRWebRecorder'

function NoCaptcha() {
    const { fingerprint, deviceInfo } = useDeviceFingerprint();


    return (
        <div>

            <RRWebRecorder fingerprint={fingerprint} />
        </div>
    )
}

export default NoCaptcha