import React, { useState, useEffect } from "react";
import { ref, get,set } from "firebase/database";
import "./Saved.css";

function UserSaved({ db }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    country: "",
    bio: "",
  });

  const [savedCountries, setSavedCountries] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = ref(db, "users/user1");
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        setFormData(userData);
        
        const countries = userData.savedCountries || {};
        setSavedCountries(Object.values(countries));  
        setIsSubmitted(true);
      }
    };

    fetchUserData();
  }, [db]);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userRef = ref(db, "users/user1");

    const updatedUserData = { ...formData, savedCountries };
    await set(userRef, updatedUserData);

    setIsSubmitted(true);
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
                      <img src={country.flag} alt={`Flag of ${country.name}`} style={{ width: "25vw", height: "auto" }} />
                      <div className="details-text">
                        <h1>{country.name}</h1>
                        <p><strong>Population:</strong> {country.population ? country.population.toLocaleString() : "N/A"}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Capital:</strong> {country.capital ? country.capital : "N/A"}</p>
                        <p><strong>View Count:</strong> {country.viewCount}</p>
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
              <input placeholder="Full Name" type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input placeholder="Country" type="text" name="country" value={formData.country} onChange={handleChange} />
            </div>
            <div className="form-group">
              <textarea placeholder="Bio" name="bio" value={formData.bio} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="submit-button">Save Profile</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserSaved;