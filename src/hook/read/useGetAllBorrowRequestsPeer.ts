import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { getVProtocolContract } from '../../api/contractsInstance';
import { readOnlyProvider } from '../../api/provider';
import peer from "../../abi/peer.json";
import { Request } from './useGetUserActiveRequestPeer';


const fetchAllBorrowRequests = async (): Promise<Request[]> => {
    const contract = getVProtocolContract(readOnlyProvider, peer);
    let _index = 1;
    const fetchedRequests: Request[] = [];

    while (true) {
        try {
            const _request = await contract.getRequest(_index);

            if (_request[0] === 0) break;

            const structuredRequest: Request = {
                requestId: Number(_request[0]),
                author: _request[1],
                amount: String(ethers.formatEther(_request[2])),
                interest: Number(_request[3]),
                totalRepayment: String(ethers.formatEther(_request[4])),
                returnDate: Number(_request[5]),
                expirationDate: Number(_request[6]),
                lender: _request[7],
                tokenAddress: _request[8],
                status: _request[9] === 0 ? 'OPEN' : _request[9] === 1 ? 'SERVICED' : 'CLOSED',
            };

            fetchedRequests.push(structuredRequest);
            _index += 1;
        } catch (error) {
            console.error("Error fetching borrow requests:", error);
            break;
        }
    }

    return fetchedRequests;
};

const useGetAllBorrowRequestsPeer = () => {
    const { address } = useWeb3ModalAccount();

    // Fetch all borrow requests using TanStack Query
    const { data: requests, isLoading, error } = useQuery({
        queryKey: ['allBorrowRequests'],
        queryFn: fetchAllBorrowRequests,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        refetchOnWindowFocus: false, // Prevent refetch on window focus
    });

    // Filter requests based on user conditions
    const filteredRequests = requests?.filter(request =>
        request.status === 'OPEN' &&
        request.returnDate > Date.now() &&
        request.author !== address
    ) || [];

    // User's own borrow requests
    const myBorrowOrder = requests?.filter(request => request.author === address) || [];

    return {
        isLoading,
        error,
        requests,
        filteredRequests,
        myBorrowOrder,
    };
};

export default useGetAllBorrowRequestsPeer;

// const { isLoading, error, requests, filteredRequests, myBorrowOrder } = useGetAllBorrowRequestsPeer();
