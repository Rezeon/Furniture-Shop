import { Footer } from "../component/Footer";
import { Header } from "./header";
import { Outlet } from "react-router-dom";
export function LayoutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto min-w-0 ">
<Outlet />
</main>
      <Footer />
    </>
  );
}
