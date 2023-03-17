import "bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import TerminalLogin from "./components/TerminalLogin";
import Tables from "./components/Tables";
import Order from "./components/Order";
import Archive from "./components/Archive";
import Orders from "./components/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<TerminalLogin />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/order" element={<Order />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
