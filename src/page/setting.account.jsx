import { useEffect, useState } from "react";
import { apiClient } from "../api/account.sign";
import { useMutation, useQuery } from "@tanstack/react-query";

const api = apiClient();

export function SettingAccount() {
  const {
    data: userData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const response = await api.user.getMe();
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await api.user.updateUser(updatedData);
      return response.data;
    },
    onSuccess: () => {
      alert("Profil berhasil diperbarui!");
      refetch();
    },
    onError: (err) => {
      alert(`Gagal memperbarui: ${err.message}`);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await api.user.deleteUser();
      return response;
    },
    onSuccess: () => {
      alert("user deleted");
    },
    onError: (err) => {
      alert(`gagal hapus user: ${err.messages} `);
    },
  });
  const updateMutationAddress = useMutation({
    mutationFn: async (updatedData) => {
      const response = await api.user.updateAddress(updatedData);
      return response.data;
    },
    onSuccess: () => {
      alert("Address berhasil diperbarui!");
      refetch();
    },
    onError: (err) => {
      alert(`Gagal memperbarui: ${err.message}`);
    },
  });
  const createMutationAddress = useMutation({
    mutationFn: async (updatedData) => {
      const response = await api.user.createAddress(updatedData);
      return response.data;
    },
    onSuccess: () => {
      alert("Address berhasil diperbarui!");
      refetch();
    },
    onError: (err) => {
      alert(`Gagal memperbarui: ${err.message}`);
    },
  });

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    address: "",
    postalcode: "",
    phonenumber: "",
  });
  useEffect(() => {
    if (userData) {
      setForm({
        email: userData.email || "",
        name: userData.name || "",
        address: userData.Address?.addressplace || "",
        postalcode: userData.Address?.postalcode || "",
        phonenumber: userData.Address?.phonenumber || "",
      });
    }
  }, [userData]);
  if (isPending) {
    return <div className="p-4">Memuat data pengguna...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500">Error memuat data: {error.message}</div>
    );
  }

  if (!form) {
    return <div className="p-4">Tidak ada data formulir yang tersedia.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan."
    );
    if (isConfirmed) {
      deleteMutation.mutate();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataupdate = {
      name: form.name,
      email: form.email,
    };
    if (form.password !== "") {
      dataupdate.password = form.password;
    }
    updateMutation.mutate(dataupdate);
  };
  const handleSubmitAddress = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      addressplace: form.address,
      postalcode: Number(form.postalcode),
      phonenumber: form.phonenumber,
    };

    if (userData.AddressID) {
      updateMutationAddress.mutate({
        id: userData.AddressID,
        ...dataToSubmit,
      });
    } else {
      try {
        const response = await createMutationAddress.mutateAsync(dataToSubmit);

        const newAddressId = response.ID || response.data?.ID || response.id;

        if (newAddressId) {
          updateMutation.mutate({
            addressId: Number(newAddressId),
          });
        } else {
          alert(
            "Address berhasil dibuat, tetapi gagal mendapatkan ID Address baru."
          );
        }
      } catch (err) {
        console.error("Gagal saat membuat alamat:", err);
      }
    }
  };

  return (
    <div className="w-full mt-[60px] h-full bg-blue-950 flex justify-center items-start p-8">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Pengaturan Akun
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full border text-gray-800 border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full border text-gray-800 border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              updateMutation.isPending
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {updateMutation.isPending ? "Memperbarui..." : "Simpan Perubahan"}
          </button>
        </form>

        <form onSubmit={handleSubmitAddress} className="space-y-4">
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Detail Alamat
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alamat
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="mt-1 block text-gray-800 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kode Pos
              </label>
              <input
                type="text"
                name="postalcode"
                value={form.postalcode}
                onChange={handleChange}
                className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nomor Telepon
              </label>
              <input
                type="text"
                name="phonenumber"
                value={form.phonenumber}
                onChange={handleChange}
                className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              updateMutation.isPending
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {updateMutation.isPending ? "Memperbarui..." : "Simpan Perubahan"}
          </button>
        </form>
        <button
          className={`mt-4 w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white 
      ${
        deleteMutation.isPending
          ? "bg-red-300 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-700"
      }`}
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Menghapus..." : "Hapus Akun"}
        </button>
      </div>
    </div>
  );
}
