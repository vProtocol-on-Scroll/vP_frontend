import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { landingHeaderNav } from "../../constants/config/landingHeaderNav";

const LandingHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDocsNav = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleAppNav = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-black w-full py-2 lg:py-4 px-2 lg:px-12 border-white border-b font-kaleko font-bold">
      <div className="flex justify-between items-center w-full">
        {/* Logo Section */}
        <div className="block lg:flex items-center w-full lg:w-[70%] 2xl:w-[55%] justify-between">
          <a href="/">
            <img
              src="/logo.svg"
              width="200px"
              height="41.2px"
              alt="vProtocol logo"
              className="hidden lg:block"
            />
          </a>

          <a href="/">
            <img
              src="/mobileLogo.svg"
              width="39.8px"
              height="38px"
              alt="vProtocol logo"
              className="lg:hidden"
            />
          </a>

          {/* Navigation Section (Desktop) */}
          <nav className="hidden lg:flex items-center lg:gap-6 xl:gap-12 gap-4 whitespace-nowrap">
            {landingHeaderNav.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-xl hover:opacity-70 transition duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Button Section (Desktop) */}
        <div className="hidden lg:flex items-center lg:gap-6 xl:gap-12 gap-3">
          <button
            className="text-xl hover:opacity-70 transition duration-300"
            onClick={handleDocsNav}
          >
            Docs
          </button>

          <button
            className="bg-white text-black px-2 py-1.5 rounded-2xl text-base hover:opacity-70 transition duration-300"
            onClick={handleAppNav}
          >
            Open App
          </button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="block lg:hidden">
          <button onClick={toggleMenu}>
            <img
              src="/icons/hamburger.svg"
              width="47px"
              height="5px"
              alt="hamburger icon"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={toggleMenu}
          >
            ✕
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center gap-6 md:gap-12 text-white text-lg">
            {landingHeaderNav.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="hover:opacity-70 transition duration-300"
                onClick={toggleMenu}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-6 md:gap-12">
            <button
              className="text-lg text-white hover:opacity-70 transition duration-300"
              onClick={handleDocsNav}
            >
              Docs
            </button>

            <button
              className="bg-white text-black px-4 py-1 rounded-2xl text-lg hover:opacity-70 transition duration-300"
              onClick={handleAppNav}
            >
              Open App
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingHeader;