import React, { useState, useEffect } from "react";
import "./Saved.css";

function UserSaved() {
  // need user id in local storage to have form disappear 
  const [user_id, setUserId] = useState(localStorage.getItem("user_id") || null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    country: "",
    bio: "",
  });
  const [savedCountries, setSavedCountries] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(localStorage.getItem("isSubmitted") === 'true' || false);

  const API_URL = "https://countriesapi-1.onrender.com";

  useEffect(() => {
    if (user_id) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${API_URL}/user/${user_id}`);
          const data = await response.json();
          if (response.ok) {
            // data.data response obj and content, without name wont show
            setFormData({
              fullname: data.data.user_name || "",
              email: data.data.user_email || "",
              country: data.data.user_country || "",
              bio: data.data.bio || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      const fetchSavedCountries = async () => {
        try {
          const response = await fetch(`${API_URL}/saved-countries/${user_id}`);
          const data = await response.json();
          if (response.ok) {
            setSavedCountries(data.data);
          }
        } catch (error) {
          console.error("Error fetching saved countries:", error);
        }
      };

      fetchUserData();
      fetchSavedCountries();
    }
  }, [user_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/add-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: formData.fullname,
          user_email: formData.email,
          user_country: formData.country,
          bio: formData.bio,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // form stays subitted when navigating pages
        localStorage.setItem("isSubmitted", 'true');  
        if (data.user_id) {
          localStorage.setItem("user_id", data.user_id);
          setUserId(data.user_id);
        }
      } else {
        alert("Failed to save profile.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="welcome-container">
          <h2>Welcome, {formData.fullname}!</h2>
          <div className="saved-country-container">
            <h3>Saved Countries</h3>
            {savedCountries.length > 0 ? (
              <div className="country-list">
                {savedCountries.map((country, index) => (
                  <div key={index} className="country-item">
                    <div className="details-container">
                      <img
                        src={country.flag}
                        alt={`Flag of ${country.country_name}`}
                        style={{ width: "25vw", height: "auto" }}
                      />
                      <div className="details-text">
                        <h1>{country.country_name}</h1>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Capital:</strong> {country.capital || "N/A"}</p>
                        <p>
                          <strong>Population:</strong> 
                          {country.population ? country.population.toLocaleString() : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No saved countries yet!</p>
            )}
          </div>
        </div>
      ) : (
        <div className="form-container">
          <h2>My Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                placeholder="Full Name"
                type="text"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Country"
                type="text"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Save Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserSaved;