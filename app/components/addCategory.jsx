"use client"

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import { useRouter } from 'next/navigation'

export default function AddCategory() {
  const { data: Session } = useSession();
  const [category, setCategory] = useState("");
  const [categoryArray, setCategoryArray] = useState({})
  const router = useRouter()

  const handAddCategory = (e) => {
    setCategoryArray({name: e.target.value})
    console.log("Category", categoryArray)
    console.log("value", e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryArray) {
      alert("All fields are necessary");
      return;
    }
    console.log("categoryArray ",categoryArray)
    try {
      let data = await fetch("/api/category", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(categoryArray),
      });
      console.log(data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error registering the category:", error);
    }
  };

  return (
    <div className="dashBoardContainer">
      <div className="sideNav">
        <h2>
          Welcome {Session?.user ? Session.user.name : "Guest"}
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
          <li>
            <BiCategoryAlt style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
            Category
          </li>
          <li onClick={() => router.push("/profile")}>
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
        <div className="addCategory">
          <form onSubmit={handleSubmit} className="CategoryForm">
            <label>
              Add a Category :
              <input
                onChange={handAddCategory}
                type="text"
                placeholder="Enter Category Name"
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
