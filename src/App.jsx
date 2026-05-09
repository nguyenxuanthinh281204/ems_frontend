import './index.css';
import './App.css';
import { useState, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SidebarComponent from './component/SidebarComponent';
import HeaderComponent from './component/HeaderComponent';
import FooterComponent from './component/FooterComponent';
import ListEmployeeComponent from './component/ListEmployeeComponent';
import EmployeeComponent from './component/EmployeeComponent';
import ToastNotification from './component/ToastNotification';

function App() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <BrowserRouter>
      <div className="ems-layout">
        {/* Sidebar */}
        <SidebarComponent />

        {/* Main area */}
        <div className="ems-main">
          <HeaderComponent />

          <Routes>
            <Route path="/"               element={<ListEmployeeComponent addToast={addToast} />} />
            <Route path="/employees"      element={<ListEmployeeComponent addToast={addToast} />} />
            <Route path="/add-employee"   element={<EmployeeComponent     addToast={addToast} />} />
            <Route path="/edit-employee/:id" element={<EmployeeComponent  addToast={addToast} />} />
          </Routes>

          <FooterComponent />
        </div>

        {/* Global Toasts */}
        <ToastNotification toasts={toasts} removeToast={removeToast} />
      </div>
    </BrowserRouter>
  );
}

export default App;
