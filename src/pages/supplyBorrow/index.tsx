import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenData as defaultTokenData } from "../../constants/config/tokenData";
import { percentages } from "../../constants/config/percentage";
import { isSupportedChain } from "../../constants/utils/chains";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getTokenBalance } from "../../constants/utils/getBalances";
import useGetUtilitiesPeer from "../../hook/read/useGetUtilitiesPeer";
import useSupply from "../../hook/write/useSupply";

const SupplyBorrow = () => {
	const { id } = useParams();
	const { isConnected, chainId, address } = useWeb3ModalAccount();


	const { data } = useGetUtilitiesPeer();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const [selectedToken, setSelectedToken] = useState(defaultTokenData[1]);
	const [updatedTokenData, setUpdatedTokenData] = useState(defaultTokenData);

	const [assetValue, setAssetValue] = useState<string | number>("0");
	const [fiatEquivalent, setFiatEquivalent] = useState<number>(0);
	const [selectedPercentage, setSelectedPercentage] = useState<number | null>(
		null
	);
	const [walletBalance, setWalletBalance] = useState(0);
	const [availableBal, setAvailableBal] = useState(0);

	const supply = useSupply(String(assetValue), selectedToken.address, selectedToken.decimal, selectedToken.name)


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

		if (data?.availableBalances) {
			const totalBalance = data.availableBalances.reduce(
				(acc, curr) => acc + curr,
				0
			);
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
	}, [
		isConnected,
		address,
		chainId,
		selectedToken.address,
		selectedToken.decimal,
		data,
	]);

	const handleAssetValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (!isNaN(Number(value)) && Number(value) >= 0) {
			setAssetValue(value);
			updateFiatEquivalent(Number(value), selectedToken.tokenPrice);
		}
	};

	// Update fiat equivalent
	const updateFiatEquivalent = (amount: number, price: number) => {
		setFiatEquivalent(Number((amount * price).toFixed(2)));
	};

	const handleTokenSelect = (token: string) => {
		const selected = updatedTokenData.find((t) => t.token === token);
		if (selected) {
			setSelectedToken(selected);
			setIsDropdownOpen(false);
			setSelectedPercentage(0);
			setAssetValue(0);
			updateFiatEquivalent(0, selected.tokenPrice);
		}
	};

	const handlePercentageClick = (percent: number) => {
		setSelectedPercentage(percent);
		const maxAmount =
			id === "borrow"
				? availableBal * 0.79 * (percent / 100)
				: walletBalance * (percent / 100);
		setAssetValue(maxAmount);
		updateFiatEquivalent(maxAmount, selectedToken.tokenPrice);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className="flex flex-col justify-center items-center font-kaleko p-2 lg:p-0 h-screen -mt-36 w-full max-w-[1152px]">
			<div className="font-kaleko w-full m-auto">
				<p className="text-base text-white px-2 mb-2">
					{id == "supply" ? "Supply" : "Borrow"}
				</p>

				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="w-full">
						<div className="bg-[#E8E8E8] rounded-xl p-3">
							<p className="mb-2 text-base text-[#808080]">I will deposit</p>

							<div className="bg-white rounded-xl p-2">
								<div className="flex items-start w-full mb-4">
									{/* Left Section - Input & Max Button */}
									<div className="">
										<div className="text-black font-bold text-lg flex items-end gap-2">
											<label htmlFor="assetValue" className="sr-only">
												Enter Amount
											</label>
											<input
												id="assetValue"
												type="text"
												value={assetValue}
												onChange={handleAssetValueChange}
												className="bg-transparent w-28 border-b-2 border-gray-300 focus:border-[#7b55b9] focus:outline-none"
												inputMode="decimal"
											/>
											<p className="text-xs font-light">
												Bal: {id === "supply" ? walletBalance : availableBal}
											</p>
										</div>
										<div className="text-[#808080] text-sm font-normal">
											≈ ${fiatEquivalent}
										</div>
									</div>

									<div
										onClick={toggleDropdown}
										className="flex items-center gap-2 ml-auto cursor-pointer relative"
									>
										<img
											src={selectedToken.icon}
											alt={selectedToken.token}
											width={32}
											height={32}
										/>
										<p className="text-[#0A0A0A] text-[18.91px]">
											{selectedToken.token}
										</p>
										<img
											src={"/icons/chevron.svg"}
											alt="token"
											width={10}
											height={11}
											className="mx-2"
										/>
										{isDropdownOpen && (
											<div className="absolute top-full right-0 mt-4 w-[140px] bg-[#E8E8E8] rounded-lg z-20">
												{defaultTokenData.slice(1).map((token) => (
													<div
														key={token.token}
														onClick={() => handleTokenSelect(token.token)}
														className="flex gap-2 items-center p-3 cursor-pointer hover:bg-[#808080]"
													>
														<img
															src={token.icon}
															alt={token.token}
															width={32}
															height={32}
														/>
														<p className="text-black text-[18.91px]">
															{token.token}
														</p>
													</div>
												))}
											</div>
										)}
									</div>
								</div>

								<div className="grid grid-cols-4 gap-4">
									{percentages.map((percentage) => (
										<button
											key={percentage}
											className={`text-[#808080] h-10 text-base border-2 rounded-xl hover:bg-gray-50 transition-colors ${
												selectedPercentage === percentage
													? "border-black"
													: "border-[#e8e8e8]"
											}`}
											onClick={() => handlePercentageClick(percentage)}
										>
											{percentage}%
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="w-full">
						<div className="bg-[#E8E8E8] rounded-xl p-3">
							<p className="mb-2 text-base text-[#808080]">Overview</p>

							<div className="bg-white rounded-xl p-2">
								<div className=" text-[#171717] p-2">
									<p>vPool</p>
								</div>

								<div className=" text-[#808080] border-y border-[#E8E8E8]">
									<div className="p-2 flex items-center justify-between">
										<div className="flex items-center gap-4 pr-2">
											<div>
												<img
													src={selectedToken.icon}
													alt={selectedToken.token}
													width={32}
													height={32}
												/>
											</div>

											<div className="flex items-baseline gap-[1px] flex-col">
												<p className="text-[15.13px]">{selectedToken.name}</p>
												<p className="text-[#171717] text-xl">{assetValue}</p>
												<p className="text-xs">${fiatEquivalent}</p>
											</div>
										</div>

										<div>
											<img
												src="/icons/meter2.svg"
												alt="Meter"
												className="w-9 h-[25.2px]"
											/>
										</div>
									</div>
								</div>

								<div className="space-y-4 p-2 py-3">
									<div>
										<h3 className="text-[#808080] text-[15.38px] mb-1">
											{id === "borrow" ? "Borrow APR" : "Supply APY"}
										</h3>
										<p className="text-xl text-[#0A0A0A]">5.359%</p>
									</div>

									<div className="pb-4">
										<h3 className="text-[#808080] text-[15.38px] mb-1">
											{id === "borrow" ? "Monthly Cost" : "Monthly yield"}
										</h3>
										<p className="text-xl text-[#0A0A0A]">$120.37</p>
									</div>
								</div>
							</div>
						</div>

						{id === "borrow" &&
							<div
								className={`w-full rounded-md px-6 py-2 text-center cursor-pointer bg-[#01D396] mt-4 font-bold`}
							>
								Borrow Now
							</div>
						}
						{id !== "borrow" &&
							<div
								onClick={() => {
									// console.log("SUPPLY DETAILS", assetValue, selectedToken.address, selectedToken.decimal);
									supply()
								}}
								className={`w-full rounded-md px-6 py-2 text-center cursor-pointer bg-[#01D396] mt-4 font-bold`}
							>
								Start Earning
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SupplyBorrow;
