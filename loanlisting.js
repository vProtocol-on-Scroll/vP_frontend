// const { ethers } = require("ethers");
// const dotenv = require("dotenv");
// dotenv.config();



// // The ABI of your contract (you can import this from a JSON file or hardcode it)
// const peerABI = [

//         {
//             "type": "fallback",
//             "stateMutability": "nonpayable"
//         },
//         {
//             "type": "receive",
//             "stateMutability": "payable"
//         },
//         {
//             "type": "function",
//             "name": "closeListingAd",
//             "inputs": [
//                 {
//                     "name": "listingId",
//                     "type": "uint96",
//                     "internalType": "uint96"
//                 }
//             ],
//             "outputs": [],
//             "stateMutability": "nonpayable"
//         },
//         {
//             "type": "function",
//             "name": "createAndMatchLendingRequest",
//             "inputs": [
//                 {
//                     "name": "amount",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "interest",
//                     "type": "uint16",
//                     "internalType": "uint16"
//                 },
//                 {
//                     "name": "returnDuration",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "expirationDate",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "loanToken",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "collateralTokens",
//                     "type": "address[]",
//                     "internalType": "address[]"
//                 },
//                 {
//                     "name": "collateralAmounts",
//                     "type": "uint256[]",
//                     "internalType": "uint256[]"
//                 }
//             ],
//             "outputs": [
//                 {
//                     "name": "requestId",
//                     "type": "uint96",
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "matched",
//                     "type": "bool",
//                     "internalType": "bool"
//                 }
//             ],
//             "stateMutability": "payable"
//         },
//         {
//             "type": "function",
//             "name": "createLoanListingWithMatching",
//             "inputs": [
//                 {
//                     "name": "amount",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "minAmount",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "maxAmount",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "returnDuration",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "interest",
//                     "type": "uint16",
//                     "internalType": "uint16"
//                 },
//                 {
//                     "name": "loanCurrency",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "autoMatch",
//                     "type": "bool",
//                     "internalType": "bool"
//                 }
//             ],
//             "outputs": [
//                 {
//                     "name": "listingId",
//                     "type": "uint96",
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "matchedRequests",
//                     "type": "uint96[]",
//                     "internalType": "uint96[]"
//                 }
//             ],
//             "stateMutability": "payable"
//         },
//         {
//             "type": "function",
//             "name": "findMatchingLendingOffer",
//             "inputs": [
//                 {
//                     "name": "loanCurrency",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "amount",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "maxInterest",
//                     "type": "uint16",
//                     "internalType": "uint16"
//                 },
//                 {
//                     "name": "returnDuration",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "uint96",
//                     "internalType": "uint96"
//                 }
//             ],
//             "stateMutability": "view"
//         },
//         {
//             "type": "function",
//             "name": "isPositionLiquidatable",
//             "inputs": [
//                 {
//                     "name": "user",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "requestId",
//                     "type": "uint96",
//                     "internalType": "uint96"
//                 }
//             ],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "bool",
//                     "internalType": "bool"
//                 }
//             ],
//             "stateMutability": "view"
//         },
//         {
//             "type": "function",
//             "name": "liquidateUserRequest",
//             "inputs": [
//                 {
//                     "name": "requestId",
//                     "type": "uint96",
//                     "internalType": "uint96"
//                 }
//             ],
//             "outputs": [],
//             "stateMutability": "payable"
//         },
//         {
//             "type": "function",
//             "name": "repayLoan",
//             "inputs": [
//                 {
//                     "name": "requestId",
//                     "type": "uint96",
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "amount",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ],
//             "outputs": [],
//             "stateMutability": "payable"
//         },
//         {
//             "type": "function",
//             "name": "serviceRequest",
//             "inputs": [
//                 {
//                     "name": "requestId",
//                     "type": "uint96",
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "token",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ],
//             "outputs": [],
//             "stateMutability": "payable"
//         },
//         {
//             "type": "event",
//             "name": "LoanListingCreated",
//             "inputs": [
//                 {
//                     "name": "listingId",
//                     "type": "uint96",
//                     "indexed": true,
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "sender",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "tokenAddress",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "amount",
//                     "type": "uint256",
//                     "indexed": false,
//                     "internalType": "uint256"
//                 }
//             ],
//             "anonymous": false
//         },
//         {
//             "type": "event",
//             "name": "LoanRepayment",
//             "inputs": [
//                 {
//                     "name": "sender",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "id",
//                     "type": "uint96",
//                     "indexed": false,
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "amount",
//                     "type": "uint256",
//                     "indexed": false,
//                     "internalType": "uint256"
//                 }
//             ],
//             "anonymous": false
//         },
//         {
//             "type": "event",
//             "name": "RequestCreated",
//             "inputs": [
//                 {
//                     "name": "_borrower",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "requestId",
//                     "type": "uint96",
//                     "indexed": true,
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "_amount",
//                     "type": "uint256",
//                     "indexed": false,
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "_interest",
//                     "type": "uint16",
//                     "indexed": false,
//                     "internalType": "uint16"
//                 }
//             ],
//             "anonymous": false
//         },
//         {
//             "type": "event",
//             "name": "RequestLiquidated",
//             "inputs": [
//                 {
//                     "name": "requestId",
//                     "type": "uint96",
//                     "indexed": true,
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "lenderAddress",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "totalRepayment",
//                     "type": "uint256",
//                     "indexed": true,
//                     "internalType": "uint256"
//                 }
//             ],
//             "anonymous": false
//         },
//         {
//             "type": "event",
//             "name": "RequestServiced",
//             "inputs": [
//                 {
//                     "name": "_requestId",
//                     "type": "uint96",
//                     "indexed": true,
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "_lender",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "_borrower",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "_amount",
//                     "type": "uint256",
//                     "indexed": false,
//                     "internalType": "uint256"
//                 }
//             ],
//             "anonymous": false
//         },
//         {
//             "type": "event",
//             "name": "withdrawnAdsToken",
//             "inputs": [
//                 {
//                     "name": "sender",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "_orderId",
//                     "type": "uint96",
//                     "indexed": true,
//                     "internalType": "uint96"
//                 },
//                 {
//                     "name": "orderStatus",
//                     "type": "uint8",
//                     "indexed": true,
//                     "internalType": "uint8"
//                 },
//                 {
//                     "name": "_amount",
//                     "type": "uint256",
//                     "indexed": false,
//                     "internalType": "uint256"
//                 }
//             ],
//             "anonymous": false
//         },
//         {
//             "type": "error",
//             "name": "SafeERC20FailedOperation",
//             "inputs": [
//                 {
//                     "name": "token",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ]
//         }

// ];



// const erc20ABI = [
  
//         {
//             "type": "constructor",
//             "inputs": [
//                 {
//                     "name": "initialOwner",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ],
//             "stateMutability": "nonpayable"
//         },
//         {
//             "type": "function",
//             "name": "allowance",
//             "inputs": [
//                 {
//                     "name": "owner",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "spender",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ],
//             "stateMutability": "view"
//         },
//         {
//             "type": "function",
//             "name": "approve",
//             "inputs": [
//                 {
//                     "name": "spender",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "value",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "bool",
//                     "internalType": "bool"
//                 }
//             ],
//             "stateMutability": "nonpayable"
//         },
//         {
//             "type": "function",
//             "name": "balanceOf",
//             "inputs": [
//                 {
//                     "name": "account",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ],
//             "stateMutability": "view"
//         },
//         {
//             "type": "function",
//             "name": "decimals",
//             "inputs": [],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "uint8",
//                     "internalType": "uint8"
//                 }
//             ],
//             "stateMutability": "view"
//         },
//         {
//             "type": "function",
//             "name": "mint",
//             "inputs": [
//                 {
//                     "name": "to",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "amount",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ],
//             "outputs": [],
//             "stateMutability": "nonpayable"
//         },
//         {
//             "type": "function",
//             "name": "name",
//             "inputs": [],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "string",
//                     "internalType": "string"
//                 }
//             ],
//             "stateMutability": "view"
//         },
//         {
//             "type": "function",
//             "name": "owner",
//             "inputs": [],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ],
//             "stateMutability": "view"
//         },
//         {
//             "type": "function",
//             "name": "renounceOwnership",
//             "inputs": [],
//             "outputs": [],
//             "stateMutability": "nonpayable"
//         },
//         {
//             "type": "function",
//             "name": "symbol",
//             "inputs": [],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "string",
//                     "internalType": "string"
//                 }
//             ],
//             "stateMutability": "view"
//         },
//         {
//             "type": "function",
//             "name": "totalSupply",
//             "inputs": [],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ],
//             "stateMutability": "view"
//         },
//         {
//             "type": "function",
//             "name": "transfer",
//             "inputs": [
//                 {
//                     "name": "to",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "value",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "bool",
//                     "internalType": "bool"
//                 }
//             ],
//             "stateMutability": "nonpayable"
//         },
//         {
//             "type": "function",
//             "name": "transferFrom",
//             "inputs": [
//                 {
//                     "name": "from",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "to",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "value",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ],
//             "outputs": [
//                 {
//                     "name": "",
//                     "type": "bool",
//                     "internalType": "bool"
//                 }
//             ],
//             "stateMutability": "nonpayable"
//         },
//         {
//             "type": "function",
//             "name": "transferOwnership",
//             "inputs": [
//                 {
//                     "name": "newOwner",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ],
//             "outputs": [],
//             "stateMutability": "nonpayable"
//         },
//         {
//             "type": "event",
//             "name": "Approval",
//             "inputs": [
//                 {
//                     "name": "owner",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "spender",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "value",
//                     "type": "uint256",
//                     "indexed": false,
//                     "internalType": "uint256"
//                 }
//             ],
//             "anonymous": false
//         },
//         {
//             "type": "event",
//             "name": "OwnershipTransferred",
//             "inputs": [
//                 {
//                     "name": "previousOwner",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "newOwner",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 }
//             ],
//             "anonymous": false
//         },
//         {
//             "type": "event",
//             "name": "Transfer",
//             "inputs": [
//                 {
//                     "name": "from",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "to",
//                     "type": "address",
//                     "indexed": true,
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "value",
//                     "type": "uint256",
//                     "indexed": false,
//                     "internalType": "uint256"
//                 }
//             ],
//             "anonymous": false
//         },
//         {
//             "type": "error",
//             "name": "ERC20InsufficientAllowance",
//             "inputs": [
//                 {
//                     "name": "spender",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "allowance",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "needed",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ]
//         },
//         {
//             "type": "error",
//             "name": "ERC20InsufficientBalance",
//             "inputs": [
//                 {
//                     "name": "sender",
//                     "type": "address",
//                     "internalType": "address"
//                 },
//                 {
//                     "name": "balance",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 },
//                 {
//                     "name": "needed",
//                     "type": "uint256",
//                     "internalType": "uint256"
//                 }
//             ]
//         },
//         {
//             "type": "error",
//             "name": "ERC20InvalidApprover",
//             "inputs": [
//                 {
//                     "name": "approver",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ]
//         },
//         {
//             "type": "error",
//             "name": "ERC20InvalidReceiver",
//             "inputs": [
//                 {
//                     "name": "receiver",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ]
//         },
//         {
//             "type": "error",
//             "name": "ERC20InvalidSender",
//             "inputs": [
//                 {
//                     "name": "sender",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ]
//         },
//         {
//             "type": "error",
//             "name": "ERC20InvalidSpender",
//             "inputs": [
//                 {
//                     "name": "spender",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ]
//         },
//         {
//             "type": "error",
//             "name": "OwnableInvalidOwner",
//             "inputs": [
//                 {
//                     "name": "owner",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ]
//         },
//         {
//             "type": "error",
//             "name": "OwnableUnauthorizedAccount",
//             "inputs": [
//                 {
//                     "name": "account",
//                     "type": "address",
//                     "internalType": "address"
//                 }
//             ]
//         }
// ];

// // Your Ethereum RPC URL (e.g., Infura, Alchemy)
// const rpcURL = process.env.VITE_HTTP_RPC;  // Replace with your RPC URL

// // Your Ethereum address and private key (Make sure not to expose your private key in production!)
// const userAddress = "0xYourEthereumAddress"; // Replace with your Ethereum address
// const privateKey = "0xYourPrivateKey"; // Replace with your private key

// // Contract and token details
// const vProtocolContractAddress = "0xYourVProtocolContractAddress"; // Replace with your VProtocol contract address
// const tokenTypeAddress = "0xYourERC20TokenAddress"; // Replace with the ERC20 token address
// const tokenDecimal = 18; // Example token decimal (adjust to match the token's decimals)

// async function setupProviderAndSigner() {
//   // Set up the provider (using Infura or other JSON RPC provider)
//   const provider = new ethers.JsonRpcProvider(rpcURL);

//   // Set up the signer using the private key
//   const signer = new ethers.Wallet(privateKey, provider);

//   return { provider, signer };
// }

// function getVProtocolContract(signer) {
//   return new ethers.Contract(vProtocolContractAddress, peerABI, signer);
// }

// function getERC20Contract(signer, tokenAddress) {
//   return new ethers.Contract(tokenAddress, erc20ABI, signer);
// }

// // Create loan listing
// async function createLoanListing(_amount, _min_amount, _max_amount, _interest, _returnDate) {
//   try {
//     // Set up provider and signer
//     const { provider, signer } = await setupProviderAndSigner();
//     const contract = getVProtocolContract(signer);
//     const erc20Contract = getERC20Contract(signer, tokenTypeAddress);

//     // Convert amounts to Wei (Ethereum's smallest unit)
//     const _weiAmount = ethers.utils.parseUnits(_amount, tokenDecimal);
//     const _minAmountWei = ethers.utils.parseUnits(_min_amount, tokenDecimal);
//     const _maxAmountWei = ethers.utils.parseUnits(_max_amount, tokenDecimal);

//     console.log("Creating loan listing...");

//     // Check the allowance of the ERC-20 token
//     const allowance = await erc20Contract.allowance(userAddress, vProtocolContractAddress);
//     console.log("Current allowance:", allowance.toString());

//     // If allowance is insufficient, approve the contract
//     if (allowance.lt(_weiAmount)) {
//       console.log("Insufficient allowance. Approving tokens...");
//       const approvalTx = await erc20Contract.approve(vProtocolContractAddress, ethers.constants.MaxUint256);
//       await approvalTx.wait(); // Wait for the approval transaction to be mined
//       console.log("Approval successful!");
//     }

//     // Now, create the loan listing
//     const transaction = await contract.createLoanListingWithMatching(
//       _weiAmount,
//       _minAmountWei,
//       _maxAmountWei,
//       _returnDate,
//       _interest,
//       tokenTypeAddress
//     );

//     // Wait for the transaction to be mined
//     const receipt = await transaction.wait();

//     if (receipt.status) {
//       console.log(`${_amount} order successfully created!`);
//     } else {
//       console.log("Transaction failed.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// // Example usage
// const _amount = "1000"; // Amount in token units
// const _min_amount = "500"; // Min amount in token units
// const _max_amount = "2000"; // Max amount in token units
// const _interest = 5; // Interest rate in percentage
// const _returnDate = 1672444800; // Return date in Unix timestamp (seconds)

// createLoanListing(_amount, _min_amount, _max_amount, _interest, _returnDate);
