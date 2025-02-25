import InputForm from "../../components/SupplyAndBorrow/InputForm.tsx"
import OverviewCard from "../../components/SupplyAndBorrow/OverviewCard.tsx"

export default function Supply() {
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="w-full">
                    <InputForm />
                </div>
                <div className="w-full">
                    <OverviewCard />
                </div>
            </div>
        </div>
    )
}

