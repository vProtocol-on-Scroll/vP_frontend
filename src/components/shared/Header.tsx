import { useState } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { headerNav } from "../../constants/config/headerNav";

const Header = () => {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
 const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Get current pathname
  const currentPath = window.location.pathname;
  
  const walletConnect = () => {
    if (!isConnected) {
      open();
    }
  };



  return (
    <div className="w-full px-4 py-3 flex justify-between items-center bg-black text-white relative">
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
          <a
            key={index}
            href={item.link}
            className={`text-xl flex items-center gap-2 font-medium px-3 py-[2px] transition duration-300
              ${currentPath === item.link ? "bg-[#D7D7D733] rounded-3xl" : "hover:opacity-70"}
            `}
          >
            <img src={item.icon} width={item.width} height={24} alt={item.name} />
            {item.name}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        
        <button id="menu-button" className="lg:hidden" onClick={toggleMenu}>
          <img src="/icons/hamburger.svg" alt="Menu" width="25" />
        </button>
        
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
                <a
                    key={index}
                    href={item.link}
                    className={`text-base flex items-center gap-2 font-medium px-2 py-2 rounded-lg w-full text-center
                    ${currentPath === item.link ? "bg-[#D7D7D733] text-white" : "hover:opacity-70"}
                `}
                    onClick={toggleMenu}
                >
                    <img src={item.icon} width={item.width} height={24} alt={item.name} />
                    {item.name}
                </a>
                ))}
            </nav>
            </div>
        )}     

        {/* Connect Wallet Button */}
        <button
          onClick={walletConnect}
          className="bg-[#01D396] font-kaleko font-bold text-black text-lg px-3 py-1 rounded-2xl transition duration-300"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default Header;