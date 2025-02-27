import { ethers } from "ethers";
import { envVars } from "../constants/config/envVars";

// read only provider pointing to sepolia. It allows read only access to the sepolia blockchain
export const readOnlyProvider = new ethers.JsonRpcProvider(
    envVars.httpRPC
);

// read/write provider, that allows you to read data and also sign transaction on whatever chain it's pointing to
export const getProvider = (provider: any) => new ethers.BrowserProvider(provider);

export const wssProvider = new ethers.WebSocketProvider(
    envVars.webSocketUrl
);