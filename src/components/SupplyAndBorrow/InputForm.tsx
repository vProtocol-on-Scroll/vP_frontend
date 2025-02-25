import { useState } from "react"
import { ChevronDown } from "lucide-react"

const currencies = [
    {
        id: "eth",
        name: "ETH",
        icon: "https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-6278326_1280.png",
    },
    { id: "btc", name: "BTC", icon: "https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-6278326_1280.png" },
    { id: "usdc", name: "USDC", icon: "https://cdn.pixabay.com/photo/2021/05/24/09/15/ethereum-6278326_1280.png" },
]

export default function InputForm() {
    const [amount, setAmount] = useState("10")
    const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

    const percentages = [25, 50, 75, 100]

    return (
        <div className="bg-black rounded-3xl p-8 shadow-lg border bg-card text-card-foreground">
            <h2 className="text-[#808080] text-2xl mb-6">I will deposit</h2>

            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-5xl font-medium bg-transparent border-none outline-none w-32"
                    />
                    <span className="text-[#808080] text-xl">≈ $26,941.18</span>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 text-xl py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <img
                            src={selectedCurrency.icon || "/placeholder.svg"}
                            alt={`${selectedCurrency.name} icon`}
                            className="w-8 h-8"
                        />
                        <span>{selectedCurrency.name}</span>
                        <ChevronDown
                            className={`w-5 h-5 text-[#808080] transition-transform duration-200 ${
                                isDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-full min-w-[160px] bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                            {currencies.map((currency) => (
                                <button
                                    key={currency.id}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                                    onClick={() => {
                                        setSelectedCurrency(currency)
                                        setIsDropdownOpen(false)
                                    }}
                                >
                                    <img src={currency.icon || "/placeholder.svg"} alt={`${currency.name} icon`} className="w-6 h-6" />
                                    <span>{currency.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {percentages.map((percentage) => (
                    <button
                        key={percentage}
                        className={`h-12 text-lg border-2 rounded-xl hover:bg-gray-50 transition-colors ${
                            selectedPercentage === percentage ? "border-black" : "border-[#e8e8e8]"
                        }`}
                        onClick={() => setSelectedPercentage(percentage)}
                    >
                        {percentage}%
                    </button>
                ))}
            </div>
        </div>
    )
}

