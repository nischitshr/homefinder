import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const loadProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        if (err.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
          return;
        }
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="dashboard-page">
      <nav className="dashboard-navbar">
        <h1 className="dashboard-logo">Homefinder</h1>
      </nav>
      <main className="dashboard-content">
        <section className="dashboard-section">
          <h2>Profile</h2>
          {loading && <p className="dashboard-empty">Loading profile...</p>}
          {!loading && error && <p className="form-message error">{error}</p>}
          {!loading && user && (
            <>
              <p className="dashboard-meta">Name: {user.name}</p>
              <p className="dashboard-meta">Email: {user.email}</p>
              <p className="dashboard-meta">Role: {user.role}</p>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
