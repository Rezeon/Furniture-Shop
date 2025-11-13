import { Footer } from "../component/Footer";
import { Header } from "./header";
import { Outlet } from "react-router-dom";

export default function LayoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto min-w-0 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}