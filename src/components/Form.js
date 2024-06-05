import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    gender: "Female",
    age: "",
    hypertension: "",
    heart_disease: "",
    smoking_history: "never",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      setResult(response.data.prediction);
    } catch (error) {
      setError("There was an error! Please try again.");
    }
  };

  return (
    <div
      className="relative"
      style={{
        backgroundImage: "url('/images.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        className="max-w-md mx-auto mt-10 p-6 bg-blue-200 rounded-lg shadow-md"
        style={{
          width: "500px",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-xl font-bold text-green-600 mb-4">
            Diabetes Prediction Form:
          </h1>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age(year)
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hypertension ('1'means Yes '0'means No)
            </label>
            <input
              type="number"
              name="hypertension"
              value={formData.hypertension}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              min="0"
              max="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Heart Disease ('1'means Yes '0'means No)
            </label>
            <input
              type="number"
              name="heart_disease"
              value={formData.heart_disease}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              min="0"
              max="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              BMI
            </label>
            <input
              type="number"
              step="0.01"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              HbA1c Level
            </label>
            <input
              type="number"
              step="0.1"
              name="HbA1c_level"
              value={formData.HbA1c_level}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              min="3.5"
              max="9"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Glucose Level
            </label>
            <input
              type="number"
              name="blood_glucose_level"
              value={formData.blood_glucose_level}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
              min="80"
              max="300"
            />
          </div>
          <label className="block text-sm font-medium text-gray-700">
            Smoking History
          </label>
          <select
            name="smoking_history"
            value={formData.smoking_history}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="Never">Never</option>
            <option value="Former">Former</option>
            <option value="No Info">No Info</option>
          </select>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        {/* Display result */}
        {result && (
          <div className="mt-6">
            <h2 className="text-xl text-black-900 font-bold">
              Prediction Result:{" "}
              {result && result.charAt(0).toUpperCase() + result.slice(1)}
            </h2>
          </div>
        )}
        {/* Display error */}
        {error && (
          <div className="mt-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
