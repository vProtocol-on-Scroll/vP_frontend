import HowSubComponent1 from "./HowSubComponent1"
import HowSubComponent2 from "./HowSubComponent2"
import HowSubComponent3 from "./HowSubComponent3"

const How = () => {
  return (
    <div id="how" className="2xl:mt-20 lg:my-16 my-14 w-[95%] lg:w-[81.02%] mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center justify-center">
            <h3 className="font-kaleko font-bold text-[42px] lg:text-[55px] pb-10">How it works</h3>
            
            <div className="w-full mt-8">
                < HowSubComponent1 />
                < HowSubComponent2 />
                <HowSubComponent3 />
            </div>
        </div>
    </div>
  )
}

export default How