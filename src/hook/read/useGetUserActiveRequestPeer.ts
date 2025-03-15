import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useQuery } from "@tanstack/react-query";
import { readOnlyProvider } from "../../api/provider";
import { getVProtocolContract } from "../../api/contractsInstance";
import getters from "../../abi/getters.json";
import { tokenData } from "../../constants/config/tokenData";
import { ethers } from "ethers";

export interface Request {
	requestId: number;
	author: string;
	amount: string;
	interest: number;
	totalRepayment: string;
	returnDate: number;
	expirationDate: number;
	lender: string;
	tokenAddress: string;
	status: string;
	tokenName?: string,
	tokenIcon?: any,
	tokenDecimal: number,
}

const fetchUserActiveRequestsPeer = async (address: string | undefined): Promise<Request[]> => {
	if (!address) return [];

	const contract = getVProtocolContract(readOnlyProvider, getters);
	const res = await contract.getUserActiveRequests(address);

	return res.map((req: any) => {
		const tokenInfo = tokenData.find(token => token.address.toLowerCase() === req[8].toLowerCase()) || {
			name: "Unknown",
			icon: "/coins/unknown.svg",
			decimal: 6,
		};

		// console.log("REQQQ",req[6]);
		

		return {
			requestId: Number(req[0]),
			author: req[1],
			amount:  String(ethers.formatUnits(req[2], tokenInfo.decimal)),
			interest: Number(req[3]), 
			totalRepayment: String(req[4]), 
			returnDate: Number(req[5]), 
			expirationDate: Number(req[6]), 
			lender: req[7],
			tokenAddress: req[8], 
			status: Number(req[10]) === 0 ? 'OPEN' : Number(req[10]) === 1 ? 'SERVICED' : 'CLOSED',
			tokenName: tokenInfo.name,
			tokenIcon: tokenInfo.icon,
			tokenDecimal: tokenInfo.decimal,
		};
	});
};

const useGetUserActiveRequestPeer = () => {
	const { address } = useWeb3ModalAccount();

	return useQuery({
		queryKey: ["userActiveRequests", address],
		queryFn: () => fetchUserActiveRequestsPeer(address),
		enabled: !!address,
		staleTime: 1000 * 60 * 5, 
		refetchOnWindowFocus: false, 
	});
};

export default useGetUserActiveRequestPeer;


// const { data: activeRequests, isLoading, error } = useGetUserActiveRequestPeer();

