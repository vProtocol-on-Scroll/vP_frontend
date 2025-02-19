const HowSubComponent3 = () => {
  return (
    <div className="w-full flex flex-col-reverse lg:flex-row-reverse items-center justify-between py-20 lg:py-24 relative">
      {/* Right Section - Text */}
      <div className="w-full lg:w-1/2 font-kaleko text-center lg:text-left space-y-4 px-6">
        <p className="font-bold text-xl lg:text-3xl max-w-lg mx-auto">
          Earn & Optimize Yield
        </p>
        <p className="font-normal text-sm lg:text-base max-w-md">
          Stay in Control - manage loans, collateral, and earnings via an intuitive dashboard.
        </p>

        <div className="flex justify-center lg:justify-start">
          <button className="bg-[#01D396] px-6 py-3 rounded-2xl transition hover:opacity-90 text-sm font-bold">
            Start Now
          </button>
        </div>
      </div>

      {/* Left Section - Image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative mb-8 lg:mb-0">
        {/* Gradient Image */}
        <img
          src="/grad2.svg"
          alt="Background Gradient"
          className="absolute w-[80%] lg:w-[380px] h-auto pointer-events-none object-contain"
        />

        {/* PC Image */}
        <img
          src="/pc.svg"
          width="280px"
          height="auto"
          alt="PC"
          className="relative z-10 ml-0 lg:ml-8"
        />
      </div>
    </div>
  );
};

export default HowSubComponent3;