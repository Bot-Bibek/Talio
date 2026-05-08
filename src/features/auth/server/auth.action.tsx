"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import crypto from "crypto";
import { eq, or } from "drizzle-orm";
import {
  RegisterUserData,
  registerUserSchema,
  LoginUserData,
  loginUserSchema,
} from "../auth.schema";
import {
  createSessionAndSetCookies,
  invalidateSession,
} from "./use-cases/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const registrationAction = async (data: RegisterUserData) => {
  try {
    const { data: validatedData, error } = registerUserSchema.safeParse(data);
    if (error) return { status: "ERROR", message: error.issues[0].message };

    const { name, userName, email, role, password } = validatedData;

    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.userName, userName)));

    if (user) {
      if (user.email == email)
        return { status: "ERROR", message: "Email Already Exists" };
      else return { status: "ERROR", message: "Username Already Exists" };
    }

    const hashPassword = await argon2.hash(password);

    const [result] = await db
      .insert(users)
      .values({ name, userName, email, role, password: hashPassword });

    console.log(result);

    await createSessionAndSetCookies(result.insertId);

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

export const loginUserAction = async (data: LoginUserData) => {
  try {
    const { data: validatedData, error } = loginUserSchema.safeParse(data);
    if (error) return { status: "ERROR", message: error.issues[0].message };

    const { email, password } = validatedData;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return {
        status: "ERROR",
        message: "Invalid Email or Password",
      };
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      return {
        status: "ERROR",
        message: "Invalid Email or Password",
      };
    }

    await createSessionAndSetCookies(user.id);

    return {
      status: "SUCCESS",
      message: "Login Successful..",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Unknown Error Occured! Please Try Again Later",
    };
  }
};

//logout users
export const logoutUserAction = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return redirect("/login");

  const hashedToken = crypto.createHash("sha256").update(session).digest("hex");

  await invalidateSession(hashedToken);
  cookieStore.delete("session");

  return redirect("/login");
};
