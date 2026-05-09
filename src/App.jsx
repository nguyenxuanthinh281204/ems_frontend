import "./App.css";
import ListEmployeeComponent from "./component/ListEmployeeComponent";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import EmployeeComponent from "./component/EmployeeComponent";
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
          {/* // http://localhost:3000/add-employee */}
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          {/* // http://localhost:3000/edit-employee/:id */}
          <Route path="/edit-employee/:id" element={<EmployeeComponent />}></Route>
          
          
        </Routes>        
      <FooterComponent />
    </BrowserRouter>
    </>
  );
}

export default App;
