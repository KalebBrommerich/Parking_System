import HomePage from './components/HomePage';
import AddCarPage from './components/AddCarPage';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditCarPage from './components/EditCarPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="add" element={<AddCarPage/>}/>
        <Route path="admin" element={<AdminPage/>}/>
        <Route path="edit" element={<EditCarPage/>}/>
        <Route path="*" element={<div><h1>Error 404 - Page Not Found</h1></div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
