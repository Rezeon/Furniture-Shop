import Bg1 from "../../assets/bg-1.svg";
import Product1 from "../../assets/product-1.svg";
import Product2 from "../../assets/product-2.svg";

export function RecommedProduct() {
    return (
        <div className="w-full h-lvh flex relative ">
        <img
          src={Bg1}
          alt="a"
          className="w-full absolute -z-1 h-full object-cover"
        />
        <div className="w-auto top-[4%] right-[7%] bg-white absolute p-3 items-center justify-center h-auto flex flex-col gap-3">
          <img src={Product1} loading="lazy" alt="s" className="w-[50%]" />
          <div className="w-full gentium-plus-regular text-gray-700 flex justify-between">
            <p>Barang 1</p>
            <p>$200.00</p>
          </div>
        </div>
        <div className="w-auto bottom-[5%] left-[8%] bg-white absolute p-3 items-center justify-center h-auto flex flex-col gap-3">
          <img src={Product2} loading="lazy" alt="s" className="w-[50%]" />
          <div className="w-full gentium-plus-regular text-gray-700 flex justify-between">
            <p>Barang 2</p>
            <p>$200.00</p>
          </div>
        </div>
      </div>
    )
}