import { useState } from "react";
import backgroundV from "../../assets/background.mp4";
import { FaSpinner, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/account.sign";
import { useMutation } from "@tanstack/react-query";

const api = apiClient();

const FloatingLabelInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  name,
}) => {
  return (
    <div className="relative w-full mb-6">
      <input
        id={id}
        type={type}
        required
        placeholder=" "
        value={value}
        onChange={onChange}
        name={name}
        className="peer input input-bordered rounded-xl p-3 w-full placeholder-transparent bg-transparent text-white 
                   focus:outline-none focus:ring-0 focus:border-2 border-2 border-white/50 focus:border-white transition duration-300"
      />
      <label
        htmlFor={id}
        className={`absolute left-3 px-1 z-10 transition-all font-semibold cursor-text text-white/80
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:-translate-y-1/2 
                    peer-focus:text-white peer-focus:bg-black/50 peer-placeholder-shown:text-lg peer-focus:text-sm`}
      >
        {label}
      </label>
    </div>
  );
};
export function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const mutation = useMutation({
    mutationFn: (user) => api.signIn(user),
    onSuccess: (response) => {
      const token = response?.data?.token || response?.data?.user?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        setError(
          "logil berhasil, tetapi gagal mendapatkan token. Silakan masuk secara manual."
        );
        navigate("/signin");
      }
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleLink = () => {
    navigate("/signup");
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    mutation.mutate(form);
    setLoading(false);
  };

  return (
    <div className="w-full relative items-center justify-center flex h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className=" w-full h-full absolute object-cover -z-10"
      >
        <source src={backgroundV} type="video/mp4" />
      </video>

      {/* Container Formulir (Frosted Glass) */}
      <div className="w-[450px] h-auto p-8 bg-black/30 backdrop-blur-md border justify-center gap-6 flex flex-col items-center border-white/40 rounded-xl shadow-2xl relative z-10">
        {/* 3. Ubah Judul */}
        <h1 className="gentium-plus-bold text-3xl text-white">
          Masuk ke Akun Anda
        </h1>

        {error && (
          <div className="w-full p-3 bg-red-600/80 text-white rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-4"
        >
          {/* Input: Email */}
          <FloatingLabelInput
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            name="email"
          />

          {/* Input: Password */}
          <FloatingLabelInput
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            name="password"
          />

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-white text-gray-900 py-3 rounded-xl font-bold text-lg 
                       hover:bg-gray-200 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Masuk...
              </>
            ) : (
              <>
                <FaSignInAlt /> Masuk
              </>
            )}
          </button>

          <a
            href="/forgot-password"
            className="text-sm text-white/70 hover:underline"
          >
            Lupa Password?
          </a>
        </form>

        {/* 4. Ubah Link */}
        <p className="text-sm text-white/70 mt-2">
          Belum punya akun?{" "}
          <a
            onClick={handleLink}
            className="text-white font-bold hover:underline"
          >
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
}
