import { useState } from "react";
import "./App.css";

function App() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const models = {
    "Maruti Suzuki": ["Swift", "Baleno", "Dzire"],
    Hyundai: ["i10", "i20", "Creta"],
    Tata: ["Nexon", "Punch", "Tiago"],
    Honda: ["City", "Amaze", "Jazz"],
  };

  function handleSubmit(e) {
    e.preventDefault();

    const f = e.target;
    const name = f.name.value.trim();
    const year = Number(f.year.value);
    const price = Number(f.price.value);
    const km = Number(f.km.value);
    const contact = f.contact.value;
    const currentYear = new Date().getFullYear();

    if (name === "" || name.length > 25) {
      alert("Name is required and must not exceed 25 characters");
      return;
    }

    if (!brand || !model || !f.fuel.value) {
      alert("Select brand, model and fuel type");
      return;
    }

    if (!f.year.value || !Number.isInteger(year) ||
        year < 1886 || year > currentYear) {
      alert("Enter a valid manufacturing year");
      return;
    }

    if (f.price.value === "" || !Number.isFinite(price) || price <= 0) {
      alert("Price must be positive");
      return;
    }

    if (f.km.value === "" || !Number.isFinite(km) || km < 0) {
      alert("Kilometers must be zero or positive");
      return;
    }

    if (!/^[0-9]{10}$/.test(contact)) {
      alert("Contact number must contain exactly 10 digits");
      return;
    }

    alert("Car details submitted successfully!");

    f.reset();
    setBrand("");
    setModel("");
  }

  return (
    <div className="container">
      <h2>Sell Your Used Car</h2>

      <form onSubmit={handleSubmit}>
        <label>Owner Name:</label>
        <input name="name" required maxLength="100" />
        <br /><br />

        <label>Car Brand:</label>
        <select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setModel("");
          }}
          required
        >
          <option value="">Select Brand</option>
          <option>Maruti Suzuki</option>
          <option>Hyundai</option>
          <option>Tata</option>
          <option>Honda</option>
        </select>
        <br /><br />

        <label>Car Model:</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          disabled={!brand}
        >
          <option value="">Select Model</option>
          {(models[brand] || []).map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <br /><br />

        <label>Fuel Type:</label>
        <select name="fuel" required>
          <option value="">Select Fuel</option>
          <option>Petrol</option>
          <option>Diesel</option>
          <option>CNG</option>
          <option>Electric</option>
        </select>
        <br /><br />

        <label>Manufacturing Year:</label>
        <input name="year" type="number" required />
        <br /><br />

        <label>Selling Price:</label>
        <input name="price" type="number" step="any" required />
        <br /><br />

        <label>Kilometers Driven:</label>
        <input name="km" type="number" min="0" step="any" required />
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

        <label>
          <input type="checkbox" name="negotiable" />
          Negotiable
        </label>
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;