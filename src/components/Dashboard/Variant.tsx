import React, { useState } from "react";
import { VariantProps } from "../../constants/types";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../../constants/utils/formatMoney";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const Variant: React.FC<VariantProps> = ({ 
  title, 
  amount, 
  buttonText, 
  stats = [], 
  healthFactor = null,
  typeAssets,
  bgColor,
  link,
  assets,
}) => {
  const navigate = useNavigate();
  const { isConnected } = useWeb3ModalAccount();

   const [tooltip, setTooltip] = useState<{ name: string; vol: string } | null>(null);
  
  return (
    <div 
      className="max-w-[430px] w-full rounded-2xl bg-noise-texture noise-2"
      style={{
        backgroundColor: bgColor,
        backgroundImage: `linear-gradient(180deg, #00000000 0%, #12151A80 50%), 
                          linear-gradient(90deg, #00000000 0%, #12151A80 50%), 
                          url('/noise.svg')`,
      }}
    >
      <div className="p-6">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-kaleko font-normal">{title}</p>
            <p className="text-[24px] font-kaleko font-extrabold">${formatMoney(amount)}</p>
          </div>
          <div onClick={() => navigate(link)}
            className="bg-[#F4F4F5] px-4 py-2 flex items-center gap-4 rounded-lg cursor-pointer">
            <img src={"/icons/arrowUp.svg"} alt={buttonText} width="20" />
            <p className="text-[#18181B] text-[17px] font-extrabold">{buttonText}</p>
          </div>
        </div>

        {/* assets Section */}
        {typeAssets && (
          <div className="flex flex-col items-center justify-between mt-8">
            <div className="flex items-center justify-between w-full">
              <p className="text-[16px] font-kaleko font-bold flex items-center">
                {"Assets"}
                <span className="ml-2 bg-[#DFDFDF] text-black rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold">
                  ?
                </span>
              </p>
              <div className="relative flex items-center text-[16px] font-kaleko font-bold cursor-pointer">
                {assets?.map((asset, index) => (
                  <div
                    key={index}
                    className="relative w-full"
                    onMouseEnter={() => setTooltip({ name: asset.name, vol: asset.vol })}
                    onMouseLeave={() => setTooltip(null)}
                    onTouchStart={() => setTooltip({ name: asset.name, vol: asset.vol })}
                    onTouchEnd={() => setTooltip(null)}
                  >
                    <img
                      src={asset.src}
                      alt={asset.name}
                      className={`w-8 aspect-square rounded-full border border-gray-300 object-cover ${index !== 0 ? "ml-2" : ""}`}
                    />
                    {tooltip && tooltip.name === asset.name && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                        {tooltip.name} - {(tooltip.vol)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {stats.length > 0 && (
          <div className="flex flex-col items-center justify-between mt-8">
            {stats.map(({ label, value }, index) => (
              <div key={index} className="flex items-center justify-between w-full">
                <p className="text-[16px] font-kaleko font-bold flex items-center">{label}
                  <span className="ml-2 bg-[#DFDFDF] text-black rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold">
                  ?
                </span>
                </p>
                <p className="text-[16px] font-kaleko font-normal">{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Health Factor Section (if applicable) */}
        {healthFactor !== null && (
          <div className="flex flex-col items-center justify-between mt-3">
            <div className="flex items-center justify-between w-full">
              <p className="text-[16px] font-kaleko font-bold flex items-center">
                Health Factor 
                <span className="ml-2 bg-[#DFDFDF] text-black rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold">
                  ?
                </span>
              </p>
              {
                isNaN(healthFactor) || !isConnected ? (
                  <p className="text-[20px] font-extrabold mr-4">∞</p>
                ) : healthFactor >= 1 ? (
                  <p className="text-[16px] font-extrabold">100%</p>
                ) : (
                  <p className="text-[16px] font-extrabold">{Math.round(healthFactor * 100)}%</p>
                )
              }
            </div>

            {/* Battery Health Bar */}
            <div className="w-full h-3 mt-1 bg-gray-300 rounded-full relative overflow-hidden">
              <div 
                className="h-full  rounded-full transition-all duration-500"
                style={{
                  width: `${isNaN(healthFactor) || healthFactor > 1 ? 100 : healthFactor === 0 ? 10 : healthFactor * 100}%`,
                  background: healthGradient(healthFactor),
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Variant;

const healthGradient = (factor: number) => {
  if (factor < 0.6) return "#FF0000"; 
  if (factor == 0.6 || factor <= 0.79) return "linear-gradient(90deg, #FF0000 0%, #FFFF00 100%)"; 
  return "linear-gradient(90deg, #FF0000 0%, #FFFF00 50%, #008000 100%)"; 
};