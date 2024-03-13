import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/LayoutIndex";
import RequireAuth from "./components/RequireAuth";
import { Toaster } from "react-hot-toast";
import ProductSelect from "./pages/ProductSelect/Index";
import Products from "./pages/Products/Index";
import Client from "./pages/Clients/Index";
import Login from "./pages/Login/LoginIndex";
import History from './pages/History/Index'

function App() {

  return (
    <div className="lg:pb-28 md:pt-32 xl:px-40 lg:px-24 md:px-20 px-10">
      <img
        className="bg-cover bg-center w-screen h-screen object-cover fixed -z-20 top-0 left-0 bottom-0 right-0 m-auto"
        src="https://i0.wp.com/backgroundabstract.com/wp-content/uploads/edd/2022/02/5594016-e1656071131636.jpg?resize=150150&ssl=1"
      />
      
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
