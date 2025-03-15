import  { useState, useEffect, useCallback  } from "react";
import  Carousel  from "react-spring-3d-carousel";
import { config } from "react-spring";
import Variant from "../../components/Dashboard/Variant";
import useGetUtilitiesPeer from "../../hook/read/useGetUtilitiesPeer";
import useGetUserPosition from "../../hook/read/useGetUserPosition";
import { tokenData } from "../../constants/config/tokenData";
import { ethers } from "ethers";
import { Asset } from "../../constants/types";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { formatMoney } from "../../constants/utils/formatMoney";

const VariantCarousel = () => {
    const { isConnected } = useWeb3ModalAccount();
    const { data } = useGetUtilitiesPeer();
    const { totalSupply, totalCollateral, isLoading, userPosition } = useGetUserPosition()


    const netAPY = userPosition
        ? userPosition
            .filter(pos => {
                const token = tokenData.find(t => t.address === pos.address);
                if (!token) return false;
                const formattedDeposit = parseFloat(ethers.formatUnits(pos.poolDeposits, token.decimal || 18));
                return formattedDeposit > 0;
            })
            .reduce((sum, pos) => sum + parseFloat(String(pos.supplyAPY)) / 100, 0)
            .toFixed(2)
        : "0.00";

    const assets: Asset[] = userPosition
        ? userPosition
            .map((pos) => {
                const token = tokenData.find((t) => t.address === pos.address);
                if (!token) return null;

                const formattedCollateral = parseFloat(ethers.formatUnits(pos.collateral, token.decimal || 18));
                if (formattedCollateral <= 0) return null;

                return {
                    src: token.icon,
                    name: token.name,
                    vol: `${formatMoney(formattedCollateral.toFixed(2))}`,
                };
            })
            .filter((asset): asset is Asset => asset !== null)
        : [];


    const slides = [
        {
            key: "1",
            content: (
                <div className="w-[300px] sm:w-[500px] lg:w-[950px]  h-auto flex items-center justify-center">
                    <Variant
                        title="Total Collateral"
                        amount={`${isLoading || !isConnected ? "0" : totalCollateral ?? "0"}`}
                        buttonText="Deposit"
                        bgColor="#01F5FF"
                        typeAssets="Assets"
                        link="/transact/deposit-collateral"
                        assets={assets}
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
                       amount={`${isLoading || !isConnected ? "0" : totalSupply ?? "0"}`}
                        buttonText="Supply"
                        stats={[{ label: "Net APY", value: `${isConnected ? netAPY : "0.00"}%` }]}
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
                        amount={`${isLoading || !isConnected ? "0" : (totalCollateral ?? 0) * 0.79}`}
                        buttonText="Borrow"
                        healthFactor={Number(data?.healthFactor)}
                        bgColor="#01D396"
                        link="/markets"
                    />
                </div>
            ),
        },
    ];

    const [goToSlide, setGoToSlide] = useState(0);
    const [isUserInteracted, setIsUserInteracted] = useState(false); // Track user interaction

    // // Function to handle automatic slide changes
    // const autoSlide = useCallback(() => {
    //     if (!isUserInteracted) {
    //         setGoToSlide((prevSlide) => (prevSlide + 1) % slides.length);
    //     }
    // }, [isUserInteracted, slides.length]);

    // Function to handle automatic slide changes (modified)
    const autoSlide = useCallback(() => {
        setGoToSlide((prevSlide) => {
            const nextSlide = prevSlide + 1;
            if (nextSlide >= slides.length) {
                // Clear interval once all slides are visited
                setIsUserInteracted(true); // Mark the interaction to stop auto-slide
                return prevSlide; // Keep it at the last slide
            }
            return nextSlide;
        });
    }, [slides.length]);

    // // Set up the auto-slide interval
    // useEffect(() => {
    //     const interval = setInterval(autoSlide, 5000); // Change slides every 5 seconds
    //     return () => clearInterval(interval); // Cleanup on component unmount
    // }, [autoSlide]);

    // Set up the auto-slide interval
    useEffect(() => {
        if (!isUserInteracted) { // Only set the interval if the user hasn't interacted
            const interval = setInterval(autoSlide, 5000); // Change slides every 5 seconds
            return () => clearInterval(interval); // Cleanup on component unmount
        }
    }, [autoSlide, isUserInteracted]);

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
                offsetRadius={2}
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
