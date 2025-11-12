

export function InformationProduct({Barang}) {
  return (
    <div className="w-full h-auto justify-center gap-2 items-center flex flex-col bg-white">
      <h1 className=" gentium-plus-bold text-gray-900 text-4xl w-full p-2 border-t border-b border-gray-200 justify-center flex items-center ">
        Enjoy our feature products
      </h1>
      <div className="w-[98%] mx-auto grid grid-cols-4 gap-6">
        {Barang.map((b, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-start overflow-hidden"
            >
              {/* Wadah Gambar */}
              <div className="h-[250px] w-full mb-2 bg-gray-100 flex justify-center items-center overflow-hidden">
                <img
                  loading="lazy"
                  src={b.image}
                  alt={b.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Info Produk */}
              <div className="flex justify-between w-full text-gray-800 gentium-plus-bold-italic mt-2">
                <p>{b.name}</p>
                <p>${b.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" gentium-plus-bold text-gray-700 mb-2 text-2xl w-full p-2 border-t border-b border-gray-200 justify-center flex items-center ">
        Shop-Now
      </div>
    </div>
  );
}
