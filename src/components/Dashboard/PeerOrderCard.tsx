import { OrderCardProps } from "../../constants/types";
import { useEffect, useRef, useState } from "react";
import useRepayPeer from "../../hook/write/useRepayPeer";
import useCloseListingAd from "../../hook/write/useCloseListingAd";
import { formatMoney } from "../../constants/utils/formatMoney";

const PeerOrderCard: React.FC<OrderCardProps> = ({
	type,
	token,
	icon,
	amount,
	amountUSD,
	expiry,
	profitOrInterestValueUSD,
	profitOrInterestValue,
	duration,
	tokenAddress,
	id,
	decimal,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const repayLoan = useRepayPeer(amount, Number(id), String(tokenAddress), decimal)
	const closeAds = useCloseListingAd( Number(id))

	return (
		<div className="w-full rounded-xl text-[#ffffff] bg-[#12151A] p-3 mt-2 relative noise-3">
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-4">
					<img src={icon} width={40} height={40} alt={token} />
					<p className="font-extrabold text-lg">{token}</p>
				</div>

				<div className="flex gap-6">
					<div className="flex flex-col items-end">
						<p className="font-extrabold text-2xl leading-none tracking-tighter">
							{formatMoney(amount)}
						</p>
						<p className="text-[13px] font-kaleko font-normal text-[#fff]">
							${formatMoney(amountUSD)}
						</p>
					</div>
					<div className="relative cursor-pointer" ref={dropdownRef}
						onClick={() => setDropdownOpen(!isDropdownOpen)}>
						<img 
							src="/icons/ellipse.svg" 
							alt="options" 
							width={5} 
							className="cursor-pointer"
						/>
						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-36 bg-[#000000] shadow-lg rounded-lg p-2 font-kaleko font-bold z-20">
								{type === "borrow" ? (
									<button className="w-full text-center px-4 py-2 text-xs text-[#12151A] hover:bg-gray-300 bg-white rounded-md"
										
									onClick={()=>repayLoan()}
									>
										Repay Loan
									</button>
								) : (
									<button className="w-full px-4 py-2 text-xs text-center text-[#12151A] hover:bg-gray-300 bg-white rounded-md whitespace-nowrap"
										onClick={()=>closeAds()}
									>
										Close Ads
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-between items-start mt-6 w-full">
				<div className="flex flex-col w-1/3">
					<p className="text-[13px] font-medium text-[#ffffff]">Expiry</p>
					<p className="font-bold text-[16px] font-kaleko">{expiry}</p>
				</div>

				<div className="flex flex-col w-1/3 text-center">
					<p className="text-[13px] font-medium text-[#ffffff]">
						{type === "borrow" ? "Interest" : "Profits"}
					</p>
					<p className="font-bold text-[16px] font-kaleko">
						{profitOrInterestValue}
						<span className="text-[#ffffff] text-[13px] pl-2">
							${formatMoney(profitOrInterestValueUSD!)}
						</span>
					</p>
				</div>

				<div className="flex flex-col w-1/3 text-right">
					<p className="text-[13px] font-medium text-[#ffffff]">Duration</p>
					<p className="font-bold text-[16px] font-kaleko">{duration}</p>
				</div>
			</div>
		</div>
	);
};

export default PeerOrderCard;