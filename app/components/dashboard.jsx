import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default function Dashboard() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("api/register", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // async function deleteUser(user) {
  //   try {
  //     const response = await fetch(`api/register/${user.id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       console.log("User deleted successfully");
  //     } else {
  //       console.error("Failed to delete user:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // }

  //   const handleEditClick = (user) => {
  //     navigate(`/userProfile/${user._id}`, { state: { user } });
  //   };

  return (
    <div className="dashBoardContainer">
      <div className="sideNav">
        <h2>
          Welcome {session.user ? session.user.name : "Guest"}
          <IoEyeOutline
            style={{ fontSize: "20px", marginLeft: "10px", cursor: "pointer" }}
          />
        </h2>
        <ul>
          <li>
            <AiOutlineDashboard
              style={{ fontSize: "30px", marginRight: "7px" }}
            />
            Dashboard
          </li>
          {session?.user && session.category === "admin" && (
            <li onClick={() => navigate("/addUser")}>
              <IoPeopleOutline
                style={{ fontSize: "30px", marginRight: "7px" }}
              />{" "}
              Manage Employees
            </li>
          )}
          {session?.user && session.category === "admin" && (
            <li onClick={() => navigate("/addCategory")}>
              <BiCategoryAlt style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
              Category
            </li>
          )}

          <li>
            <CiUser style={{ fontSize: "30px", marginRight: "7px" }} /> Profile
          </li>
          <li
            onClick={() => {
              signOut().then(() => navigate("/"));
            }}
          >
            <HiOutlineLogout style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
            Logout
          </li>
        </ul>
      </div>
      <div className="tablesContainer">
        <div className="navBar">
          <h1>Employees Management System</h1>
        </div>
        <div className="usersTable">
          <h1>Our Employees</h1>
          <table>
            <thead>
              <tr className="TrThead">
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
                {session?.user && session.category === "admin" && (
                  <th>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                if (session?.user && session.category === "admin") {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.category}</td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MdDelete
                          onClick={() => deleteUser(user)}
                          style={{ fontSize: "25px" }}
                        />

                        <FaEdit
                          onClick={() => handleEditClick(user)}
                          style={{ fontSize: "25px" }}
                        />
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.category}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
