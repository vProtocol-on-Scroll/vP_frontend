import { footerLinks, footerSocials } from "../../constants/config/footerDetails";

const Footer = () => {

  return (
    <div  style={{ backgroundImage: `url('/footerBanner.png')` }} className="h-[1008px] 2xl:h-screen w-full max-w-[1728px] pt-28 text-[#FAFAFA] relative">
      <div className="m-auto flex flex-col items-center justify-center">
        <h5 className="font-kaleko font-extrabold text-[80px] max-w-[1140px] text-center leading-[80px]">Lend And Borrow on Your Terms.</h5>
        
        <p className="font-kaleko font-bold text-[21px] py-20 max-w-[796px] leading-[35px]">
          Create a custom lending pool with your own rules, join an existing pool to earn yield, or set up a borrow order that fits your needs. With vProtocol, the choice is yours. Start now and redefine DeFi lending! 🚀
        </p>

        <div className="flex items-center gap-6 font-kaleko font-bold">
          <button className="bg-white text-black px-8 py-3 rounded-3xl text-base hover:opacity-70 transition duration-300"
          >
            Explore  App
          </button>

          <button className="text-white border border-white px-8 py-3 rounded-3xl text-base hover:opacity-80 transition duration-300"
          >
            Join Waitlist
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      
      <div className="flex justify-between items-center w-full p-12 absolute bottom-0 left-0">
        <div className="flex flex-col gap-6">
          <a href="/">
            <img src="/logo.png" width="190" height="39" alt="vProtocol logo" />
          </a>
          <div className="flex flex-wrap gap-6 text-sm text-[#ffffff]/85">
            <span>© 2025 vProtocol</span>
            {footerLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-white transition">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-xl font-medium text-white">Join our 30k+ users community</p>

          <div className="flex flex-wrap gap-6 text-sm items-center justify-end">
            {footerSocials.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-white transition">
                <img src={link.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default Footer;

