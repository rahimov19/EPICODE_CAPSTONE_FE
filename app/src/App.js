import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import TerminalLogin from "./components/TerminalLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<TerminalLogin />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
