import React, { useState, useEffect } from "react";
import "./Saved.css";

function UserSaved({ currentUserName }) {
  console.log("Current User Name:", currentUserName);
  const [formData, setFormData] = useState({
    fullname: currentUserName || "Guest",
    email: "",
    country: "",
    bio: "",
  });

  const [savedCountries, setSavedCountries] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); 

  useEffect(() => {
    const savedIsSubmitted = localStorage.getItem("isSubmitted") === "true";
    setIsSubmitted(savedIsSubmitted);

    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    const userData = usersData[currentUserName] || {
      fullname: currentUserName,
      email: "",
      country: "",
      bio: "",
      savedFlags: [],
    };

    setFormData(userData);
    setSavedCountries(userData.savedFlags);
  }, [currentUserName]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    usersData[currentUserName] = { ...formData, savedFlags: savedCountries };
    localStorage.setItem("usersData", JSON.stringify(usersData));

    localStorage.setItem("isSubmitted", "true");
    setIsSubmitted(true);
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="welcome-container">
          <h2>Welcome, {formData.fullname}!</h2>
          <div className="saved-country-container">
            <h3>Saved Countries</h3>
            {savedCountries.length > 0 && (
              <div className="country-list">
                {savedCountries.map((country, index) => (
                  <div key={index} className="country-item">
                    <img src={country.flag} alt={`${country.name} flag`} />
                    <h3>{country.name}</h3>
                  </div>
                ))}
              </div>
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
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
           <input
              placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
              placeholder="Country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
              placeholder="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Save Profile</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserSaved;


