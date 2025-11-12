export function Footer() {
  return (
    <div className="w-full bg-blue-950 h-lvh flex flex-col">
      <div className="text-white flex  border-b border-white ">
        <div className="text-white white flex flex-col gap-6 w-full items-start justify-around p-5 ">
          <p>STORE</p>
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Contact</a>
        </div>
        <div className="text-white white flex flex-col gap-6 w-full items-start justify-around p-5 border-l border-white ">
          <p>SHOP</p>
          <a href="">All</a>
          <a href="">LookBook</a>
          <a href="">Collections</a>
        </div>
        <div className="text-white white flex flex-col gap-6 w-full items-start border-l border-white justify-around p-5 ">
          <p>COLLECTIONS</p>
          <a href="">Furniture</a>
          <a href="">Lamps</a>
          <a href="">Ceramic</a>
        </div>
        <div className="text-white white flex flex-col gap-6 w-full items-start border-l border-white justify-around p-5 ">
          <p>HELP</p>
          <a href="">Contact</a>
          <a href="">Login</a>
          <a href="">Account</a>
        </div>
      </div>
      <div className="felipa-regular text-8xl h-1/2 font-bold w-full p-7 flex items-center justify-center">
        RHEYNO FURNITURE
      </div>
      <div className="w-full h-1/8 flex items-center justify-center p-3 gentium-plus-regular border-t border-b border-white">
        © REZEON 2025 | RHEYNO FERNANDO
      </div>
    </div>
  );
}
