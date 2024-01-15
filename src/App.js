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
    <div className="bg-gray-100 h-screen pt-32 md:pt-32 xl:px-60 lg:px-40 md:px-20 px-10">
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
