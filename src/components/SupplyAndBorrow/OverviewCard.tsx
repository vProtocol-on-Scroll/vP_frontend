import { Button } from "../Dashboard/Btn.tsx"

export default function OverviewCard() {
    return (
        <div className="h-full flex flex-col">
            <h1 className="text-[#808080] text-3xl mb-4">Overview</h1>

            <div className="bg-black rounded-3xl p-6 mb-4 flex-grow border bg-card text-card-foreground shadow-sm">
                <div className="mb-8">
                    <h2 className="text-2xl font-medium mb-6">vPool</h2>

                    <div className="flex items-center justify-between p-4 border-y">
                        <div className="flex items-center gap-4">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eth-5qzvcM7MLDZLz2oaOPqzGkLrt2xqoG.png"
                                alt="Ethereum"
                                className="w-12 h-12"
                            />
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-medium">Ether</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-medium">10</span>
                                    <span className="text-[#808080] text-xl">${"26,950.90"}</span>
                                </div>
                            </div>
                        </div>

                       <img
                            src="/icons/meter.svg"
                            alt="Meter"
                            className="w-12 h-12"
                        />


                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-[#808080] text-xl mb-2">Borrow APR</h3>
                        <p className="text-4xl font-medium">5.359%</p>
                    </div>

                    <div>
                        <h3 className="text-[#808080] text-xl mb-2">Monthly Cost</h3>
                        <p className="text-4xl font-medium">$120.37</p>
                    </div>
                </div>
            </div>

            <Button className="w-full h-16 text-2xl font-medium bg-[#01d396] hover:bg-[#01d396]/90 text-white rounded-2xl">
                Start earning
            </Button>
        </div>
    )
}

