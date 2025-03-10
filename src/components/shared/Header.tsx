import { useEffect, useRef, useState } from "react";
import {
	useSwitchNetwork,
	useWalletInfo,
	useWeb3Modal,
	useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { headerNav } from "../../constants/config/headerNav";
import { isSupportedChain } from "../../constants/utils/chains";
import { formatAddress } from "../../constants/utils/formatAddress";
import { getEthBalance } from "../../constants/utils/getBalances";
import { SUPPORTED_CHAIN_ID } from "../../api/connection";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
	const { pathname } = useLocation();
	const { open } = useWeb3Modal();
	const { isConnected, chainId, address } = useWeb3ModalAccount();
	const { walletInfo } = useWalletInfo();
	const { switchNetwork } = useSwitchNetwork();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
	const [balance, setBalance] = useState<string | null>(null);
	const walletDropdownRef = useRef<HTMLDivElement>(null);

	const currentPath = pathname;
	console.log(currentPath);

	useEffect(() => {
	 console.log(currentPath);
	}, [currentPath])
	
	

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	const walletConnect = () => {
		if (!isConnected) {
			open();
		} else if (isConnected && !isSupportedChain(chainId)) {
      switchNetwork(SUPPORTED_CHAIN_ID);
      setIsWalletDropdownOpen(false)
      
		} else {
			setIsWalletDropdownOpen((prev) => !prev);
		}
	};

	const handleSignout = () => {
		setIsWalletDropdownOpen(false);
		open();
	};

	useEffect(() => {
		const fetchBalance = async () => {
			if (isConnected && address) {
				try {
					const bal = await getEthBalance(address);
					setBalance(bal);
				} catch (error) {
					console.error("Error fetching balance:", error);
				}
			}
		};
		fetchBalance();
	}, [isConnected, address]);


  useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				walletDropdownRef.current &&
				!walletDropdownRef.current.contains(event.target as Node)
			) {
				setIsWalletDropdownOpen(false);
			}
		};

		if (isWalletDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isWalletDropdownOpen]);

	return (
		<header className="w-full px-4 py-3 flex justify-between items-center bg-black text-white relative">
			<div>
				<a href="https://www.vprotocol.xyz/" target="_blank">
					<img
						src="/logo.svg"
						width="200px"
						height="41.2px"
						alt="vProtocol logo"
						className="hidden lg:block hover:opacity-70 transition duration-300"
					/>
				</a>
				<a href="https://www.vprotocol.xyz/" target="_blank">
					<img
						src="/mobileLogo.svg"
						width="39.8px"
						height="38px"
						alt="vProtocol mobile logo"
						className="lg:hidden hover:opacity-70 transition duration-300"
					/>
				</a>
			</div>

			<nav className="hidden lg:flex items-center gap-3">
				{headerNav.map((item, index) => (
					<Link
						key={index}
						to={item.link}
						className={`text-xl flex items-center gap-2 font-medium px-3 py-[2px] transition duration-300
              				${
								currentPath === item.link
									? "bg-[#D7D7D733] rounded-3xl"
									: "hover:opacity-70"
							}
            			`}
					>
						<img src={item.icon} width={item.width} height={24} alt={item.name} />
						{item.name}
					</Link>
				))}
			</nav>

			{/* Right Section (Mobile Menu + Wallet) */}
			<div className="flex items-center gap-3">
				{/* Mobile Menu Button */}
				<button id="menu-button" className="lg:hidden" onClick={toggleMenu}>
					<img src="/icons/hamburger.svg" alt="Menu" width="25" />
				</button>

				{/* Mobile Navigation Menu */}
				{isMenuOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
						<button
							className="absolute top-6 right-6 text-white text-3xl"
							onClick={toggleMenu}
						>
							✕
						</button>

						<nav className="flex flex-col items-center gap-6 md:gap-12">
							{headerNav.map((item, index) => (
								<Link
									key={index}
									to={item.link}
									className={`text-base flex items-center gap-2 font-medium px-2 py-2 rounded-lg w-full text-center
                    						${
											currentPath === item.link
												? "bg-[#D7D7D733] text-white"
												: "hover:opacity-70"
											}
                						`}
										onClick={toggleMenu}
									>
									<img src={item.icon} width={item.width} height={24} alt={item.name} />
									{item.name}
								</Link>
							))}
						</nav>
					</div>
				)}

				{/* Wallet Section */}
				<div className="relative" ref={walletDropdownRef}>
					<button
						onClick={walletConnect}
						className="bg-[#01D396] font-kaleko font-bold text-black text-lg px-3 py-1 rounded-2xl transition duration-300"
					>
						{!isConnected ? (
							<p>Connect</p>
						) : !isSupportedChain(chainId) ? (
							<p className="leading-tight">Switch Network</p>
						) : (
							<div className="flex items-center gap-2">
								<img
									src="/coins/svg/Scroll.svg"
									alt="chain icon"
									width={24}
									height={24}
								/>
								<p>{address ? formatAddress(address) : "Address"}</p>
								<img
									src="/icons/chevronDown.svg"
									alt="chevron icon"
									width={10}
									height={8}
								/>
							</div>
						)}
					</button>

					{isWalletDropdownOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md text-black rounded-lg z-50">
							<div className="p-4 flex flex-col items-center gap-2 border-b">
								<img
									src={walletInfo?.icon || "/"}
									alt="Wallet Icon"
									className="w-6 h-6 object-cover"
								/>
								<span className="text-black text-xs md:text-sm">
									{address ? formatAddress(address) : "Address"}
								</span>
								<span className="text-black text-xs md:text-sm">
									{balance ? `${balance} ETH` : "wallet balance..."}
								</span>
								<button
									className="w-full bg-[#7b55b9] text-white py-2 rounded-md hover:bg-[#7b55b9]/70 transition-colors text-xs md:text-sm"
									onClick={handleSignout}
								>
									Wallet Actions
								</button>
							</div>
						</div>
					)}
				</div>

			</div>
		</header>
	);
};

export default Header;