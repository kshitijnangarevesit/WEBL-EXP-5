import React, { useState } from "react";
import "../formStyles.css"; // Importing CSS file

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    trekName: "",
    date: "",
    noOfPeople: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const trekOptions = [
    "Devkund Waterfall",
    "Kalu Waterfall",
    "Adrai",
    "Andharban",
    "Kalsubai",
    "Harishchandragad",
    "Harihargad",
    "Bhairavgad",
    "Jivdan Fort",
    "Ratangad",
    "Kalavantin Durg",
    "Rajgad",
    "Raigad",
    "Gorakhgad",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on typing
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required!";
    if (!formData.trekName) newErrors.trekName = "Trek name is required!";
    if (!formData.date) newErrors.date = "Date is required!";
    if (!formData.noOfPeople || isNaN(formData.noOfPeople) || formData.noOfPeople <= 0) {
      newErrors.noOfPeople = "Enter a valid number of people!";
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required!";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Invalid contact number!";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setSubmittedData(formData);
      setFormData({ name: "", trekName: "", date: "", noOfPeople: "", contactNumber: "" }); // Reset form
    }
  };

  return (
    <div className="form-container">
      <h2>Book Your Trek</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Trek Name:</label>
          <select name="trekName" value={formData.trekName} onChange={handleChange}>
            <option value="">Select a trek</option>
            {trekOptions.map((trek, index) => (
              <option key={index} value={trek}>
                {trek}
              </option>
            ))}
          </select>
          {errors.trekName && <span className="error">{errors.trekName}</span>}
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label>No. of People:</label>
          <input type="number" name="noOfPeople" value={formData.noOfPeople} onChange={handleChange} placeholder="Enter number of people" />
          {errors.noOfPeople && <span className="error">{errors.noOfPeople}</span>}
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter your contact number" />
          {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
        </div>

        <button type="submit">Book Trek</button>
      </form>

      {submittedData && (
        <div className="output">
          <h3>Booking Details:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Trek Name:</strong> {submittedData.trekName}</p>
          <p><strong>Date:</strong> {submittedData.date}</p>
          <p><strong>No. of People:</strong> {submittedData.noOfPeople}</p>
          <p><strong>Contact Number:</strong> {submittedData.contactNumber}</p>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
