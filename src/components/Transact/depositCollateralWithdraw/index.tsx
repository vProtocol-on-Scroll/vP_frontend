import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tokenData as defaultTokenData } from "../../../constants/config/tokenData";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useGetUtilitiesPeer from "../../../hook/read/useGetUtilitiesPeer";
import { isSupportedChain } from "../../../constants/utils/chains";
import { getTokenBalance } from "../../../constants/utils/getBalances";
import useDepositCollateral from "../../../hook/write/useDepositCollateral";
import useGetUserPosition from "../../../hook/read/useGetUserPosition";
import ConnectPrompt from "../../shared/ConnectPrompt";
import useWithdrawPool from "../../../hook/write/useWithdrawPool";

const DepositCollateralWithdraw = () => {
	const { id } = useParams();

	const { isConnected, chainId, address } = useWeb3ModalAccount();

	const { data } = useGetUtilitiesPeer();
	const { totalCollateral,  } = useGetUserPosition()
	

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedToken, setSelectedToken] = useState(defaultTokenData[1]);
	const [updatedTokenData, setUpdatedTokenData] = useState(defaultTokenData);
	const [assetValue, setAssetValue] = useState<string | number>("");
	const [walletBalance, setWalletBalance] = useState(0);
	const [availableBal, setAvailableBal] = useState(0);
	const [fiatEquivalent, setFiatEquivalent] = useState<number>(0);

	const handleTokenSelect = (token: string) => {
		const selected = updatedTokenData.find((t) => t.token === token);
		if (selected) {
			setSelectedToken(selected);
			setIsDropdownOpen(false);
			updateFiatEquivalent(Number(assetValue), selected.tokenPrice);
		}
	};

	const handleAssetValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (!isNaN(Number(value)) && Number(value) >= 0) {
			setAssetValue(value);
			const selected = updatedTokenData.find((t) => t.name === selectedToken.name);
			updateFiatEquivalent(Number(value), selected?.tokenPrice ?? 0);
		}
	};

	// Handle max button click
	const handleMaxClick = () => {
		const maxAmount = id === "withdraw" ? Number(availableBal) : walletBalance;
		setAssetValue(maxAmount);
		updateFiatEquivalent(maxAmount, selectedToken.tokenPrice);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const updateFiatEquivalent = (amount: number, price: number) => {
		setFiatEquivalent(Number((amount * price).toFixed(2)));
	};

	useEffect(() => {
		const fetchBalance = async () => {
			if (isConnected && address && isSupportedChain(chainId)) {
				try {
					const bal = await getTokenBalance(
						address,
						selectedToken.address,
						selectedToken.decimal
					);
					setWalletBalance(Number(bal));
				} catch (error) {
					console.error("Error fetching balance:", error);
				}
			}
		};
		fetchBalance();

		if (totalCollateral) {
			const totalBalance = totalCollateral
			setAvailableBal(totalBalance);
		}

		if (data?.tokenPrices) {
			setUpdatedTokenData((prev) =>
				prev.map((token, index) => ({
					...token,
					tokenPrice: data.tokenPrices[index] ?? token.tokenPrice,
				}))
			);
		}
	}, [isConnected, address, chainId, selectedToken.address, selectedToken.decimal, data, totalCollateral]);
  
	const deposit = useDepositCollateral(selectedToken.address, String(assetValue), selectedToken.decimal, selectedToken.name)
	const withdrawal = useWithdrawPool(String(assetValue), selectedToken.address, selectedToken.decimal)
	
	if (!isConnected) {
		return (
			<div className="font-kaleko py-6 h-screen">
				<div className="w-full m-auto">
					<h3 className="text-base text-white px-2 mb-2">
						{id == "withdraw" ? "Withdraw" : "Deposit Collateral"}
					</h3>
					<ConnectPrompt />
				</div>      
			</div>
		)
	}

	const selected = updatedTokenData.find((t) => t.name === selectedToken.name);

	return (
		<div  className="flex flex-col justify-center items-center font-kaleko p-2 lg:p-0 h-screen 2xl:-mt-36 -mt-16 ">
			<div className="font-kaleko w-full m-auto bg-[#12151a] noise-3 p-5 rounded-xl">
				<p className="text-base text-white px-2 mb-2">
					{id == "withdraw" ? "Withdraw" : "Deposit Collateral"}
				</p>
				<div className="bg-white rounded-lg p-4 max-w-[456px] w-[456px] m-auto max470:w-[100%]">
					<div className="text-black flex justify-between mb-3 items-center">
						{/* Token Dropdown */}
						<div
							className="relative bg-black rounded-md p-2 gap-3 flex items-center cursor-pointer"
							onClick={toggleDropdown}
						>
							<div className="rounded-full px-1 py-[0.5px] flex items-center justify-center">
								<img
									src={selectedToken.icon}
									alt={selectedToken.token}
									width={18}
									height={18}
								/>
							</div>

							<div className="text-white text-xs">
								<p>{selectedToken.token}</p>
							</div>

							<div>
								<img
									src={"/icons/chevronDown.svg"}
									alt="dropdown indicator"
									width={10}
									height={5}
									className="text-[#A2A8B4]"
								/>
							</div>

							{isDropdownOpen && (
								<div
									className="absolute top-full left-0 mt-2 w-[100px] bg-gray-200 rounded-md z-20 p-2">
									{defaultTokenData.slice(1).map((token) => (
										<div
											key={token.token}
											onClick={() => handleTokenSelect(token.token)}
											className="flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-300"
										>
											<img
												src={token.icon}
												alt={token.token}
												width={14}
												height={14}
											/>
											<p className="text-black text-xs">{token.token}</p>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Asset value input with Max button */}
						<div className="flex items-center">
							<label htmlFor="assetValue" className="sr-only">
								Enter Amount
							</label>
							<input
								id="assetValue"
								type="text"
								value={assetValue}
								onChange={handleAssetValueChange}
								className="text-end bg-transparent w-28 border-b-2 border-gray-300 focus:border-[#7b55b9] focus:outline-none"
								placeholder="Enter amount"
								inputMode="decimal"
							/>
							{/* Max Button */}
							<button
								onClick={handleMaxClick}
								className="ml-2 bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded text-sm"
							>
								Max
							</button>
						</div>
					</div>

					{/* Wallet balance display */}
					<p className="text-xs text-gray-500 mb-2">
						{id === "withdraw" ? "" : "Wallet Balance: "}
						{id === "withdraw"
							? `${""}`
							: `${walletBalance} ${selectedToken.token}`}
					</p>

					{/* Price and Fiat Equivalent */}
					<div className="text-black text-xs flex justify-between">
						<p>{`1 ${selectedToken.token} = $${selected?.tokenPrice ?? selectedToken.tokenPrice}`}</p>
						<p className="font-bold">≈ ${fiatEquivalent}</p>
					</div>
				</div>


				{id == "withdraw" &&
					<div
						className={`w-full rounded-md px-6 py-2 text-center cursor-pointer bg-[#01D396] mt-6 font-bold`}
						onClick={() => {
							withdrawal();
						}}
					>
						Withdraw
					</div>
				}

				{id == "deposit-collateral" &&
					<div
						className={`w-full rounded-md px-6 py-2 text-center cursor-pointer bg-[#01D396] mt-6 font-bold`}
						onClick={() => {
							// console.log("COLLATERAL TO DEPOSIT DETAILS", assetValue, selectedToken.address, selectedToken.decimal);
							deposit();
						}}
					>
						Deposit Collateral
					</div>
				}
			</div>
		</div>
	);
};

export default DepositCollateralWithdraw;
