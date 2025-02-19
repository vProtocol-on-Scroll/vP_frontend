const HowSubComponent1 = () => {
  return (
    <div className="w-full flex flex-col-reverse lg:flex-row-reverse items-center justify-between pt-20 pb-10 lg:py-24 relative">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 font-kaleko text-center lg:text-left space-y-4 px-6">
        <p className="font-bold text-xl lg:text-3xl max-w-lg">
          Set Your Terms or Join a Pool
        </p>
        <p className="font-normal text-sm lg:text-base max-w-md">
          Define interest rates, duration, and other conditions, or simply supply liquidity to earn yield.
        </p>

        <div className="flex justify-center lg:justify-start">
          <button className="bg-[#01D396] px-6 py-3 rounded-2xl transition hover:opacity-90 text-sm font-bold">
            Lend Now
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative mb-28 lg:mb-0">
        <img
          src="/grad1.svg"
          alt="Background Gradient"
          className="absolute w-[250px] lg:w-[450px] lg:h-auto pointer-events-none object-cover"
        />

        <img
          src="/pool-card2.svg"
          width="250px"
          height="252px"
          alt="Pool Card 2"
          className="absolute z-0 right-0 lg:-translate-x-1/2 w-[180px] h-[180px] lg:w-[250px] lg:h-[252px]"
        />

        <img
          src="/pool-card1.svg"
          width="200px"
          height="252px"
          alt="Pool Card 1"
          className="absolute z-10 left-1/2 -translate-x-1/2 w-[180px] h-[180px] lg:w-[200px] lg:h-[252px]"
        />
      </div>
    </div>
  );
};

export default HowSubComponent1;