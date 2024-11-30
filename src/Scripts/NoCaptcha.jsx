import React from 'react'
import useDeviceFingerprint from './ClientJSController';
import RRWebRecorder from './RRWebRecorder'
import GetIp from './GetIp';

function NoCaptcha() {
    const { fingerprint, deviceInfo } = useDeviceFingerprint();
    const ip = GetIp();

    return (
        <div>

            <RRWebRecorder fingerprint={fingerprint} ip={ip}/>
        </div>
    )
}

export default NoCaptcha