import { useState, useEffect } from "react";
import { ClientJS } from 'clientjs';
import sha256 from 'crypto-js/sha256';


const getCanvasFingerprint = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("Hello World", 2, 2);
    return canvas.toDataURL(); // Get image data of the canvas
};

const useDeviceFingerprint = () => {
    const [fingerprint, setFingerprint] = useState(null);
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [canvasFingerprint, setcanvasFingerprint] = useState(null);
    const client = new ClientJS();
    useEffect(() => {
        const data = {
            // screenResolution: client.getScreenPrint(),
            colorDepth: client.getColorDepth(),
            deviceMemory: navigator.deviceMemory || "unknown",
            cores: navigator.hardwareConcurrency || "unknown",
            OS: client.getOS(),
            osVersion: client.getOSVersion(),
            CPU: client.getCPU(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            // languages: navigator.languages.join(","),
        };
        const rawString = Object.values(data).join(";");
        const fingerprint = sha256(rawString).toString();
        setFingerprint(fingerprint);
        setDeviceInfo(data);

        const cfData = getCanvasFingerprint();
        const cfDataHash = sha256(cfData).toString();
        setcanvasFingerprint(cfDataHash);
    }, []);

    return { fingerprint, deviceInfo, canvasFingerprint };
};

export default useDeviceFingerprint;
