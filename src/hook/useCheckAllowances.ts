import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import { getERC20Contract } from "../api/contractsInstance";
import { readOnlyProvider } from "../api/provider";
import { envVars } from "../constants/config/envVars";


  
const useCheckAllowances = (tokenTypeAddress: string) => {
    const [allowanceVal, setAllowanceVal] = useState(0);
    const { address,isConnected,chainId } = useWeb3ModalAccount()

    useEffect(() => {
        const provider = readOnlyProvider
        const destination = envVars.vProtocolContractAddress
        
        // console.log("DESTINATION", destination);

        
        const contract = getERC20Contract(provider, tokenTypeAddress);

        contract
            .allowance(address, destination)
            .then((res) => {
                console.log("RESPONSESSSS", res);
                setAllowanceVal(Number(res))
            })
            .catch((err) => {
                console.error("error allowance status: ", err);
                setAllowanceVal(0);
            });
    }, [address, chainId, isConnected, tokenTypeAddress]);

    return allowanceVal;
}

export default useCheckAllowances;