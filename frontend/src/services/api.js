const API_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, options);

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(data.error || "Request failed");
    error.status = response.status;
    throw error;
  }

  return data;
};

// LOGIN
export const loginUser = async (email, password) => {
  return request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

// REGISTER
export const registerUser = async (name, email, password) => {
  return request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
};

// GET LOGGED-IN USER
export const getCurrentUser = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("Not authorized, no token");
  }

  return request("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// GET FAVOURITES
export const getFavourites = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("Not authorized, no token");
  }

  return request("/favourites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ADD FAVOURITE
export const addFavourite = async (propertyId) => {
  const token = getToken();
  if (!token) {
    throw new Error("Not authorized, no token");
  }

  return request("/favourites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ propertyId }),
  });
};

// REMOVE FAVOURITE
export const removeFavourite = async (propertyId) => {
  const token = getToken();
  if (!token) {
    throw new Error("Not authorized, no token");
  }

  return request(`/favourites/${propertyId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};