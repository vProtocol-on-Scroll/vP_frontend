import { Link } from "react-router-dom"

const Empty = ({text1, text2, text3, btn1, btn2, link1, link2}:any) => {
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
                    <p>{text1}<br />{text2}<br />{text3}</p>
                </div>

                <div className="flex gap-8 items-center text-black mt-6">
                    <Link to={link1} className="w-fit py-2 px-4 rounded-lg cursor-pointer bg-[#01D396] text-lg flex items-center gap-3">
                        {btn1}
                        <img
                            src={"/icons/plusBtn.svg"}
                            alt="btn"
                            width={24}
                            height={24}
                        />
                    </Link>

                    <Link to={link2} className="w-fit py-2 px-4 rounded-lg cursor-pointer bg-[#01D396] text-lg flex items-center gap-3">
                        {btn2}
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