import { useParams } from "react-router-dom"
import DepositCollateralWithdraw from "../../components/Transact/depositCollateralWithdraw"
import SupplyBorrow from "../../components/Transact/SupplyBorrow"

const Transact = () => {
  const { id } = useParams()
  
  if (id === "withdraw" || id === "deposit-collateral") {
    return (
      <DepositCollateralWithdraw />
    )
  } else {
    return (
     <SupplyBorrow />
   ) 
  }
    
  
}

export default Transact