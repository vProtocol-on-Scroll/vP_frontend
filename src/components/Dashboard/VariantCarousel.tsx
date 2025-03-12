import  { useState, useEffect, useCallback  } from "react";
import  Carousel  from "react-spring-3d-carousel";
import { config } from "react-spring";
import Variant from "../../components/Dashboard/Variant";

const VariantCarousel = () => {
    const slides = [
        {
            key: "1",
            content: (
                <div className="w-[300px] sm:w-[500px] lg:w-[950px]  h-auto flex items-center justify-center">
                    <Variant
                        title="Total Collateral"
                        amount="$100,504.94"
                        buttonText="Deposit"
                        bgColor="#01F5FF"
                        typeAssets="Assets"
                        link="/transact/deposit-collateral"
                    />
                </div>
            ),
        },
        {
            key: "2",
            content: (
                <div className="w-[300px] sm:w-[500px] lg:w-[950px]  h-auto flex items-center justify-center">
                    <Variant
                        title="Total Supplied"
                        amount="$540,100.72"
                        buttonText="Supply"
                        stats={[{ label: "Net APY", value: "$5.40" }]}
                        bgColor="#A66CFF"
                        link="/transact/supply"
                    />
                </div>
            ),
        },
        {
            key: "3",
            content: (
                <div className="w-[300px] sm:w-[500px] lg:w-[950px]  h-auto flex items-center justify-center">
                    <Variant
                        title="Available to Borrow"
                        amount="$80,403.952"
                        buttonText="Borrow"
                        healthFactor={1}
                        bgColor="#01D396"
                        link="/markets"
                    />
                </div>
            ),
        },
    ];

    const [goToSlide, setGoToSlide] = useState(0);
    const [isUserInteracted, setIsUserInteracted] = useState(false); // Track user interaction

    // Function to handle automatic slide changes
    const autoSlide = useCallback(() => {
        if (!isUserInteracted) {
            setGoToSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }
    }, [isUserInteracted, slides.length]);

    // Set up the auto-slide interval
    useEffect(() => {
        const interval = setInterval(autoSlide, 5000); // Change slides every 5 seconds
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [autoSlide]);

    // Handle user interaction with dots
    const handleDotClick = (index: number) => {
        setIsUserInteracted(true); // Mark that the user has interacted with the navigation
        setGoToSlide(index);
    };


    return (
        <div className="variant-carousel max-w-[1300px] w-full m-auto p-6">
            <Carousel
                slides={slides}
                goToSlide={goToSlide}
                offsetRadius={2} // Number of slides shown to the sides of the active one
                showNavigation={true}
                animationConfig={config.gentle}
                // animationScale={1} // Scale factor for slides. Set to 1 to maintain their size.
            />
            <div className="flex justify-center mt-10 gap-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-4 h-4 rounded-full ${
                            goToSlide === index ? "bg-[#01D396]" : "bg-gray-300"
                        }`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default VariantCarousel;