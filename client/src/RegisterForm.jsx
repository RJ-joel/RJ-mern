import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:9000/register", {
        name,
        email,
        phone,
        location,
        password,
      })
      .then((result) => setStatus(result.data.message || "Registration Successful!"))
      .catch((err) => setStatus("Error: " + err.message));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Online Postal Service</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-md shadow-md">
        <h3 className="text-lg font-bold mb-4">Registration Form</h3>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="input-field"
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="input-field"
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="input-field"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            className="input-field"
            type="text"
            id="location"
            name="location"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="input-field"
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="input-field"
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className="submit-button" type="submit">
          Register
        </button>

        {status && <div className="status-message">{status}</div>}
      </form>
    </div>
  );
}

export default RegisterForm;
