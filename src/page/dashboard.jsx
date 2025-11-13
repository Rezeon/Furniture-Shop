import { Header } from "../layout/header";
import { Footer } from "../component/Footer";
import { VideoBG } from "../component/dashboard/HeaderProfile";
import background1 from "../assets/bg-2.svg";
import background2 from "../assets/bg-3.svg";
import Email from "../assets/email.svg";
import { InformationWebsite } from "../component/dashboard/yappingWeb";
import { InformationProduct } from "../component/dashboard/informationProduct";
import Bagian1 from "../assets/1.svg";
import Bagian2 from "../assets/2.svg";
import Bagian3 from "../assets/3.svg";
import man from "../assets/manhatan.svg";
import { LookBok } from "../component/dashboard/LookBook";
import { DetailProduct } from "../component/dashboard/ProductDetail";
import { RecommedProduct } from "../component/dashboard/RecommedProduct";
import { ListProduct } from "../component/dashboard/ListProduct";
import { useEffect, useState } from "react";
import { apiClient } from "../api/account.sign";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function Dashboard() {
  const api = apiClient();

  const useGetProducts = () => {
    return useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const response = await api.getAllProducts();
        return response.data;
      },
    });
  };
  const {
    data: products,
    isPending: isProductsLoading,
    isError: isProductsError,
    refetch,
  } = useGetProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    if (products && products.length > 0) {
      if (!selectedProduct) {
        setSelectedProduct(products[0]);
      }
    }
  }, [products]);
  return (
    <div>
      {/*bagian atas video bg*/}
      <VideoBG />
      {/*informasi website*/}
      <InformationWebsite />
      {/*detail product*/}
      <DetailProduct />
      {/*rekomen product*/}
      <RecommedProduct />
      {/*LookBok*/}
      <LookBok selectedProduct={selectedProduct}  />
      {/*List product*/}
      <ListProduct Barang={products} isProductsLoading={isProductsLoading} isProductsError={isProductsError} setSelectedProduct={setSelectedProduct} />
      <div className="w-full h-lvh gap-2 border-b border-gray-500 flex  bg-white">
        <div className="w-[4%] h-full border-r border-gray-500" />
        <div className="w-[50%] h-auto flex flex-col p-2 gap-4 text-gray-900">
          <h1 className="text-5xl gentium-plus-bold">Every detail matter</h1>
          <p className="">
            WE ARE SPECIALIZED IN ADORNMENTS, THAT BRING CHARM TO ANY
            ENVIRONMENT.
          </p>
          <p className="">
            There are multiples of high quality pieces, with styles that
            transition from classic to contemporary. An exclusive selection of
            lampshades, vases, murals, pillows, paintings and many gifts to
            compose great projects. In order selection, a mix of basic style,
            stricter customization and more compact dimensions, composing
            sophisticated and exclusive environments.
          </p>
        </div>
      </div>
      <div className="w-full h-lvh gap-2 border-b border-gray-500 flex relative  bg-white">
        <div className="w-[4%] h-full border-r  relative border-gray-500">
          <p className="rotate-90 gentium-plus-bold bottom-12 absolute text-gray-800">
            DETAILS
          </p>
        </div>
        <div className="p-2 w-[95%] gap-2 flex">
          <img src={Bagian1} className="w-[70%] h-full" alt="" />
          <div className="w-[30%] h-full flex flex-col gap-2 p-2">
            <img src={Bagian2} className="w-full h-auto" alt="" />
            <img src={Bagian3} className="w-full z-1 h-auto" alt="" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center h-auto relative  bg-white">
        <img src={background1} className=" w-[40%] md:w-full md:object-cover" alt="" />
        <img
          src={background2}
          className="w-[30%] md:w-auto  z-1 absolute  md:object-center "
          alt=""
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center h-auto md:h-lvh relative  bg-white">
        <h1 className=" gentium-plus-regular text-gray-800 text-2xl w-full p-2 border-t border-b border-gray-700 justify-center flex items-center ">
          Enjoy our feature products
        </h1>
        <div className="w-full h-full flex">
          <div className="w-[4%] h-full border-r  relative border-gray-500">
            <p className="rotate-90 gentium-plus-bold bottom-12 absolute text-gray-800">
              DETAILS
            </p>
          </div>
          <div className="w-full flex justify-between p-2 text-gray-900">
            <div className="flex w-[45%] h-[80%] flex-col justify-between">
              <h1 className="gentium-plus-bold text-xl md:text-6xl font-bold ">
                Manhattan Pià-terre for a new Chicago apartment
              </h1>
              <p className="gentium-plus-regular text-xs">
                Interior designer Sarah Vaile remembers eyeing a New York City
                apartment—one with bold colors and a personality as distinct as
                its chic owner—in a 2014 issue of House Beautiful, and tucking
                it away for future design inspiration. Years later, in a
                serendipitous turn of events, the woman she’d seen in the
                magazine—a stylish figure now in her 30s—just moved to Chicago.
              </p>
              <p>Shop Now</p>
            </div>
            <div className=" w-[45%] h-full  ">
              <img src={man} className="w-full " alt="" />
            </div>
          </div>
        </div>
        <h1 className=" gentium-plus-regular text-gray-800 text-2xl w-full p-2 border-t border-b border-gray-700 justify-center flex items-center ">
          See all Article
        </h1>
      </div>
      <div className="w-full flex flex-col justify-center items-center h-lvh relative  bg-white">
        <div className="w-full md:w-[80%] h-auto p-2 flex justify-center items-center relative">
          <img src={Email} alt="s" className="w-full object-cover absolute" />
          <div className="w-[80%] md:w-[50%] h-auto p-2 flex flex-col items-center justify-center z-1 gap-16">
            <h1 className="text-7xl text-white gentium-plus-regular ">
              Be part of our club for discount
            </h1>
            <input
              type="text"
              className="border  md:w-[70%] border-white shadow-none bg-transparent rounded-lg placeholder:ml-2 placeholder:text-gray-300 flex items-center p-2 "
              placeholder="YOUR EMAIL"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
