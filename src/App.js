import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import ContentGrid from "./components/ContentGrid";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/content" element={<ContentGrid />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
