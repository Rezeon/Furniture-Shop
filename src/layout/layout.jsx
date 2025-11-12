import { Footer } from "../component/Footer";
import { Header } from "./header";

export function LayoutPage({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto min-w-0 ">{children}</main>
      <Footer />
    </>
  );
}
