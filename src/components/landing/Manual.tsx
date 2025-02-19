import { useState } from "react";
import { faqs } from "../../constants/config/faqs";

const Manual = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); 

  const toggleFAQ = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index)); 
    } else {
      setOpenIndexes([...openIndexes, index]); 
    }
  };

  const toggleAllFAQs = () => {
    if (openIndexes.length === faqs.length) {
      setOpenIndexes([]); 
    } else {
      setOpenIndexes(faqs.map((_, i) => i));
    }
  };

  return (
    <div className="relative pt-16 w-[95%] lg:w-[59.61%] mx-auto max-w-[1030px] rounded-3xl mb-6
        border-t border-t-[#46484D]
        before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[1px] before:bg-gradient-to-b before:from-[#46484D] before:to-[#46484D00]
        after:absolute after:top-0 after:bottom-0 after:right-0 after:w-[1px] after:bg-gradient-to-b after:from-[#46484D] after:to-[#46484D00]"
    >
      <div className="flex flex-col items-center justify-center">
        <h3 className="font-kaleko font-normal text-[39.7px] pb-4">User Manual & FAQs</h3>
        <p className="text-[#808289] text-lg">
          Reach out to <span className="text-white">mail@vprotocol.xyz</span> for any queries
        </p>

       <a 
        href="/src/assets/vProtocol-Whitepaper.pdf#zoom=30" 
        target="_blank" 
        rel="noopener noreferrer"
        >
        <button className="cursor-pointer mt-10">
            <img src="/viewBtn.svg" className="" />
        </button>
       </a>

        {/* Mail with Seal */}
        <div className="border-b border-[#46484D] w-full">
          <div className="cursor-pointer mt-12 relative w-fit">
            <img src="/mail.svg" className="w-full -mb-2" />
            <img src="/mail-seal.svg" className="m-auto top-1/2 absolute inset-28" />
          </div>
        </div>

        {/* FAQs Section */}
        <div className="w-full py-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="relative p-6 cursor-pointer after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-gradient-to-r after:from-[#46484D] after:to-[#46484D00]"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex gap-4 items-center">
                {openIndexes.includes(index) ? 
                  (<img src="/icons/x.png" className="" />)    
                :
                  (<img src="/icons/plus.png" className="" />)
                }
                <h4 className="text-2xl text-white font-kaleko font-bold">{faq.question}</h4>
              </div>
              {openIndexes.includes(index) && (
                <p className="text-[#808289] mt-6 text-[17px] px-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-2 flex gap-4 items-center cursor-pointer" onClick={toggleAllFAQs}>
        <img 
          src="/icons/arrow.svg" 
          className={`${openIndexes.length === faqs.length ? "rotate-180" : "-rotate-45"} w-5 h-6 text-[#4d4d4d] transition-transform duration-300`} 
        />
        <p className="text-[#808289] text-2xl">
          {openIndexes.length === faqs.length ? "Collapse all FAQs" : "View all FAQs"}
        </p>
      </div>
    </div>
  );
};

export default Manual;