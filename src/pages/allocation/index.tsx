import BorrowAllocation from "../../components/Allocation/BorrowAllocation.tsx";

const Allocation = () => {

    return (
        <div className="flex flex-col justify-center items-center font-kaleko p-2 lg:p-0 h-screen 2xl:-mt-24 -mt-12">
            <div>
                <p className="text-base text-white px-2">Create Order</p>

               <BorrowAllocation/>
            </div>
        </div>
    );
};

export default Allocation;
