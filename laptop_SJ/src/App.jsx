import { useState } from "react";
import "./App.css";

function App() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [processor, setProcessor] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const laptopModels = {
    HP: ["Pavilion", "ProBook", "EliteBook"],
    Dell: ["Inspiron", "Vostro", "Latitude"],
    Lenovo: ["ThinkPad", "IdeaPad", "Yoga"],
    Apple: ["MacBook Air", "MacBook Pro"],
  };

  const processors = {
    HP: ["i3", "i5", "i7", "Ryzen 5", "Ryzen 7"],
    Dell: ["i3", "i5", "i7", "Ryzen 5", "Ryzen 7"],
    Lenovo: ["i3", "i5", "i7", "Ryzen 5", "Ryzen 7"],
    Apple: ["i5", "i7"],
  };

  function handleSubmit(e) {
    e.preventDefault();

    const f = e.target;
    const name = f.sellerName.value.trim();
    const price = Number(f.price.value);
    const contact = f.contact.value;

    const newErrors = {};

    if (name === "") {
      newErrors.sellerName = "Seller name is required";
    } else if (name.length > 20) {
      newErrors.sellerName = "Name cannot exceed 20 characters";
    }

    if (!brand) {
      newErrors.brand = "Please select a laptop brand";
    }

    if (!model || !(laptopModels[brand] || []).includes(model)) {
      newErrors.model = "Please select a laptop model";
    }

    if (
      !processor ||
      !(processors[brand] || []).includes(processor)
    ) {
      newErrors.processor = "Please select a valid processor";
    }

    if (!f.ram.value) {
      newErrors.ram = "Please select RAM capacity";
    }

    if (!f.storage.value) {
      newErrors.storage = "Please select storage type";
    }

    if (!f.color.value.trim()) {
      newErrors.color = "Laptop color is required";
    }

    if (f.price.value === "" || !Number.isFinite(price) || price <= 0) {
      newErrors.price = "Selling price must be positive";
    }

    if (!/^[0-9]{10}$/.test(contact)) {
      newErrors.contact = "Contact number must contain exactly 10 digits";
    }

    setErrors(newErrors);
    setSuccess("");

    if (Object.keys(newErrors).length === 0) {
      setSuccess("Laptop details submitted successfully!");

      console.log({
        sellerName: name,
        brand,
        model,
        processor,
        ram: f.ram.value,
        storage: f.storage.value,
        color: f.color.value,
        price,
        contact,
        negotiable: f.negotiable.checked,
      });
    }
  }

  return (
    <div className="container">
      <h2>Sell Your Laptop</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label>Seller Name:</label>
        <input name="sellerName" maxLength="100" />
        {errors.sellerName && <p className="error">{errors.sellerName}</p>}

        <label>Laptop Brand:</label>
        <select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setModel("");
            setProcessor("");
          }}
        >
          <option value="">Select Brand</option>
          <option>HP</option>
          <option>Dell</option>
          <option>Lenovo</option>
          <option>Apple</option>
        </select>
        {errors.brand && <p className="error">{errors.brand}</p>}

        <label>Laptop Model:</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={!brand}
        >
          <option value="">Select Model</option>
          {(laptopModels[brand] || []).map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        {errors.model && <p className="error">{errors.model}</p>}

        <label>Processor Type:</label>
        <select
          value={processor}
          onChange={(e) => setProcessor(e.target.value)}
          disabled={!brand}
        >
          <option value="">Select Processor</option>
          {(processors[brand] || []).map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        {errors.processor && <p className="error">{errors.processor}</p>}

        <label>RAM Capacity:</label>
        <select name="ram">
          <option value="">Select RAM</option>
          <option>4 GB</option>
          <option>8 GB</option>
          <option>16 GB</option>
          <option>32 GB</option>
        </select>
        {errors.ram && <p className="error">{errors.ram}</p>}

        <label>Storage Type:</label>
        <select name="storage">
          <option value="">Select Storage</option>
          <option>HDD</option>
          <option>SSD</option>
        </select>
        {errors.storage && <p className="error">{errors.storage}</p>}

        <label>Laptop Color:</label>
        <input name="color" />
        {errors.color && <p className="error">{errors.color}</p>}

        <label>Selling Price:</label>
        <input name="price" type="number" step="any" />
        {errors.price && <p className="error">{errors.price}</p>}

        <label>Contact Number:</label>
        <input
          name="contact"
          type="text"
          maxLength="10"
          inputMode="numeric"
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
          }}
        />
        {errors.contact && <p className="error">{errors.contact}</p>}

        <label className="checkbox">
          <input type="checkbox" name="negotiable" />
          Negotiable
        </label>

        {success && <p className="success">{success}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;