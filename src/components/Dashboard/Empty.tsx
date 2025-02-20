import { Link } from "react-router-dom"

const Empty = () => {
    return (
        <div className="w-full m-auto mt-6">
            <div className="flex flex-col items-center gap-6 text-white/50 font-kaleko font-bold">
                <div className="text-center text-[70px]">
                    <h3>uh-oh!</h3>
                </div>

                <div className="text-center text-3xl font-bold">
                    <p>There&apos;s nothing here.</p>
                </div>

                <div className="text-center text-3xl mt-4">
                    <p>Let's get things rolling—create your <br />
                        first order now and start your<br />
                        lending adventure!
                    </p>
                </div>

                <div className="flex gap-4 items-center text-black mt-6">
                    <Link to={"/create-order"} className="w-fit p-2 rounded-lg cursor-pointer bg-[#01D396] text-lg flex items-center gap-3">
                        Create Borrow Order
                        <img
                            src={"/icons/plusBtn.svg"}
                            alt="btn"
                            width={24}
                            height={24}
                        />
                    </Link>

                    <Link to={"/create-order"} className="w-fit p-2 rounded-lg cursor-pointer bg-[#01D396] text-lg flex items-center gap-3">
                        Create Lend Order
                        <img
                            src={"/icons/plusBtn.svg"}
                            alt="btn"
                            width={24}
                            height={24}
                        />
                    </Link>
                </div>
            </div>         
        </div>
    )
}

export default Empty