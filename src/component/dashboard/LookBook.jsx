import { ShoppingBag } from "lucide-react";
import { apiClient } from "../../api/account.sign";
import { useMutation } from "@tanstack/react-query";

const api = apiClient();
export function LookBok({ selectedProduct }) {
 
  const addCart = useMutation({
    mutationFn: (pId) => {
      return  api.cart.addToCart(pId);
    },
    onSuccess: () => {
      alert("succes add cart");
    },
    onError: (err) => {
      alert(`Gagal memperbarui: ${err.message}`);
    },
  });
 const handleCart = (id) => {
    // Memastikan ID valid sebelum mengirim
    if (!id) {
        alert("ID produk tidak valid.");
        return;
    }
    
    // Langsung buat objek payload lengkap dengan Quantity
    const payload = {
        productId: id, // Gunakan key yang sesuai dengan BE (misal: productId)
        quantity: 1   // Berikan Quantity yang wajib
    };

    // Panggil mutate dengan payload yang lengkap dan instan
    addCart.mutate(payload);
  };
  return (
    <div className="w-full h-auto md:h-lvh bg-blue-950 flex flex-col md:flex-row  relative ">
      <div className="w-full md:w-[55%] border-r border-white h-full flex">
        <div className="w-[8%] h-full border-r border-white flex justify-center relative ">
          <p className=" rotate-90 gentium-plus-bold bottom-15 absolute ">
            LOOKBOOK
          </p>
        </div>
        <div className="w-full h-full flex flex-col justify-between p-2 md:p-6 text-white ">
          <h1 className="gentium-plus-bold text-4xl">
            {selectedProduct?.name}
          </h1>
          <p className="gentium-plus-regular">{selectedProduct?.description}</p>
        </div>
      </div>
      <div className="w-full md:w-[45%] h-full border-r flex justify-center items-center border-white ">
        <div className="w-full h-auto flex flex-col text-white">
          <div className="flex justify-between p-1 border-t border-b border-white ">
            <p>ITEM</p>
            <p>DESCRIPTION</p>
          </div>
          <div className="flex  justify-center items-center">
            <div className="flex w-[80%] mt-2 mb-2 pb-10 items-center justify-center p-4 flex-col gap-2 bg-gray-300">
              <img
                src={selectedProduct?.image}
                className=""
                alt="keramik"
                loading="lazy"
              />
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
            <p>{selectedProduct?.category.name}</p>
          </div>
          <div className="w-full h-full  flex justify-center md:justify-start items-center">
            <div className="w-[125px]  h-[30px] relative">
              <div onClick={() => handleCart(selectedProduct?.ID)} className="w-[125px] flex items-center cursor-pointer gap-1 h-[30px] transition duration-300 ease-in-out  absolute hover:-top-1 hover:-left-1 top-0 left-0 bg-blue-950 border-white border p-2">
                Add to cart <ShoppingBag size={20} color="white" />
              </div>
              <div className="w-[125px] h-[30px] bg-white border " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
