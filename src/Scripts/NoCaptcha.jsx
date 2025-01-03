import React from 'react'
import useDeviceFingerprint from './ClientJSController';
import RRWebRecorder from './RRWebRecorder'
import GetIp from './GetIp';

function NoCaptcha(props) {
    const { fingerprint, deviceInfo,canvasFingerprint } = useDeviceFingerprint();
    const ip = GetIp();
    return (
        <div>
            <RRWebRecorder app={props} fingerprint={fingerprint} ip={ip} canvasFingerprint={canvasFingerprint} deviceInfo={deviceInfo}/>
            <h5>Device Fingerprint: {JSON.stringify(fingerprint)}</h5>
            deviceInfo: {JSON.stringify(deviceInfo)}
            <h5>IP Address: {JSON.stringify(ip.ip)}</h5>
        </div>
    )
}

export default NoCaptcha