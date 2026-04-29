"use server"

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";

export const registrationAction = async (data: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: "applicant" | "employer";
}) => {
  try {
    const { name, userName, email, role, password } = data;

    const hashPassword = await argon2.hash(password);

    await db
      .insert(users)
      .values({ name, userName, email, role, password: hashPassword });

    return {
      status: "SUCCESS",
      message: "Registration Completed Successfylly",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Unknown Error Occured! Please Try Again Later",
    };
  }
}; 
