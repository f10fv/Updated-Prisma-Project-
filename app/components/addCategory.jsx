import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";

export default function AddCategory({ categoryArray, setCategoryArray }) {
  const { data: Session } = useSession();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const handAddCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      alert("All fields are necessary");
      return;
    }
    setCategoryArray((prevArray) => {
      if (!prevArray.includes(category)) {
        return [...prevArray, category];
      }
      navigate("/dashboard");
      return prevArray;
    });
    console.log(categoryArray);
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
              navigate("/dashboard");
            }}
          >
            <AiOutlineDashboard
              style={{ fontSize: "30px", marginRight: "7px" }}
            />
            Dashboard
          </li>
          <li
            onClick={() => {
              navigate("/addUser");
            }}
          >
            <IoPeopleOutline style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
            Manage Employees
          </li>
          <li>
            <BiCategoryAlt style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
            Category
          </li>
          <li>
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
