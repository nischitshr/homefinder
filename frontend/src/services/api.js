const API_URL = "http://localhost:5000/api";

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

// GET FAVOURITES
export const getFavourites = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/favourites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// ADD FAVOURITE
export const addFavourite = async (propertyId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ propertyId }),
  });

  return res.json();
};

// REMOVE FAVOURITE
export const removeFavourite = async (propertyId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/favourites/${propertyId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};