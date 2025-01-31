import { useState } from "react";
import './Saved.css'

function UserSaved(){
const [formData, setFormData] = useState({
    fullname: '',
    email: '',
  country: '',
  bio:'',
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataObj = formData;
    console.log(dataObj);
    setFormData({ fullname: '', email: '', country: '', bio:''}); // Reset the form
    //send dataObj to backend
  };

  return (
    <>
    <div className="form-container">
        <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="name"></label>
        <input
        placeholder="Full Name"
          type="text"
          name="fullname"
          id="fullname"
          value={formData.fullname}
          onChange={handleChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="email"></label>
        <input
        placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        </div>
        <div className="form-group">
         <label htmlFor="country"></label>
        <input
        placeholder="Country"

          type="text"
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
        />
        </div>
        <div className="form-group">
            <label htmlFor="bio"></label>
        <textarea
          type="text"
          name="bio"
          id="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      </div>
    </>
  );
}
export default UserSaved;