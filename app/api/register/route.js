import prisma from "../../../prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req, res) {
  try {
    let data = await req.json();
    const name = data.name;
    const email = data.email;
    const category = data.category;
    const password = data.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        category: category,
        password: hashedPassword,
      },
    });
    console.log(data);
    return new Response(newUser, {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
  }
}
export async function GET(req, res) {
  try {
    const users = await prisma.user.findMany();
    console.log("The users are:", users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error(error);
  }
}

// export async function DELETE(req, res) {
//   const userId = await req.query.id;
//   console.log(userId);
//   if (req.method === "DELETE") {
//     const user = await prisma.user.delete({
//       where: {
//         id: Number(userId),
//       },
//     });
//     NextResponse.json(user);
//   } else {
//     NextResponse.json({ message: "Method not allowed" });
//   }
// }
