import { useEffect, useState } from "react";
import { tokenData as defaultTokenData } from "../../constants/config/tokenData";
import { useNavigate, useParams } from "react-router-dom";
import { DateInputField } from "../../components/CreateOrder/DateInputField";
import { isSupportedChain } from "../../constants/utils/chains";
import { getTokenBalance } from "../../constants/utils/getBalances";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useGetUtilitiesPeer from "../../hook/read/useGetUtilitiesPeer";

const CreateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isConnected, chainId, address } = useWeb3ModalAccount();

	const { data } = useGetUtilitiesPeer();
  
  const [showLendTooltip, setShowLendTooltip] = useState(false);
  const [showBorrowTooltip, setShowBorrowTooltip] = useState(false);

  const [selectedToken, setSelectedToken] = useState(defaultTokenData[1]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [assetValue, setAssetValue] = useState<string | number>(""); // Track input value
  const [walletBalance, setWalletBalance] = useState(0);
	const [availableBal, setAvailableBal] = useState(0);
  const [fiatEquivalent, setFiatEquivalent] = useState<number >(0);
  
  const [percentage, setPercentage] = useState<number>(0);
  const [dateValue, setDateValue] = useState<string>("");

  const handleDecrement = () => {
    setPercentage((prev) => Number(Math.max(prev - 0.001, 0).toFixed(3)));
  };

  const handleIncrement = () => {
    setPercentage((prev) => Number(Math.min(prev + 0.001, 100).toFixed(3)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target.value);
    if (value === "") {
        setPercentage(0);
        return;
    }
    if (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= 100) {
        setPercentage(Number(value));
    }
};

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTokenSelect = (token: string) => {
    const selected = defaultTokenData.find((t) => t.token === token);
    if (selected) {
        setSelectedToken(selected);
        setIsDropdownOpen(false);
        updateFiatEquivalent(Number(assetValue), selected.tokenPrice);
    }
  };

  // Handle asset input value change
  const handleAssetValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 0) {
        setAssetValue(value);
        updateFiatEquivalent(Number(value), selectedToken.tokenPrice);
    }
  };

  // Handle max button click
  const handleMaxClick = () => {
    const maxAmount = id === "borrow" ? availableBal * 0.79 : walletBalance;
    setAssetValue(maxAmount);
    updateFiatEquivalent(maxAmount, selectedToken.tokenPrice);
  };

  // Update fiat equivalent
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
  
      if (data?.availableBalances) {
        const totalBalance = data.availableBalances.reduce(
          (acc, curr) => acc + curr,
          0
        );
        setAvailableBal(totalBalance);
      }
    }, [
      isConnected,
      address,
      chainId,
      selectedToken.address,
      selectedToken.decimal,
      data,
    ]);

  return (
    <div className="flex flex-col justify-center items-center font-kaleko p-2 lg:p-0 h-screen 2xl:-mt-24 -mt-12">
      <div>
        <p className="text-base text-white px-2">Create Order</p>

        <div>
          <div className="my-4 px-4 sm:px-8">
            <div className="flex gap-12 w-5/6 m-auto">
                <div className={`font-semibold relative w-1/2 rounded-md px-6 py-2 text-center cursor-pointer ${id === "lend" ? "bg-[#01D396]" : "bg-white/60"}`}
                    onMouseEnter={() => setShowLendTooltip(true)}
                    onMouseLeave={() => setShowLendTooltip(false)}
                   onClick={() => navigate("/create-order/lend")}
                >
                    <button>Lend</button>
                    {showLendTooltip && (
                        <div className="absolute bottom-full mb-2 bg-[#A66CFF] text-white text-xs rounded-lg p-2 w-64">
                            Lenders create lending pools that borrowers can borrow from.
                        </div>
                    )}
              </div>

              <div className={`font-semibold relative w-1/2 rounded-md px-6 py-2 text-center cursor-pointer ${id === "borrow" ? "bg-[#01D396]" : "bg-white/60"}`}
                    onMouseEnter={() => setShowBorrowTooltip(true)}
                    onMouseLeave={() => setShowBorrowTooltip(false)}
                    onClick={() => navigate("/create-order/borrow")}
                >
                    <button>Borrow</button>
                    {showBorrowTooltip && (
                            <div className="absolute bottom-full mb-2 bg-[#A66CFF] text-white text-xs rounded-lg p-2 w-64">
                                Borrowers create borrow orders that lenders can service.
                            </div>
                    )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 max-w-[456px] w-[456px] m-auto">
            <div className="text-black flex justify-between mb-3 items-center">
              {/* Token Dropdown */}
              <div
                className="relative bg-black rounded-md p-2 gap-3 flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <div className="rounded-full px-1 py-[0.5px] flex items-center justify-center">
                  <img src={selectedToken.icon} alt={selectedToken.token} width={18} height={18} />
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
                  <div className="absolute top-full left-0 mt-2 w-[100px] bg-black rounded-md z-20">
                    {defaultTokenData.slice(1).map((token) => (
                      <div
                        key={token.token}
                        onClick={() => handleTokenSelect(token.token)}
                        className="flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-800"
                      >
                        <img src={token.icon} alt={token.token} width={14} height={14} />
                        <p className="text-white text-xs">{token.token}</p>
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
              {id === "borrow" ? "Available Balance: " : "Wallet Balance: "}
              {id === "borrow" ? (Number(availableBal) * 0.79) : walletBalance}{" "}
              {selectedToken.token}
            </p>

            {/* Price and Fiat Equivalent */}
            <div className="text-black text-xs flex justify-between">
              <p>{`1 ${selectedToken.token} = $${selectedToken.tokenPrice}`}</p>
              <p className="font-bold">≈ ${fiatEquivalent}</p>
            </div>
          </div>
          
          
           <div className="px-4 sm:px-8">
            <div className="bg-white mt-4 rounded-[40px] px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="text-[14.6px] font-medium">
                        <p className="text-[#636363]">
                            Order Value
                            <span className="text-black/30 ml-3">
                                .<span className="ml-2">Interest Value</span>
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-black text-[14.6px]">{selectedToken.token}</p>
                        <img
                            src={"/icons/chevron.svg"}
                            alt="token"
                            width={6}
                            height={11}
                            className=""
                        />
                    </div>
                </div>
                
                <div className="mt-2">
                    {/* Fiat amount calculation */}
                    <p className="font-bold text-black text-[40px] sm:text-[51.12px]">
                        ${fiatEquivalent} {/* Calculated fiat amount */}
                        <span className="text-[14.6px] ml-2 font-medium text-black/30">
                            +${(fiatEquivalent * (percentage / 100)).toFixed(2)} 
                        </span>
                    </p>
                </div>
                
                <div className="flex items-center w-full gap-2 justify-center mt-2">
                    <button
                        onClick={handleDecrement}
                        className="bg-[#A2A8B4] rounded-full py-2 sm:py-4 px-4 sm:px-[25px] flex items-center justify-center"
                    >
                        <p className="text-3xl sm:text-4xl">-</p>
                    </button>

                    <div className="relative">
                        <input
                            type="text"
                            value={percentage}
                            onChange={handleInputChange}
                            className="bg-[#7b55b9]/80 rounded-2xl p-2 sm:p-4 text-[20px] sm:text-[27.5px] font-medium text-black w-[120px] sm:w-[150px] text-center focus:border-[#01D396]/80 border focus:outline-none"
                            min={0}
                            max={100}
                            step={0.001}
                            placeholder="0.00"
                        />
                        <span className="absolute top-1/2 right-1 transform -translate-y-1/2 text-[20px] sm:text-[27.5px] font-medium text-black">%</span>
                    </div>

                    <button
                        onClick={handleIncrement}
                        className="bg-[#A2A8B4] rounded-full py-2 sm:py-4 px-4 sm:px-[25px] flex items-center justify-center"
                    >
                        <p className="text-3xl sm:text-4xl">+</p>
                    </button>
                </div>
            </div>
            
            <div className="px-4 sm:px-8">
                <DateInputField dateValue={dateValue} setDateValue={setDateValue} />
            </div>
            
            <div className={`w-full rounded-md px-6 py-2 text-center cursor-pointer bg-[#01D396] mt-4 font-bold`}>
              Create Order
            </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;