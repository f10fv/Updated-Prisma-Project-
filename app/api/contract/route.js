import prisma from "../../../prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    let data = await req.json();
    console.log("This the data ", data);
    const startDate = data.startDate;
    const endDate = data.endDate;
    const salary = data.salary;
    const userId = parseInt(data.userId);
    const newContract = await prisma.contract.create({
      data: {
        startDate: startDate,
        endDate: endDate,
        salary: salary,
        user: {
          connect: {
            where: {
              id: userId,
            },
          },
        },
      },
    });
    return res.json(newContract);
  } catch (error) {
    console.log("error", error);
    // Handle error response if necessary
    return res.status(500).json({ error: "Internal server error" });
  }
}
