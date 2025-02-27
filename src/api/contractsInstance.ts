import { ethers } from "ethers";
import { envVars } from "../constants/config/envVars";
import multicall2 from "../abi/multicall2.json"
import erc20 from "../abi/erc20.json"



export const getLendbitContract = (providerOrSigner: ethers.Provider | ethers.Signer, PoolorPerrAbi : any) =>
    new ethers.Contract(
        envVars.vProtocolContractAddress || "",
        PoolorPerrAbi,
        providerOrSigner
    );

export const getMulticallContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
    new ethers.Contract(
        envVars.multicallContract || "",
        multicall2,
        providerOrSigner
    );

export const getERC20Contract = (providerOrSigner: ethers.Provider | ethers.Signer, tokenAddress: string) =>
    new ethers.Contract(
        tokenAddress,
        erc20,
        providerOrSigner
    );