import NoiseEffectBg from "./NoiseEffectBg";

const Hero = () => {
  return (
    <div className="mt-6 md:mt-8 lg:mt-14 lg:w-[81.02%] w-[95%] mx-auto max-w-[1400px]">
      <NoiseEffectBg>
        <div className="flex flex-col lg:flex-row items-center text-center lg:text-left w-full relative">
          {/* Left Content (Text + Buttons) */}
          <div className="p-12 flex flex-col justify-evenly items-center lg:items-start relative">
            {/* Coin Background (Mobile Only) */}
            <div className="absolute inset-0 flex justify-center items-center lg:hidden opacity-35 mix-blend-overlay -m-6">
              <img src="/vCoin.svg" alt="hero" className="w-full max-h-full" />
            </div>

            <div className="relative z-10">
              <h3 className="font-kaleko font-extrabold lg:text-[70px] text-[40px] lg:tracking-tighter leading-none">
                Lend.<br />
                Borrow.<br />
                Earn.
              </h3>

              <p className="lg:text-xl text-base mt-4 font-kaleko font-bold max-w-md">
                The Future of DeFi Lending Combines peer-to-peer and Liquidity Pool lending to maximize capital efficiency.
              </p>
            </div>

            <div className="mt-6 2xl:mt-12 relative z-10 flex flex-col items-center lg:items-start">
              <button className="bg-[#01D396] px-3 py-2 rounded-2xl transition hover:opacity-90 lg:text-base text-xs flex items-center gap-3 font-kaleko lg:font-normal font-semibold">
                <div className="">Get Started</div>
                <div>
                  <img src="/icons/arrow.svg" alt="arrow Icon" className="w-3 h-3" />
                </div>
              </button>

              <div className="flex flex-row items-center gap-6 lg:text-[18px] text-[13.5px] font-kaleko font-bold 2xl:mt-12 mt-6">
                <p>Powered By</p>
                <div>
                  <img src="/scroll.svg" alt="hero" className="lg:w-32 lg:h-[35px] w-24 h-[24px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - vCoin (Desktop) */}
          <div className="hidden 2xl:flex flex-1 items-end overflow-hidden mix-blend-overlay opacity-35">
            <img
              src="/vCoin2.svg"
              alt="hero"
              className="w-full max-h-full object-contain"
            />
          </div>
          <div className="hidden lg:flex 2xl:hidden flex-1 items-end overflow-hidden mix-blend-overlay opacity-35">
            <img
              src="/vCoin.svg"
              alt="hero"
              className="w-full max-h-full object-fill"
            />
          </div>
        </div>
      </NoiseEffectBg>
    </div>
  );
};

export default Hero;