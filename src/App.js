import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/LayoutIndex";
import RequireAuth from "./components/RequireAuth";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Index";
import Products from "./pages/Products/Index";
import Client from "./pages/Clients/Index";
import Login from "./pages/Login/LoginIndex";

function App() {

  return (
    <div className="bg-gray-100 h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clients" element={<Client />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
