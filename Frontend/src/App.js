import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Policy from "./pages/Policy.js";
import PageNotFound from "./pages/PageNotFound.js";
import Register from "./pages/auth/Register.js";
import Login from "./pages/auth/Login.js";
import Dashboard from "./pages/user/Dashboard.js";
import Private from "./components/routes/Private.js";
import ForgotPassword from "./pages/auth/ForgotPassword.js";
import AdminRoute from "./components/routes/AdminRoute.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import CreateCategory from "./pages/admin/CreateCategory.js";
import CreateProduct from "./pages/admin/CreateProduct.js";
import Users from "./pages/admin/Users.js";
import Orders from "./pages/user/Orders.js";
import Profile from "./pages/user/Profile.js";
import Products from "./pages/admin/Products.js";
import UpdateProduct from "./pages/admin/UpdateProduct.js";
import ProductDetails from "./pages/ProductDetails.js";
import CartPages from "./pages/CartPages.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPages />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/dashboard" element={<Private />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard/>}/>
      <Route path="admin/create-category" element={<CreateCategory/>}/>
      <Route path="admin/create-product" element={<CreateProduct/>}/>
      <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
      <Route path="admin/products" element={<Products/>}/>
      <Route path="admin/users" element={<Users/>}/>
      </Route>

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
