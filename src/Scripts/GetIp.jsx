const { useEffect, useState } = require("react");


const GetIp = () => {
    const [ip, setIp] = useState("");
    useEffect(() => {
        // Fetch public IP
        fetch("https://api.ipify.org?format=json")
            .then((response) => response.json())
            .then((data) => setIp(data.ip))
            .catch((err) => console.error("Failed to fetch IP:", err));
    }, []);
    return {ip};
}

export default GetIp;
