import { Trash2 } from "lucide-react";
import { apiClient } from "../api/account.sign";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const api = apiClient();
// Custom hook didefinisikan di luar komponen Cart untuk praktik terbaik
const useGetProductUser = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const response = await api.cart.getUserCart();
      // Mengembalikan seluruh objek respons, karena items ada di 'dataCart'
      return response;
    },
    // PERBAIKAN: Gunakan 'dataCart' di initialData agar konsisten dengan BE
    initialData: { dataCart: [] },
  });
};
export function Cart() {
  const {
    data: carts,
    isPending: isPendingCart,
    isError: isCartError,
  } = useGetProductUser();
  const queryClient = useQueryClient();
  // Hapus: const [url, setUrl] = useState({});

  const Checkout = useMutation({
    mutationFn: async () => {
      // MutationFn sekarang hanya mengembalikan data
      const response = await api.order.checkout();
      return response;
    },
    onSuccess: (data) => {
      // 🚨 Data respons kini tersedia di sini
      const paymentUrl = data?.paymentUrl;

      if (!paymentUrl) {
        console.error("URL missing:", data);
        alert("Gagal: URL pembayaran tidak ditemukan.");
        return;
      }

      console.log("Response Object:", data);
      console.log("Payment URL:", paymentUrl);
      window.location.href = paymentUrl;
    },
    onError: (err) => {
      alert(`Gagal: ${err.message || "Error server."}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      await api.cart.updateCartItem(id, payload);
    },
    onSuccess: () => {
      alert("Quantity berhasil di update");
      queryClient.invalidateQueries(["carts"]);
    },
    onError: (err) => {
      alert(`Gagal: ${err.message || "Error server."}`);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.cart.deleteCartItemByCartId(id);
    },
    onSuccess: () => {
      alert("quantity berhasil dihapus!");
      queryClient.invalidateQueries(["carts"]);
    },
    onError: (err) => {
      alert(`Gagal menghapus quantity: ${err.message || "Error server."}`);
    },
  });

  // PERBAIKAN 1: Menentukan variabel yang berisi array item yang benar
  // Menggunakan optional chaining (?) dan fallback ke array kosong []
  const cartItems = carts.data?.dataCart || [];

  if (isPendingCart) {
    return (
      <div className="p-8 text-center text-white mt-[60px]">
        Memuat keranjang belanja...
      </div>
    );
  }

  if (isCartError) {
    return (
      <div className="p-8 text-center text-red-500 mt-[60px]">
        Gagal memuat keranjang. Silakan coba lagi.
      </div>
    );
  }

  // Logika perhitungan diletakkan setelah pengecekan loading/error.
  // PERBAIKAN 2: Menggunakan cartItems (yang berasal dari carts.dataCart)
  const GrandTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price,
    0
  );

  // PERBAIKAN 3: Menggunakan cartItems
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  const handleCheckout = () => {
    Checkout.mutate();
  };

  const handleUpdate = (cartItemId, currentQuantity, condition) => {
    let newQuantity;

    if (condition === "increase") {
      newQuantity = currentQuantity + 1;
    } else {
      // Pastikan kuantitas tidak turun di bawah 1
      newQuantity = Math.max(1, currentQuantity - 1);
    }

    // Jika kuantitas baru sama dengan yang lama, tidak perlu panggil API
    if (newQuantity === currentQuantity) return;

    // Panggil mutate dengan objek tunggal { id, payload }
    updateMutation.mutate({
      id: Number(cartItemId),
      payload: {
        quantity: newQuantity,
      },
    });
  };
  return (
    <div className="w-full h-full p-3 flex flex-col md:gap-0 md:flex-row mt-[60px] bg-blue-950 justify-between text-white">
      <div className="w-full md:w-[60%] flex flex-col mb-2 md:mb-0 gap-2 gentium-plus-regular overflow-y-scroll max-h-[490px] h-full">
        {/* PERBAIKAN 4: Menggunakan cartItems.length */}
        <h2 className="text-3xl font-bold mb-4">
          Shopping Cart ({cartItems.length} items)
        </h2>
        {/* PERBAIKAN 5: Menggunakan cartItems.length */}
        {cartItems.length === 0 ? (
          <div className="p-4 text-center border border-white/50">
            Keranjang Anda kosong.
          </div>
        ) : (
          // PERBAIKAN 6: Menggunakan cartItems.map
          cartItems.map((item) => {
            const product = item.product || {};
            const currentQuantity = item.quantity || 0;
            const itemPrice = (product.price || 0) * item.quantity;

            return (
              <div
                key={item.ID}
                className="w-full border-b border-t border-white relative flex gap-4 shadow bg-blue-950 p-3 items-center"
              >
                <img
                  src={product.image}
                  className="border shadow aspect-square w-[15%] object-cover"
                  alt={product.name}
                />
                <div className="flex h-full flex-col flex-grow">
                  <p className="text-xl font-bold">
                    {product.name || "Unknown Product"}
                  </p>
                  <p className="text-sm text-gray-400">
                    Qty: {currentQuantity}
                  </p>
                  <p className="text-lg">${itemPrice.toFixed(2)}</p>
                </div>
                <div
                  onClick={() => handleDelete(item.ID)}
                  className="absolute right-0 top-0 p-2 cursor-pointer text-white bg-red-600 hover:bg-red-700 transition"
                >
                  <Trash2 size={20} color="white" />
                </div>
                <div className="w-auto absolute right-0 bottom-0 flex gap-1">
                  {/* Tombol Decrease */}
                  <div
                    onClick={() =>
                      handleUpdate(item.ID, currentQuantity, "decrease")
                    }
                    className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer transition duration-300 ease-in-out bg-blue-950 border-white border"
                  >
                    -
                  </div>

                  {/* Kuantitas Display (Optional: jika ingin input) */}
                  <div className="w-[30px] h-[30px] flex items-center justify-center bg-blue-950 border-white border">
                    {currentQuantity}
                  </div>

                  {/* Tombol Increase */}
                  <div
                    onClick={() =>
                      handleUpdate(item.ID, currentQuantity, "increase")
                    }
                    className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer transition duration-300 ease-in-out bg-blue-950 border-white border"
                  >
                    +
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="w-full md:w-[36%] h-full gap-2 flex border-r border-l border-white p-4 overflow-y-auto flex-col bg-blue-950">
        <p className="text-white text-2xl font-bold border-b pb-2">
          Order Summary
        </p>

        <div className="w-full flex justify-between border-b border-white/50 text-xl py-2">
          <p>Total Items</p>
          <p>{totalQuantity}</p>
        </div>

        <div className="w-full flex justify-between text-xl py-2">
          <p>Subtotal</p>
          <p>${GrandTotal.toFixed(2)}</p>
        </div>

        <div className="w-full flex justify-between text-xl py-2">
          <p>Shipping</p>
          <p className="text-sm">Regular ($10.00)</p>
        </div>

        <div className="w-full flex flex-col justify-between text-xl">
          <p>Discount</p>
          <p className="w-full p-1 text-sm ">None (-$0.00)</p>
        </div>

        <div className="w-full flex justify-between text-2xl font-extrabold border-t border-white mt-4 pt-3">
          <p>GRAND TOTAL</p>
          <p>${(GrandTotal + 10).toFixed(2)}</p>
        </div>

        <div className="w-full flex flex-col justify-between text-xl mt-4">
          <div
            onClick={() => handleCheckout()}
            className="w-full p-3 cursor-pointer flex justify-center items-center rounded-xl text-white cursor-pointer bg-gray-900 hover:bg-gray-700 transition"
          >
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
}
