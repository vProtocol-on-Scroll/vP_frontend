import { OrderCardProps } from "../../constants/types";
import { useEffect, useRef, useState } from "react";
import useCloseListingAd from "../../hook/write/useCloseListingAds";



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
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [isClosing, setIsClosing] = useState(false);
  const closeListing = useCloseListingAd(BigInt(1)); // abitrary listingId to be remove and dynamic id to be added through props

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


	const handleClosePosition = async () => {
		setIsClosing(true);
		try {
		  await closeListing();
		  // Optional: Trigger data refresh in parent
		} finally {
		  setIsClosing(false);
		}
	  };

	  
	return (
		<div className="max-w-[386px] w-full rounded-xl text-[#0D0D0D] bg-[#FFFFFF] p-3 mt-2 relative">
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-4">
					<img src={icon} width={40} height={40} alt={token} />
					<p className="font-extrabold text-lg">{token}</p>
				</div>

				<div className="flex gap-6">
					<div className="flex flex-col items-end">
						<p className="font-extrabold text-2xl leading-none tracking-tighter">
							{amount}
						</p>
						<p className="text-[13px] font-kaleko font-normal text-[#0D0D0D80]">
							{amountUSD}
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
							<div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg p-2 font-kaleko font-bold">
								{type === "borrow" ? (
									<button className="w-full text-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-300 rounded-md">
										Repay
									</button>
								) : (
									<button 
									onClick={handleClosePosition}
									disabled={isClosing}
									className="w-full px-4 py-2 text-sm text-left bg-gray-100 hover:bg-gray-300 rounded-md whitespace-nowrap">
										Close Position
										{isClosing ? "Closing..." : "Close Position"}
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-between items-start mt-6 w-full">
				<div className="flex flex-col w-1/3">
					<p className="text-[13px] font-medium text-[#0D0D0D80]">Expiry</p>
					<p className="font-bold text-[16px] font-kaleko">{expiry}</p>
				</div>

				<div className="flex flex-col w-1/3 text-center">
					<p className="text-[13px] font-medium text-[#0D0D0D80]">
						{type === "borrow" ? "Interest" : "Profits"}
					</p>
					<p className="font-bold text-[16px] font-kaleko">
						{profitOrInterestValue}
						<span className="text-[#0D0D0D80] text-[13px] pl-2">
							{profitOrInterestValueUSD}
						</span>
					</p>
				</div>

				<div className="flex flex-col w-1/3 text-right">
					<p className="text-[13px] font-medium text-[#0D0D0D80]">Duration</p>
					<p className="font-bold text-[16px] font-kaleko">{duration}</p>
				</div>
			</div>
		</div>
	);
};

export default PeerOrderCard;