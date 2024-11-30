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

    const client = new ClientJS();
    useEffect(() => {
        const data = {
            // screenResolution: client.getScreenPrint(),
            colorDepth: client.getColorDepth(),
            deviceMemory: navigator.deviceMemory || "unknown",
            cores: navigator.hardwareConcurrency || "unknown",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            canvasFingerprint: getCanvasFingerprint(),

            // languages: navigator.languages.join(","),
        };

        // Combine and hash the data
        const rawString = Object.values(data).join(";");
        const fingerprint = sha256(rawString).toString();
        setFingerprint(fingerprint);
        setDeviceInfo(data);
}, []);

return { fingerprint, deviceInfo };
};

export default useDeviceFingerprint;
