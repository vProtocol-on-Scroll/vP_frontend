import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { readOnlyProvider } from "../../api/provider";
import { getVProtocolContract } from "../../api/contractsInstance";
import peer from "../../abi/peer.json";
import { tokenData } from "../../constants/config/tokenData";

const fetchUserUtilities = async (address: string) => {
    if (!address) return null;

    const contract = getVProtocolContract(readOnlyProvider, peer);

    try {
        const collateralValue = await contract.getAccountCollateralValue(address);
        const healthFactor = await contract.getHealthFactor(address);
        
        // Fetch collateral deposits for different tokens
        const collateralDeposits = await Promise.all(
            tokenData.map(token => contract.getAddressToCollateralDeposited(address, token.address))
        );

        // Fetch USD values for tokens
        const tokenPrices = await Promise.all(
            tokenData.map(token => contract.getUsdValue(token.address, 1, 0))
        );

        // Fetch available balance for different tokens
        const availableBalances = await Promise.all(
            tokenData.map(token => contract.getAddressToAvailableBalance(address, token.address))
        );

        const totalAvailableBalance = await contract.getAccountAvailableValue(address);
        const userCollateralTokens = await contract.getUserCollateralTokens(address);

        // Process fetched values
        const formattedDeposits = collateralDeposits.map((deposit, index) =>
            Number(ethers.formatUnits(deposit, tokenData[index].decimal || 18))
        );

        const formattedPrices = tokenPrices.map(price => Number(ethers.formatEther(price)));
        const formattedAvailableBalances = availableBalances.map((balance, index) =>
            Number(ethers.formatUnits(balance, tokenData[index].decimal || 18))
        );

        // Calculate total collateral value
        const totalCollateralValue = formattedDeposits.reduce(
            (sum, deposit, index) => sum + deposit * formattedPrices[index],
            0
        );

        // console.log("availableBalances", availableBalances);
        
        return {
            collateralValue,
            healthFactor,
            collateralDeposits: formattedDeposits,
            tokenPrices: formattedPrices,
            availableBalances: formattedAvailableBalances,
            totalAvailableBalance,
            userCollateralTokens,
            totalCollateralValue,
        };
    } catch (error) {
        console.error("Error fetching user utilities:", error);
        throw new Error("Failed to fetch user data");
    }
};

const useGetUtilitiesPeer = () => {
    const { address, isConnected } = useWeb3ModalAccount();

    const { data, isLoading, error } = useQuery({
        queryKey: ['userUtilities', address],
        queryFn: () => fetchUserUtilities(address!),
        enabled: !!address && isConnected,
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false,
    });

    // console.log("availableBalances", data?.availableBalances);

    return { data, isLoading, error };
};

export default useGetUtilitiesPeer;


// const { data, isLoading, error } = useGetUtilitiesPeer();

// if (isLoading) return <p>Loading user data...</p>;
// if (error) return <p>Error fetching user data</p>;

// return (
//     <div>
//         <h2>User Collateral Information</h2>
//         <p>Collateral Value: {data?.collateralValue}</p>
//         <p>Health Factor: {data?.healthFactor}</p>
//         <p>Total Collateral Value (USD): {data?.totalCollateralValue}</p>
//         <p>Total Available Balance: {data?.totalAvailableBalance}</p>

//         <h3>Token Prices</h3>
//         {data?.tokenPrices.map((price, index) => (
//             <p key={index}>{tokenData[index].icon}: ${price}</p>
//         ))}

//         <h3>Collateral Deposited</h3>
//         {data?.collateralDeposits.map((deposit, index) => (
//             <p key={index}>{tokenData[index].icon}: {deposit}</p>
//         ))}

//         <h3>Available Balances</h3>
//         {data?.availableBalances.map((balance, index) => (
//             <p key={index}>{tokenData[index].icon}: {balance}</p>
//         ))}
//     </div>
// );