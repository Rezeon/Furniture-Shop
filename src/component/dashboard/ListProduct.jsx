export function ListProduct({ Barang, setSelectedProduct, isProductsLoading, isProductsError }) {
const scrollTo = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
   const handleOpenModal = (product) => {
scrollTo('detail') 
    setSelectedProduct(product);
  };
  if (isProductsLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-gray-800">
        Memuat data produk...
      </div>
    );
  }

  if (isProductsError) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-red-500">
        Gagal memuat data:
      </div>
    );
  }
  return (
    <div className="w-full h-auto justify-center gap-2 items-center flex flex-col bg-blue-950">
      <h1 className=" gentium-plus-regular text-gray-300 text-2xl w-full p-2 border-t border-b border-gray-200 justify-center flex items-center ">
        Enjoy our feature products
      </h1>
      <div className="w-[98%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {Barang.map((b, index) => {
          return (
            <div
              key={index}
              onClick={() => handleOpenModal(b)}
              className="flex flex-col items-start cursor-pointer hover:border hover:border-white overflow-hidden"
            >
              {/* Wadah Gambar */}
              <div className="h-[250px] w-full mb-2 bg-gray-100 flex justify-center items-center overflow-hidden">
                <img
                  loading="lazy"
                  src={b.image}
                  alt={b.name}
                  className="object-cover w-full md:h-full"
                />
              </div>

              {/* Info Produk */}
              <div className="flex justify-between pr-1 pl-1 w-full text-gray-300 gentium-plus-bold-italic mt-2">
                <p>{b.name}</p>
                <p>${b.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" gentium-plus-regular text-gray-300 mb-2 text-xl w-full p-2 border-t border-b border-gray-200 justify-center flex items-center ">
        Shop-Now
      </div>
    </div>
  );
}
