"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import {useRouter} from 'next/navigation'
export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  
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
          <li onClick={() => router.push("/dashboard")}>
            <AiOutlineDashboard
              style={{ fontSize: "30px", marginRight: "7px" }}
            />
            Dashboard
          </li>
          {session?.user && session.category === "Admin" && (
            <li onClick={() => router.push("/addUser")}>
              <IoPeopleOutline
                style={{ fontSize: "30px", marginRight: "7px" }}
              />{" "}
              Manage Employees
            </li>
          )}
          {session?.user && session.category === "Admin" && (
            <li onClick={() => router.push("/addCategory")}>
              <BiCategoryAlt style={{ fontSize: "30px", marginRight: "7px" }} />{" "}
              Category
            </li>
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
        <label style={{fontSize: "20px", fontWeight: "bold" , marginLeft: "10px", marginTop: "10px", color: "#fff"}}>UserName: {session.user.name}</label>
        <label style={{fontSize: "20px", fontWeight: "bold" , marginLeft: "10px", marginTop: "10px", color: "#fff"}}>Email: {session.user.email}</label>
        <label style={{fontSize: "20px", fontWeight: "bold" , marginLeft: "10px", marginTop: "10px", color: "#fff"}}>Category: {session.category}</label>
      </div>
    </div>
  );
}
