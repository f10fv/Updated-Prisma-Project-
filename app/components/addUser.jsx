"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Register from "./register";

export default function AddEmployee() {
  const { data: Session } = useSession();
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("");
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);

  // const handleRoleChange = (e) => {
  //   const selectedValue = e.target.value;
  //   if (selectedValue === "employees") {
  //     setShowEmployeeDropdown(true);
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       category: `${selectedValue} - ${selectedEmployeeRole}`,
  //     }));
  //   } else {
  //     setShowEmployeeDropdown(false);
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       category: selectedValue,
  //       role: "",
  //     }));
  //   }
  // };

  const handleRoleChange = (e) => {
    const selectedValue = e.target.value;
    console.log("This is the selected value before", selectedValue);
    if (selectedValue === "employees") {
      setShowEmployeeDropdown(true);
      console.log("This is the selected value after", selectedValue);
      setCategory(selectedEmployeeRole);
      console.log("This is the category value ", category);
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: `${category}`,
      }));
    } else {
      setShowEmployeeDropdown(false);
      setCategory(selectedValue);
      setSelectedEmployeeRole("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: `${selectedValue}`,
      }));
      console.log("This tha category When its not employees", category);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
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
      console.log("The selected employee role is:", selectedEmployeeRole);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <div className="dashBoardContainer">
      <div className="sideNav">
        <h2>
          Welcome {Session.user ? Session.user.name : "Guest"}
          <IoEyeOutline
            style={{ fontSize: "20px", marginLeft: "10px", cursor: "pointer" }}
          />
        </h2>
        <ul>
          <li
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <AiOutlineDashboard
              style={{ fontSize: "30px", marginRight: "7px" }}
            />
            Dashboard
          </li>
          <li
            onClick={() => {
              router.push("/addUser");
            }}
          >
            <IoPeopleOutline style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
            Manage Employees
          </li>
          <li
            onClick={() => {
              router.push("/addCategory");
            }}
          >
            <BiCategoryAlt style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
            Category
          </li>
          <li 
            onClick={() => router.push("/profile")}
          >
            <CiUser style={{ fontSize: "30px", marginRight: "7px" }} /> Profile
          </li>
          <li
            onClick={() => {
              signOut();
            }}
          >
            <HiOutlineLogout style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
            Logout
          </li>
        </ul>
      </div>
      <div className="AddEmpContainer">
        <div className="navBar">
          <h1>Employees Management System</h1>
        </div>
          <Register/>
      </div>
    </div>
  );
}
