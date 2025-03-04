import React from "react";
import { VariantProps } from "../../constants/types";

const Variant: React.FC<VariantProps> = ({ 
  title, 
  amount, 
  buttonText, 
  stats = [], 
  healthFactor = null,
  typeAssets,
  bgColor 
}) => {
  return (
    <div 
      className="max-w-[430px] w-full rounded-2xl bg-noise-texture" 
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
            <p className="text-[24px] font-kaleko font-extrabold">{amount}</p>
          </div>
          <div className="bg-[#F4F4F5] px-4 py-2 flex items-center gap-4 rounded-lg cursor-pointer">
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
              <div className="text-[16px] font-kaleko font-normal flex items-center">
                <img src="/coins/svg/ETH.svg" alt="asset" className="w-6 aspect-square rounded-full border border-gray-300 object-cover"/>
                <img src="/coins/svg/USDC.svg" alt="asset" className="w-6 aspect-square rounded-full border border-gray-300 object-cover -ml-2"/>
                <img src="/coins/svg/WBTC.svg" alt="asset" className="w-6 aspect-square rounded-full border border-gray-300 object-cover -ml-2"/>
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
          <div className="flex flex-col items-center justify-between mt-6">
            <div className="flex items-center justify-between w-full">
              <p className="text-[16px] font-kaleko font-bold flex items-center">
                Health Factor 
                <span className="ml-2 bg-[#DFDFDF] text-black rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold">
                  ?
                </span>
              </p>
              <p className="text-[16px] font-extrabold">{Math.round(healthFactor * 100)}%</p>
            </div>

            {/* Battery Health Bar */}
            <div className="w-full h-3 mt-2 bg-gray-300 rounded-full relative overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500" 
                style={{
                  width: `${healthFactor * 100}%`,
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

// Health bar gradient function
const healthGradient = (factor: number) => {
  if (factor < 0.6) return "#FF0000"; // Red only
  if (factor == 0.6 || factor <= 0.79) return "linear-gradient(90deg, #FF0000 0%, #FFFF00 100%)"; // Red + small yellow
  return "linear-gradient(90deg, #FF0000 0%, #FFFF00 50%, #008000 100%)"; // Full gradient
};