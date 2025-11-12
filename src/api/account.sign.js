import axios from "axios";

// Ambil URL API dari environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * @description Mendapatkan headers otorisasi dengan Content-Type: multipart/form-data.
 * Digunakan untuk operasi yang mungkin melibatkan upload file.
 */
const authHeadersMultipart = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

/**
 * @description Mendapatkan headers otorisasi dengan Content-Type: application/json.
 * Digunakan untuk operasi data JSON standar (POST, PUT, DELETE).
 */
const authHeadersJson = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// --- Fungsi Utama Klien API ---

export const apiClient = () => {
  // 1. RUTE NON-TEROTORISASI (Global / Auth)
  // Rute ini tidak menggunakan authHeaders
  const authApi = {
    // POST /sign-up
    signUp: async (payload) => {
      return axios.post(`${BASE_URL}/sign-up`, payload);
    },
    // POST /sign-in (Sebelumnya /login)
    signIn: async (payload) => {
      return axios.post(`${BASE_URL}/sign-in`, payload);
    },
    // GET /product
    getAllProducts: async () => {
      return axios.get(`${BASE_URL}/product`);
    },
    getAllCategory: async () => {
      return axios.get(`${BASE_URL}/category`);
    },
    // GET /product/:id
    getProductById: async (id) => {
      return axios.get(`${BASE_URL}/product/${id}`);
    },
    // POST /api/v1/duitku/callback (Asumsi ini rute publik untuk callback)
    handleDuitkuCallback: async (payload) => {
      return axios.post(`${BASE_URL}/api/v1/duitku/callback`, payload);
    },
  };

  // 2. RUTE GROUP: USERS (/users)
  // Membutuhkan AuthMiddleware
  const userApi = {
    // GET /users/ (GetUserById di backend, asumsikan ini untuk 'me')
    getMe: async () => {
      return axios.get(`${BASE_URL}/users`, authHeadersJson());
    },
    // GET /users/admin (GetUser di backend)
    getAllUsersAdmin: async () => {
      return axios.get(`${BASE_URL}/users/admin`, authHeadersJson());
    },
    // PUT /users/update (UpdateUser)
    updateUser: async (payload) => {
      // Jika payload mengandung file, ganti ke authHeadersMultipart()
      return axios.put(`${BASE_URL}/users/update`, payload, authHeadersJson()); 
    },
    // DELETE /users/delete (DeleteUser)
    deleteUser: async () => {
      return axios.delete(`${BASE_URL}/users/delete`, authHeadersJson());
    },
    // GET /users/address
    getAddress: async () => {
      return axios.get(`${BASE_URL}/users/address`, authHeadersJson());
    },
    // POST /users/create-address
    createAddress: async (payload) => {
      return axios.post(`${BASE_URL}/users/create-address`, payload, authHeadersJson());
    },
    // PUT /users/update-address
    updateAddress: async (payload) => {
      return axios.put(`${BASE_URL}/users/update-address`, payload, authHeadersJson());
    },
    // DELETE /users/delete-address
    deleteAddress: async (id) => {
      return axios.delete(`${BASE_URL}/users/delete-address/${id}`, authHeadersJson()); 
    },
  };

  // 3. RUTE GROUP: PRODUCT ADMIN (/product-admin)
  // Membutuhkan AuthMiddleware & AdminMiddleware
  const productAdminApi = {
    // POST /product-admin/create
    createProduct: async (payload) => {
      return axios.post(`${BASE_URL}/product-admin/create`, payload, authHeadersMultipart());
    },
    // PUT /product-admin/update/:id
    updateProduct: async (id, payload) => {
      return axios.put(`${BASE_URL}/product-admin/update/${id}`, payload, authHeadersMultipart());
    },
    // DELETE /product-admin/delete/:id
    deleteProduct: async (id) => {
      return axios.delete(`${BASE_URL}/product-admin/delete/${id}`, authHeadersJson());
    },
  };

  // 4. RUTE GROUP: CATEGORY ADMIN (/category-admin)
  // Membutuhkan AuthMiddleware & AdminMiddleware
  const categoryAdminApi = {
    // POST /category-admin/create
    createCategory: async (payload) => {
      return axios.post(`${BASE_URL}/category-admin/create`, payload, authHeadersJson());
    },
    // DELETE /category-admin/delete/:id
    deleteCategory: async (id) => {
      return axios.delete(`${BASE_URL}/category-admin/delete/${id}`, authHeadersJson());
    },
  };
    
  // 5. RUTE GROUP: CART (/cart)
  // Membutuhkan AuthMiddleware
  const cartApi = {
      // GET /cart/
      getUserCart: async () => {
        return axios.get(`${BASE_URL}/cart`, authHeadersJson());
      },
      // POST /cart/create
      addToCart: async (payload) => {
        return axios.post(`${BASE_URL}/cart/create`, payload, authHeadersJson());
      },
      // PUT /cart/update/:id
      updateCartItem: async (id, payload) => {
        return axios.put(`${BASE_URL}/cart/update/${id}`, payload, authHeadersJson());
      },
      // DELETE /cart/delete/:id
      deleteCartItem: async (id) => {
        return axios.delete(`${BASE_URL}/cart/delete/${id}`, authHeadersJson());
      },
      // GET /cart/cart-item (GetCartItemByID)
      getCartItemByID: async (id) => {
        return axios.get(`${BASE_URL}/cart/cart-item/${id}`, authHeadersJson());
      },
      // PUT /cart/update-cart/:id (UpdateCartItemQuantity)
      updateCartItemQuantity: async (id, payload) => {
        return axios.put(`${BASE_URL}/cart/update-cart/${id}`, payload, authHeadersJson());
      },
      // DELETE /cart/delete-cart/:id (DeleteCartItem)
      deleteCartItemByCartId: async (id) => {
        // Asumsi ini endpoint alternatif delete
        return axios.delete(`${BASE_URL}/cart/delete-cart/${id}`, authHeadersJson());
      },
  };
    
  // 6. RUTE GROUP: ORDER (/oder)
  // Membutuhkan AuthMiddleware
  const orderApi = {
      // POST /oder/checkout
      checkout: async (payload) => {
        return axios.post(`${BASE_URL}/oder/checkout`,payload, authHeadersJson());
      },
      // GET /oder/
      getUserOrders: async () => {
        return axios.get(`${BASE_URL}/oder`, authHeadersJson());
      },
      // GET /oder/:id
      getOrderById: async (id) => {
        return axios.get(`${BASE_URL}/oder/${id}`, authHeadersJson());
      },
  };

  return {
    ...authApi,
    user: userApi,
    productAdmin: productAdminApi,
    categoryAdmin: categoryAdminApi,
    cart: cartApi,
    order: orderApi,
  };
};