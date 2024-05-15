"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

export default function Register({ formData, setFormData }) {
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("");
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [category, setCategory] = useState("");
  const router = useRouter();
  const navigate = useNavigate();
  const handleRoleChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "employees") {
      setShowEmployeeDropdown(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: `${selectedValue} - ${selectedEmployeeRole}`,
      }));
    } else {
      setShowEmployeeDropdown(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: selectedValue,
        role: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.category ||
      !formData.password
    ) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const userIsAlreadyExist = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const { user } = await userIsAlreadyExist.json();

      if (user) {
        alert("User already exists.");
        return;
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      return;
    }
    try {
      let data = await fetch("/api/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="loginPageContainer">
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            placeholder="Enter your full name ..."
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter your email ..."
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <div>
            <select value={category} onChange={handleRoleChange}>
              <option value="">Select...</option>
              <option value="admin">Admin</option>
              <option value="employees">Employees</option>
            </select>

            {showEmployeeDropdown && (
              <div>
                <label className="selectLabel" htmlFor="employeeRoles">
                  Select an employee role:
                </label>
                <select
                  className="select"
                  value={selectedEmployeeRole}
                  onChange={handleRoleChange}
                >
                  <option value="">Select...</option>
                  <option>UX Designer</option>
                  <option value="ui_developer">UI Developer</option>
                  <option value="SQL_Developer">SQL Developer</option>
                  <option value="Web Designer">Web Designer</option>
                  <option value="Web_Developer">Web Developer</option>
                  <option value="Software_Engineer">Software Engineer</option>
                  <option value="Application_Developer">
                    Application Developer
                  </option>
                  <option value="IT">IT</option>
                  <option value="Cloud_Architect">Cloud Architect</option>
                  <option value="Technical_Specialist">
                    Technical Specialist
                  </option>
                </select>
              </div>
            )}
          </div>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password ..."
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <br />
        <p
          onClick={() => {
            navigate("/");
          }}
        >
          Already have in account..? <span>Sign Up</span>{" "}
        </p>
      </form>
    </div>
  );
}
