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
            <h5>Device Fingerprint: {JSON.stringify(fingerprint)}</h5>
            <h5>IP Address: {JSON.stringify(ip.ip)}</h5>
        </div>
    )
}

export default NoCaptcha