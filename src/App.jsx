import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import IdeaManagement from "./pages/IdeaManagement.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/ideas" element={<IdeaManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
