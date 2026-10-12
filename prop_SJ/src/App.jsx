import { useState } from "react";
import "./App.css";

function App() {
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const bedroomOptions = {
    Flat: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
    Bungalow: ["1", "2", "3", "4", "5"],
    Shop: ["Not Applicable"],
    Office: ["Not Applicable"],
  };

  function handleSubmit(e) {
    e.preventDefault();

    const f = e.target;
    const name = f.name.value.trim();
    const rent = Number(f.rent.value);
    const deposit = Number(f.deposit.value);
    const date = f.date.value;
    const contact = f.contact.value;

    if (name === "" || name.length > 25) {
      alert("Owner name is required and must not exceed 25 characters");
      return;
    }

    if (!type || !bedrooms || !f.location.value.trim() || !f.furnishing.value) {
      alert("Please fill in all fields");
      return;
    }

    if (f.rent.value === "" || rent <= 0 || !Number.isFinite(rent)) {
      alert("Monthly rent must be positive");
      return;
    }

    if (f.deposit.value === "" || deposit <= 0 || !Number.isFinite(deposit)) {
      alert("Security deposit must be positive");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!date || new Date(date + "T00:00:00") < today) {
      alert("Available date cannot be earlier than today");
      return;
    }

    if (!/^[0-9]{10}$/.test(contact)) {
      alert("Contact number must contain exactly 10 digits");
      return;
    }

    const property = {
      ownerName: name,
      propertyType: type,
      location: f.location.value,
      bedrooms: bedrooms,
      furnishing: f.furnishing.value,
      monthlyRent: rent,
      securityDeposit: deposit,
      availableFrom: date,
      contactNumber: contact,
    };

    alert("Property listed successfully!");

    console.log("Property Details:", property);

    f.reset();
    setType("");
    setBedrooms("");
  }

  return (
    <div className="container">
      <h2>Property for Rent</h2>

      <form onSubmit={handleSubmit}>
        <label>Owner Name:</label>
        <input name="name" required maxLength="100" />
        <br /><br />

        <label>Property Type:</label>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setBedrooms("");
          }}
          required
        >
          <option value="">Select Type</option>
          <option>Flat</option>
          <option>Bungalow</option>
          <option>Shop</option>
          <option>Office</option>
        </select>
        <br /><br />

        <label>Property Location:</label>
        <input name="location" required />
        <br /><br />

        <label>Number of Bedrooms:</label>
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          required
          disabled={!type}
        >
          <option value="">Select Bedrooms</option>
          {(bedroomOptions[type] || []).map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <br /><br />

        <label>Furnishing Type:</label>
        <select name="furnishing" required>
          <option value="">Select Furnishing</option>
          <option>Furnished</option>
          <option>Semi-Furnished</option>
          <option>Unfurnished</option>
        </select>
        <br /><br />

        <label>Monthly Rent:</label>
        <input name="rent" type="number" min="0.01" step="any" required />
        <br /><br />

        <label>Security Deposit:</label>
        <input name="deposit" type="number" min="0.01" step="any" required />
        <br /><br />

        <label>Available From Date:</label>
        <input
          name="date"
          type="date"
          min={new Date().toLocaleDateString("en-CA")}
          required
        />
        <br /><br />

        <label>Contact Number:</label>
        <input
          name="contact"
          type="text"
          maxLength="10"
          pattern="[0-9]{10}"
          required
        />
        <br /><br />

        <button type="submit">Submit Property</button>
      </form>
    </div>
  );
}

export default App;
