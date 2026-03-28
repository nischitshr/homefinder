import { useEffect, useState } from "react";
import {
  getFavourites,
  addFavourite,
  removeFavourite,
  getCurrentUser,
} from "../services/api";

const DUMMY_PROPERTIES = [
  {
    id: "prop101",
    title: "Lakeview Apartment",
    location: "Bangalore",
    price: "Rs 85L",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "prop102",
    title: "City Center Studio",
    location: "Hyderabad",
    price: "Rs 62L",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "prop103",
    title: "Green Villa",
    location: "Pune",
    price: "Rs 1.2Cr",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "prop104",
    title: "Modern Duplex",
    location: "Chennai",
    price: "Rs 98L",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "prop105",
    title: "Sunset Penthouse",
    location: "Mumbai",
    price: "Rs 2.1Cr",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "prop106",
    title: "Family Townhouse",
    location: "Noida",
    price: "Rs 1.05Cr",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
  },
];

function Dashboard() {
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [propertyId, setPropertyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchFavourites = async () => {
    const data = await getFavourites();
    setFavourites(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const loadDashboardData = async () => {
      setLoading(true);
      setError("");
      try {
        const [userData] = await Promise.all([getCurrentUser(), fetchFavourites()]);
        setUser(userData);
      } catch (err) {
        if (err.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleAdd = async () => {
    if (!propertyId.trim()) {
      setError("Enter property ID");
      setSuccess("");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await addFavourite(propertyId.trim());
      setPropertyId("");
      await fetchFavourites();
      setSuccess("Property added to favourites");
    } catch (err) {
      setError(err.message || "Failed to add favourite");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id) => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await removeFavourite(id);
      await fetchFavourites();
      setSuccess("Property removed from favourites");
    } catch (err) {
      setError(err.message || "Failed to remove favourite");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleGoProfile = () => {
    window.location.href = "/profile";
  };

  const handleAddFromCard = async (id) => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await addFavourite(id);
      await fetchFavourites();
      setSuccess("Property added to favourites");
    } catch (err) {
      setError(err.message || "Failed to add favourite");
    } finally {
      setSaving(false);
    }
  };

  const favouriteIds = new Set(favourites.map((fav) => fav.propertyId));

  const favouriteCards = [
    ...DUMMY_PROPERTIES.filter((property) => favouriteIds.has(property.id)),
    ...[...favouriteIds]
      .filter((id) => !DUMMY_PROPERTIES.some((property) => property.id === id))
      .map((id) => ({
        id,
        title: `Custom Favourite ${id}`,
        location: "Saved by you",
        price: "N/A",
        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
      })),
  ];

  const otherCards = DUMMY_PROPERTIES.filter(
    (property) => !favouriteIds.has(property.id)
  );

  return (
    <div className="dashboard-page">
      <nav className="dashboard-navbar">
        <h1 className="dashboard-logo">Homefinder</h1>
        <div className="dashboard-nav-actions">
          <a className="dashboard-nav-link" href="#properties">
            Properties
          </a>
          <button className="dashboard-btn secondary" onClick={handleGoProfile}>
            Profile
          </button>
          <button className="dashboard-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content" id="properties">
        <section className="dashboard-section">
          <h2>Welcome{user?.name ? `, ${user.name}` : ""}</h2>
          <p className="dashboard-meta">
            {user?.email ? `Email: ${user.email}` : "Email: -"}
            {" | "}
            {user?.role ? `Role: ${user.role}` : "Role: -"}
          </p>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>My Favourite Properties</h2>
            <div className="dashboard-add-favourite">
              <input
                placeholder="Enter property ID"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
              />
              <button
                className="dashboard-btn"
                disabled={saving || loading}
                onClick={handleAdd}
              >
                {saving ? "Please wait..." : "Add"}
              </button>
            </div>
          </div>

          {loading && <p className="dashboard-empty">Loading favourites...</p>}
          {!loading && error && <p className="form-message error">{error}</p>}
          {!loading && success && <p className="form-message success">{success}</p>}

          {!loading && favouriteCards.length === 0 ? (
            <p className="dashboard-empty">No favourites yet. Add a property ID.</p>
          ) : !loading ? (
            <div className="property-grid">
              {favouriteCards.map((property) => (
                <article className="property-card favourite" key={property.id}>
                  <img src={property.image} alt={property.title} />
                  <div className="property-card-body">
                    <p className="property-id">{property.id}</p>
                    <h3>{property.title}</h3>
                    <p>{property.location}</p>
                    <p className="price">{property.price}</p>
                    <button
                      className="dashboard-btn secondary"
                      disabled={saving}
                      onClick={() => handleRemove(property.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </section>

        <section className="dashboard-section">
          <h2>Other Properties</h2>
          <div className="property-grid">
            {otherCards.map((property) => (
              <article className="property-card" key={property.id}>
                <img src={property.image} alt={property.title} />
                <div className="property-card-body">
                  <p className="property-id">{property.id}</p>
                  <h3>{property.title}</h3>
                  <p>{property.location}</p>
                  <p className="price">{property.price}</p>
                  <button
                    className="dashboard-btn"
                    disabled={saving}
                    onClick={() => handleAddFromCard(property.id)}
                  >
                    Add to Favourites
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;