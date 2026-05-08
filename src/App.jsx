import "./App.css";
import ListEmployeeComponent from "./component/ListEmployeeComponent";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import { BrowserRouter, Route, Routes }  from "react-router-dom";
function App() {
  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
        <Routes>
        {/* // http://localhost:3000 */}
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          {/* // http://localhost:3000/employees */}
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
        </Routes>        
      <FooterComponent />
    </BrowserRouter>
    </>
  );
}

export default App;
