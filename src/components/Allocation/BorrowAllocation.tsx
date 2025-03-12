import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider"; 
import { useLocation, useNavigate } from "react-router-dom";
import useCreateLoanListingOrder from "../../hook/write/useCreateLoanListingOrder";

export default function BorrowAllocation() {
    const location = useLocation();
    const state = location.state || {};
    const navigate = useNavigate();

    const maxLimit = state?._amount || 1000; 
    const tokenType = state?.tokenName || "Token";

    const isDecimal = !Number.isInteger(maxLimit);
    const stepSize = isDecimal ? 0.001 : 1;

    const [minAllocation, setMinAllocation] = useState(0);
    const [maxAllocation, setMaxAllocation] = useState(maxLimit);

    const handleSliderChange = (value: number[]) => {
        setMinAllocation(value[0]);
        setMaxAllocation(value[1]);
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(e.target.value) || 0;
        value = Math.max(0, Math.min(value, maxAllocation));
        setMinAllocation(value);
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(e.target.value) || 0;
        value = Math.max(minAllocation, Math.min(value, maxLimit)); 
        setMaxAllocation(value);
    };

    const loanListingOrder = useCreateLoanListingOrder(String(state?._amount), String(minAllocation || 0), String(maxAllocation), state?._interest, state?._returnDate, state?.tokenTypeAddress, state?.tokenDecimal, state?.tokenName);
    

    const handleOrderCreation = () => {
        // console.log("Borrow Confirmed with range:", minAllocation, maxAllocation, state?._returnDate, state?._interest, state?.tokenDecimal, state._amount );
        loanListingOrder();
    };

    const handleCancel = () => {
        if (state?.type === "lend") {
             navigate(`/create-order/${state?.type}`);
        } else {
            navigate(`/create-order/market`);
        }
       
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-6 rounded-lg text-white w-96 shadow-lg bg-gray-800">
                <h1 className="text-xl font-semibold mb-4 capitalize">{state?.type} Allocation</h1>

                <div className="my-4">
                    <p className="text-sm mb-2">Adjust allocation using slider:</p>
                    <div className="mt-2 w-full">
                        <Slider.Root
                            value={[minAllocation, maxAllocation]}
                            min={0}
                            max={maxLimit}
                            onValueChange={handleSliderChange}
                            step={stepSize} // Adjust step dynamically
                            className="relative flex items-center w-full h-6"
                        >
                            <Slider.Track className="relative w-full h-2 bg-gray-600 rounded-full">
                                <Slider.Range className="absolute h-full bg-[#01D396] rounded-full" />
                            </Slider.Track>

                            <Slider.Thumb className="block w-5 h-5 bg-[#01D396] rounded-full border-2 border-white shadow-md focus:outline-none" />
                            <Slider.Thumb className="block w-5 h-5 bg-[#01D396] rounded-full border-2 border-white shadow-md focus:outline-none" />
                        </Slider.Root>

                        <div className="flex justify-between mt-2 text-sm">
                            <span>Min: {minAllocation} {tokenType}</span>
                            <span>Max: {maxAllocation} {tokenType}</span>
                        </div>
                    </div>
                </div>

                <div className="my-4">
                    <p className="text-sm mb-2">Set allocation manually:</p>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs mb-1">Minimum</label>
                            <input
                                type="number"
                                value={minAllocation}
                                onChange={handleMinInputChange}
                                min="0"
                                max={maxAllocation - stepSize}
                                step={stepSize} // Adjust step dynamically
                                className="w-full bg-gray-700 p-2 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#01D396]"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-xs mb-1">Maximum</label>
                            <input
                                type="number"
                                value={maxAllocation}
                                onChange={handleMaxInputChange}
                                min={minAllocation + stepSize}
                                max={maxLimit}
                                step={stepSize} // Adjust step dynamically
                                className="w-full bg-gray-700 p-2 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#01D396]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleOrderCreation}
                        className="w-full bg-[#01D396] hover:bg-[#00b386] text-white py-2 rounded mb-2 capitalize font-bold transition"
                    >
                        Create {state?.type} Order
                    </button>
                    <button
                        onClick={handleCancel}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}