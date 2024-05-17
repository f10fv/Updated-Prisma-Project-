"use client";

import { signOut, useSession } from "next-auth/react";
import { IoEyeOutline, IoPeopleOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile({ id }) {
  const [user, setUser] = useState(null);
  const [contractData, setContractData] = useState({
    startDate: "",
    endDate: "",
    salary: "",
    userId: id,
  });
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/register");
        const data = await res.json();
        const foundUser = data.find((user) => user.id === parseInt(id));
        setUser(foundUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUser();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const value =
      e.target.name === "startDate" || e.target.name === "endDate"
        ? new Date(e.target.value).toISOString()
        : e.target.value;

    setContractData({
      ...contractData,
      [e.target.name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert salary to integer
      const salary = parseInt(contractData.salary);
      const contractDataToSend = {
        ...contractData,
        salary: isNaN(salary) ? 0 : salary,
      };
      // Send data to API endpoint
      const response = await fetch("/api/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractDataToSend),
      });

      if (response.ok) {
        // Redirect to dashboard after successful submission
        router.push("/dashboard");
      } else {
        // Handle error response
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="dashBoardContainer">
      <div className="sideNav">
        <h2>
          Welcome {session?.user ? session.user.name : "Guest"}
          <IoEyeOutline
            style={{ fontSize: "20px", marginLeft: "10px", cursor: "pointer" }}
          />
        </h2>
        <ul>
          <li onClick={() => router.push("/dashboard")}>
            <AiOutlineDashboard
              style={{ fontSize: "30px", marginRight: "7px" }}
            />
            Dashboard
          </li>
          {session?.user && session.user.category === "Admin" && (
            <>
              <li onClick={() => router.push("/addUser")}>
                <IoPeopleOutline
                  style={{ fontSize: "30px", marginRight: "7px" }}
                />{" "}
                Manage Employees
              </li>
              <li onClick={() => router.push("/addCategory")}>
                <BiCategoryAlt
                  style={{ fontSize: "30px", marginRight: "7px" }}
                />{" "}
                Category
              </li>
            </>
          )}
          <li onClick={() => router.push("/profile")}>
            <CiUser style={{ fontSize: "30px", marginRight: "7px" }} /> Profile
          </li>
          <li
            onClick={() => {
              signOut().then(() => router.push("/"));
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
        <form className="form-container" onSubmit={handleSubmit}>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              placeholder="Enter the start date ..."
              onChange={handleChange}
              required={true}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              placeholder="Enter the end date ..."
              onChange={handleChange}
              required={true}
            />
          </label>
          <label>
            Salary:
            <input
              type="number"
              name="salary"
              placeholder="Enter the salary ..."
              onChange={handleChange}
              required={true}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
          <br />
        </form>
      </div>
    </div>
  );
}
