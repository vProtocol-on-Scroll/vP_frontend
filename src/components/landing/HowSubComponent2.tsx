const HowSubComponent2 = () => {
  return (
    <div className="w-full flex flex-col-reverse lg:flex-row-reverse items-center justify-between py-8 lg:py-24 relative">
      {/* Right Section - Text */}
      <div className="w-full lg:w-1/2 font-kaleko text-center lg:text-left space-y-4 px-6">
        <p className="font-bold text-xl lg:text-3xl max-w-lg">
          Borrow with Confidence
        </p>
        <p className="font-normal text-sm lg:text-base max-w-md">
          Secure quick loans with collateral or access flexible options by creating custom borrow orders for your needs.
        </p>

        <div className="flex justify-center lg:justify-start">
          <button className="bg-[#01D396] px-6 py-3 rounded-2xl transition hover:opacity-90 text-sm font-bold">
            Borrow Now
          </button>
        </div>
      </div>

      {/* Left Section - Image */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative mb-8 lg:mb-0">
        {/* Gradient Image */}
        <img
          src="/grad3.svg"
          alt="Background Gradient"
          className="absolute w-[80%] lg:w-auto h-auto pointer-events-none object-contain"
        />

        {/* iPhone Image */}
        <img
          src="/iphone14.svg"
          width="300px"
          height="auto"
          alt="iPhone"
          className="relative z-10"
        />
      </div>
    </div>
  );
};

export default HowSubComponent2;