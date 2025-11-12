import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/account.sign";
import { Trash2 } from "lucide-react";

const api = apiClient();

export function CategoryPage({useGetCategories}) {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState("");

  const {
    data: categories,
    isPending: isCategoryLoading,
    isError: isCategoryError,
  } = useGetCategories();

  const createMutation = useMutation({
    mutationFn: async (name) => {
      const response = await api.categoryAdmin.createCategory({ name });
      return response.data;
    },
    onSuccess: () => {
      alert("Kategori berhasil dibuat/sudah ada!");
      setCategoryName("");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (err) => {
      alert(`Gagal membuat kategori: ${err.message || "Error server."}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.categoryAdmin.deleteCategory(id);
    },
    onSuccess: () => {
      alert("Kategori berhasil dihapus!");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (err) => {
      alert(`Gagal menghapus kategori: ${err.message || "Error server."}`);
    },
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      createMutation.mutate(categoryName.trim());
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="mb-2">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {" "}
        Tambah Kategori Baru
      </h2>
      <form onSubmit={handleCreateSubmit} className="flex gap-4">
        <input
          type="text"
          placeholder="Nama Kategori (misal: Elektronik)"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="flex-grow border text-gray-900 border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
          disabled={createMutation.isPending}
        />
        <button
          type="submit"
          disabled={createMutation.isPending || !categoryName.trim()}
          className={`p-3 rounded-md text-white font-medium transition duration-150 ${
            createMutation.isPending
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {createMutation.isPending ? "Memproses..." : "Buat Kategori"}
        </button>
      </form>
      {createMutation.isError && (
        <p className="text-red-500 text-sm mt-2">
          Error: {createMutation.error.message}
        </p>
      )}
      <div className="">
        <p className="text-lg mt-1 font-bold mb-1 text-gray-800">
          Daftar Kategori ({categories?.length || 0})
        </p>

        <ul className="divide-y divide-gray-200">
          {categories &&
            categories.map((cat) => (
              <li
                key={cat.ID}
                className="py-1 flex justify-between items-center"
              >
                <span className="text-lg font-medium text-gray-700">
                  {cat.name}
                </span>

                <button
                  onClick={() => handleDelete(cat.ID)}
                  disabled={deleteMutation.isPending}
                  className={`px-4 py-2 text-sm rounded-md text-white font-medium transition duration-150 ${
                    deleteMutation.isPending
                      ? "bg-red-300"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  <Trash2 size={20} color="white" />
                </button>
              </li>
            ))}
        </ul>
        {deleteMutation.isError && (
          <p className="text-red-500 text-sm mt-2">
            Error Hapus: {deleteMutation.error.message}
          </p>
        )}
      </div>
    </div>
  );
}
