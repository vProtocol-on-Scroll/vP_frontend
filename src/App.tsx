import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Markets from "./pages/markets";
import CreateOrder from "./pages/createOrder";


function App() {
;
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/create-order/:id" element={<CreateOrder />} />
        <Route
          path="*"
          element={
            <div>
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
