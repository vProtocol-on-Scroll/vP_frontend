import {Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Markets from "./pages/markets";
import CreateOrder from "./pages/createOrder";
import SupplyBorrow from "./pages/supplyBorrow";
import Rewards from "./pages/rewards";
import Profile from "./pages/profile";
import Leaderboard from "./pages/leaderboard";
import Allocation from "./pages/allocation";


function App() {
;
  
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/create-order/:id" element={<CreateOrder />} />
        <Route path="/transact/:id" element={<SupplyBorrow />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rewards" element={<Rewards />} />
          <Route path="/allocation" element={<Allocation />} />

        <Route
          path="*"
          element={
            <div>
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
  );
}

export default App;
