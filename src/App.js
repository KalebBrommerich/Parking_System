import HomePage from './components/HomePage';
import AddCarPage from './components/AddCarPage';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="add" element={<AddCarPage/>}/>
        <Route path="*" element={<div><h1>Error 404 - Page Not Found</h1></div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
