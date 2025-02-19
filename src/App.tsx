import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";


function App() {
;
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
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
