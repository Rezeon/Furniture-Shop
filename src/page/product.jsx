import { ShoppingBag } from "lucide-react";
import Keramik from "../assets/Keramik.svg";

export function ProductItem() {
  return (
    <div className="w-full mt-[60px] h-lvh bg-blue-950 flex relative ">
      <div className="w-[55%] border-r border-white h-full flex">
        <div className="w-[8%] h-full border-r border-white flex justify-center relative ">
          <p className=" rotate-90 gentium-plus-bold bottom-15 absolute ">
            LOOKBOOK
          </p>
        </div>
        <div className="w-full h-full flex flex-col justify-between p-6 text-white ">
          <h1 className="gentium-plus-bold text-4xl">LOOKBOOK</h1>
          <p className="gentium-plus-regular">
            The pieces stand out for their contemporary straight lines and
            imposing presence. Current, following the world trend of the great
            masters, the furniture stands out for its noble and innovative
            materials, composing sophisticated and exclusive environments.
          </p>
        </div>
      </div>
      <div className="w-[45%] h-full border-r flex justify-center items-center border-white ">
        <div className="w-full h-auto flex flex-col text-white">
          <div className="flex justify-between p-1 border-t border-b border-white ">
            <p>ITEM</p>
            <p>DESCRIPTION</p>
          </div>
          <div className="flex  justify-center items-center">
            <div className="flex w-[80%] mt-2 mb-2 pb-10 items-start justify-center p-4 flex-col gap-2 bg-gray-300">
              <img src={Keramik} className="" alt="keramik" loading="lazy" />
              <div className="flex w-full text-gray-800  justify-between">
                <p>See LOOKBOOK</p>
                <p>SHOP ALL</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between p-1 border-t border-white ">
            <p>MATERIALS</p>
            <p>URANIUM</p>
          </div>
          <div className="flex justify-between p-1 border-t border-white ">
            <p>PRODUCT IN</p>
            <p>INDONESIA</p>
          </div>
          <div className="flex justify-between p-1 border-t border-b  border-white ">
            <p>CATEGORIE</p>
            <p>FLORR</p>
          </div>
          <div className="w-full h-full  flex justify-center items-center">
            <div className="w-[125px]  h-[30px] relative">
              <p className="w-[125px] flex items-center gap-1 h-[30px] transition duration-300 ease-in-out  absolute hover:-top-1 hover:-left-1 top-0 left-0 bg-blue-950 border-white border p-2">
                Add to cart <ShoppingBag size={20} color="white" />
              </p>
              <div className="w-[125px] h-[30px] bg-white border " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
