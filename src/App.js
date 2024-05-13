import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/LayoutIndex";
import RequireAuth from "./components/RequireAuth";
import { Toaster } from "react-hot-toast";
import ProductSelect from "./pages/ProductSelect/Index";
import Products from "./pages/Products/Index";
import Client from "./pages/Clients/Index";
import Login from "./pages/Login/LoginIndex";
import History from "./pages/History/Index";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<ProductSelect />} />
            <Route path="/edit/:quote_id" element={<ProductSelect />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clients" element={<Client />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
