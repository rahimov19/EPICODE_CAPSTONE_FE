import "bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./scss/index.css";
import Login from "./Components/Login";
import Main from "./Components/Main";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.user.accessToken);

  return <>{token === "" ? <Login></Login> : <Main></Main>}</>;
}

export default App;
