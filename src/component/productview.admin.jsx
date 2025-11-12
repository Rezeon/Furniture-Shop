import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/account.sign";

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

export function ProductAdmin({ setSelectedProduct }) {
  const {
    data: products,
    isPending: isProductsLoading,
    isError: isProductsError,
    refetch,
  } = useGetProducts();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (productId) => {
      await api.productAdmin.deleteProduct(productId);
    },
    onSuccess: () => {
      alert("Produk berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      alert(`Gagal menghapus produk: ${err.message}`);
    },
  });
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = (productId, productName) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus produk: ${productName}?`
      )
    ) {
      deleteMutation.mutate(productId);
    }
  };

  if (isProductsLoading) {
    return <div className="p-8 text-center">Memuat daftar produk...</div>;
  }

  if (isProductsError) {
    return (
      <div className="p-8 text-red-500 text-center">Gagal memuat produk.</div>
    );
  }

  const productList = Array.isArray(products) ? products : [];

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Daftar Produk ({productList.length})
      </h2>

      {/* Tabel untuk menampilkan produk */}
      <div className="overflow-x-auto max-h-screen overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deskripsi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productList.map((prod) => (
              <tr key={prod.ID}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {prod.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $ {prod.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {prod.category ? prod.category.name : "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-sm">
                  {prod.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                  <button
                    onClick={() => handleOpenModal(prod)}
                    className="text-indigo-600 hover:text-indigo-900 px-3 py-1 border border-indigo-600 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prod.ID, prod.name)}
                    disabled={deleteMutation.isPending}
                    className={`px-3 py-1 rounded-md text-white transition duration-150 ${
                      deleteMutation.isPending
                        ? "bg-red-300"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
