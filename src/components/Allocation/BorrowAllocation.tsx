import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider"; // Import Slider from radix-ui

export default function BorrowAllocation() {
    // State for the lower and upper limits
    const [minAllocation, setMinAllocation] = useState(100); // Default minimum limit
    const [maxAllocation, setMaxAllocation] = useState(500); // Default maximum limit
    const tokenType = "ETH"; // Example token type

    // Handle changes from the slider (automatically updates both values)
    const handleSliderChange = (value: number[]) => {
        setMinAllocation(value[0]);
        setMaxAllocation(value[1]);
    };

    // Handle minimum manual input change
    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        if (value < maxAllocation) setMinAllocation(value);
    };

    // Handle maximum manual input change
    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        if (value > minAllocation) setMaxAllocation(value);
    };

    // Borrow button action
    const handleBorrow = () => {
        console.log("Borrow Confirmed with range:", minAllocation, maxAllocation);
        // Add additional logic for borrowing here
    };

    // Cancel button action
    const handleCancel = () => {
        console.log("Borrow Cancelled");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className=" p-6 rounded-lg text-white w-96 shadow-md">
                <h1 className="text-xl font-semibold mb-4">Borrow Allocation</h1>

                {/* Slider */}
                <div className="my-4">
                    <p className="text-sm mb-2">Adjust allocation using slider:</p>
                    <div className="mt-2 w-full rounded-lg">
                        <Slider.Root
                            value={[minAllocation, maxAllocation]} // Bind slider to min and max allocations
                            max={2000} // Slider upper limit
                            step={10} // Slider step size
                            minStepsBetweenThumbs={10}
                            onValueChange={handleSliderChange} // Update state on slider change
                            className="relative block w-full bg-[#d7d7d7] h-[17px] rounded-3xl"
                        >
                            {/* Track */}
                            <Slider.Track className="relative  h-2 rounded-full">
                                <Slider.Range className="absolute bg-[#01D396] h-full rounded-full" />
                            </Slider.Track>
                            {/* Thumbs */}
                            <Slider.Thumb className="block w-4 h-4 bg-[#01D396] rounded-full border-2 border-white shadow-md" />
                            <Slider.Thumb className="block w-4 h-4 bg-[#01D396] rounded-full border-2 border-white shadow-md" />
                        </Slider.Root>
                        <div className="flex justify-between mt-2 text-sm">
                            <span>Min: {minAllocation} {tokenType}</span>
                            <span>Max: {maxAllocation} {tokenType}</span>
                        </div>
                    </div>
                </div>

                {/* Manual Inputs */}
                <div className="my-4">
                    <p className="text-sm mb-2">Set allocation manually:</p>
                    <div className="flex gap-4">
                        {/* Min Input */}
                        <div className="flex-1">
                            <label className="block text-xs mb-1">Minimum</label>
                            <input
                                type="number"
                                value={minAllocation}
                                onChange={handleMinInputChange}
                                className="w-full bg-gray-800 p-2 rounded text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Max Input */}
                        <div className="flex-1">
                            <label className="block text-xs mb-1">Maximum</label>
                            <input
                                type="number"
                                value={maxAllocation}
                                onChange={handleMaxInputChange}
                                className="w-full bg-gray-800 p-2 rounded text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Borrow and Cancel Buttons */}
                <div className="mt-4">
                    <button
                        onClick={handleBorrow}
                        className="w-full bg-[#01D396] hover:bg-blue-700 text-white py-2 rounded mb-2"
                    >
                        Borrow
                    </button>
                    <button
                        onClick={handleCancel}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}