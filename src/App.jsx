import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./page/dashboard";
import { SignUp } from "./page/account/signup";
import { SignIn } from "./page/account/signin";
import { Cart } from "./page/cart";
import { LayoutPage } from "./layout/layout";
import { SettingAccount } from "./page/setting.account";
import { ProductItem } from "./page/product";
import { AdminDashboard } from "./page/admin.dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <LayoutPage>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<ProductItem />} />
          <Route path="/setting" element={<SettingAccount />} />
          <Route path="/admin-product" element={<AdminDashboard />} />
        </Routes>
      </LayoutPage>
    </BrowserRouter>
  );
}

export default App;
