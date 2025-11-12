import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/account.sign";
import { useEffect, useState } from "react";
import { CategoryPage } from "./category.admin";
import { ProductAdmin } from "../component/productview.admin";

const api = apiClient();
const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.getAllCategory();

      return response.data;
    },
  });
};
export function AdminDashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const queryClient = useQueryClient();
  const {
    data: categories,
    isPending: isCategoryLoading,
    isError: isCategoryError,
  } = useGetCategories();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
  });
  const updateProduct = useMutation({
    mutationFn: async (updatedData) => {
      await api.productAdmin.updateProduct(selectedProduct.ID, updatedData);
    },
    onSuccess: () => {
      alert("Produk berhasil diperbarui!");
      onclose();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSelectedProduct(null);
      setForm({
        name: "",
        price: "",
        description: "",
        categoryId: "",
      });
    },
    onError: (err) => {
      alert(`Gagal memperbarui produk: ${err.message}`);
    },
  });
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    if (selectedProduct != null) {
      setForm({
        name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.description,
        categoryId: selectedProduct.categoryId,
      });
      setImageFile(selectedProduct.image);
    }
  }, [selectedProduct]);
  const createProductMutation = useMutation({
    mutationFn: async (prodctData) => {
      const response = await api.productAdmin.createProduct(prodctData);
      return response.data;
    },
    onSuccess: () => {
      alert("product berhasil dibuat");
      queryClient.invalidateQueries["products"];

      setForm({ name: "", price: "", description: "", categoryId: "" });
      setImageFile(null);
    },
    onError: (err) => {
      console.error("Error creating product:", err);
      alert(
        `Gagal menambahkan produk: ${
          err.message || "Terjadi kesalahan server."
        }`
      );
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Harap masukkan gambar produk.");
      return;
    }
    if (!form.categoryId) {
      alert("Harap pilih kategori.");
      return;
    }
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("categoryId", form.categoryId);
    formData.append("image", imageFile);
    console.log(formData);
    if (selectedProduct != null) {
      updateProduct.mutate(formData);
    } else {
      createProductMutation.mutate(formData);
    }
  };
  if (isCategoryLoading) {
    return <div className="p-8 text-center">Memuat data kategori...</div>;
  }

  if (isCategoryError) {
    return (
      <div className="p-8 text-red-500 text-center">Gagal memuat kategori.</div>
    );
  }

  return (
    <div className="w-full min-h-screen mt-[60px] pl-4 pr-4 bg-blue-950 flex gap-2 justify-center py-10">
      {" "}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <CategoryPage useGetCategories={useGetCategories} />{" "}
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {selectedProduct ? "Update product" : "Tambah product"}
        </h2>{" "}
        <p className="block text-sm font-medium text-gray-700">Image Product</p>
        <img
          src={
                imageFile instanceof File
                  ? URL.createObjectURL(imageFile)
                  : imageFile
              }

          className="w-full p-1 h-auto"
          alt={form.name}
          loading="lazy"
        />
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
          {/* 1. Nama Produk */}{" "}
          <div>
            {" "}
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Produk{" "}
            </label>{" "}
            <input
              type="text"
              name="name"
              id="name"
              required
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />{" "}
          </div>
          {/* 2. Harga */}{" "}
          <div>
            {" "}
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Harga (Rp){" "}
            </label>{" "}
            <input
              type="number"
              name="price"
              id="price"
              required
              min="1"
              value={form.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />{" "}
          </div>
          {/* 3. Deskripsi */}{" "}
          <div>
            {" "}
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Deskripsi{" "}
            </label>{" "}
            <textarea
              name="description"
              id="description"
              required
              rows="3"
              value={form.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />{" "}
          </div>
          {/* 4. Kategori */}{" "}
          <div>
            {" "}
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Kategori{" "}
            </label>{" "}
            <select
              name="categoryId"
              id="categoryId"
              required
              value={form.categoryId}
              onChange={handleChange}
              className="mt-1 block text-gray-900 w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {" "}
              <option value="" disabled>
                Pilih Kategori{" "}
              </option>{" "}
              {categories.map((cat) => (
                <option key={cat.ID} value={cat.ID}>
                  {cat.name}{" "}
                </option>
              ))}{" "}
            </select>{" "}
          </div>
          {/* 5. Gambar Produk */}{" "}
          <div>
            {" "}
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Gambar Produk{" "}
            </label>{" "}
            <input
              type="file"
              name="image"
              id="image"
              required
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"
            />{" "}
            {imageFile && (
              <p className="mt-2 text-sm text-gray-500">
                File terpilih: {imageFile.name}{" "}
              </p>
            )}{" "}
          </div>{" "}
          <button
            type="submit"
            disabled={createProductMutation.isPending}
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition duration-150 ease-in-out ${
              createProductMutation.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {" "}
            {selectedProduct != null
              ? updateProduct.isPending
                ? "Updating product... "
                : "update product"
              : createProductMutation.isPending
              ? "Sedang Menambahkan..."
              : "Tambah Produk"}{" "}
            Tambah
          </button>{" "}
          {createProductMutation.isError && (
            <p className="text-red-500 text-sm mt-2">
              Gagal: {createProductMutation.error.message}{" "}
            </p>
          )}{" "}
        </form>{" "}
      </div>{" "}
      <div>
        <ProductAdmin setSelectedProduct={setSelectedProduct} />{" "}
      </div>{" "}
    </div>
  );
}
