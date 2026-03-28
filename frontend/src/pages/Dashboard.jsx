import { useEffect, useState } from "react";
import { getFavourites, addFavourite, removeFavourite } from "../services/api";

function Dashboard() {
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = async () => {
    const data = await getFavourites();
    setFavourites(data);
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleAdd = async () => {
    await addFavourite("prop123");
    fetchFavourites();
  };

  const handleRemove = async (id) => {
    await removeFavourite(id);
    fetchFavourites();
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>My Favourites</h2>

      <button onClick={handleAdd}>❤️ Add Property</button>

      <ul>
        {favourites.map((fav) => (
          <li key={fav._id}>
            {fav.propertyId}
            <button onClick={() => handleRemove(fav.propertyId)}>
              ❌ Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;