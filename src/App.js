import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContainerBox from "./ContainerBox/ContainerBox";
import Navbar from "./Component/Navbar/Navbar";
import Wishlist from "./Component/Wishlist/Wishlist";
import Order from "./Component/Myorders/Order";
import Cart from "./Component/Cart/Cart";
import Dashboard from "./DashBoard/DashBoard";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<ContainerBox />} />
        <Route path="/:username" element={<Navbar />} />
        <Route path="/:username/wishlist" element={<Wishlist />} />
        <Route path="/:username/my-orders" element={<Order />} />
        <Route path="/:username/cart" element={<Cart />} />
        <Route path="/:username/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
