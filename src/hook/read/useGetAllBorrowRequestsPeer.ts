import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { getVProtocolContract } from '../../api/contractsInstance';
import { readOnlyProvider } from '../../api/provider';
import peer from "../../abi/peer.json";
import { Request } from './useGetUserActiveRequestPeer';
import { tokenData } from '../../constants/config/tokenData';

const fetchAllBorrowRequests = async (): Promise<Request[]> => {
    const contract = getVProtocolContract(readOnlyProvider, peer);
    let _index = 1;
    const fetchedRequests: Request[] = [];
    
    while (true) {
        try {
            const _request = await contract.getRequest(_index);
            console.log(`Fetched Request at ${_index}:`, JSON.stringify(_request, (key, value) => 
                typeof value === 'bigint' ? value.toString() : value, 2));


            if (!_request || _request[1] === "0x0000000000000000000000000000000000000000") {
                console.log(`Breaking at index ${_index} as author is zero.`);
                break;
            }

             const tokenInfo = tokenData.find(token => token.address.toLowerCase() === _request[8].toLowerCase()) || {
                name: "Unknown",
                icon: "/coins/unknown.svg",
                decimal:6,
            };

            const structuredRequest: Request = {
                requestId: Number(_request[0]),
                author: _request[1],
                amount: String(ethers.formatUnits(_request[2], tokenInfo.decimal)),
                interest: Number(_request[3]),
                totalRepayment: String(ethers.formatUnits(_request[4], tokenInfo.decimal)),
                returnDate: Number(_request[5]),
                expirationDate: Number(_request[6]),
                lender: _request[7],
                tokenAddress: _request[8],
                status: _request[9] === 0 ? 'OPEN' : _request[9] === 1 ? 'SERVICED' : 'CLOSED',
                tokenName: tokenInfo.name, 
                tokenIcon: tokenInfo.icon, 
            };

            fetchedRequests.push(structuredRequest);
            _index += 1;

        } catch (error) {
            console.error(`Error fetching request at index ${_index}:`, error);
            break;
        }
    }

    return fetchedRequests;
};
const useGetAllBorrowRequestsPeer = () => {
    const { address } = useWeb3ModalAccount();

      const { data: requests, isLoading, error } = useQuery({
        queryKey: ['allBorrowRequests'],
        queryFn: async () => {
            console.log("Fetching borrow requests...");
            return fetchAllBorrowRequests();
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });


    const othersRequests = requests?.filter(request =>
        request.status === 'OPEN' &&
        request.returnDate > Date.now() &&
        request.author !== address
    ) || [];

    const myBorrowOrder = requests?.filter(request => request.author === address) || [];
    

    return {
        isLoading,
        error,
        requests,
        othersRequests,
        myBorrowOrder,
    };
};


export default useGetAllBorrowRequestsPeer;

// const { isLoading, error, requests, filteredRequests, myBorrowOrder } = useGetAllBorrowRequestsPeer();
