"use server";
import { db } from "@/config/db";
import { getCurrentUser } from "../../auth/server/auth.quaries";
import { EmployerProfileData } from "../employer.schema";
import { employers, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const updateEmployerProfileData = async (data: EmployerProfileData) => {
  try {
    const currentUserData = await getCurrentUser();
    if (!currentUserData || currentUserData.role !== "employer") {
      return {
        status: "ERROR",
        message: "Unauthorized",
      };
    }
    const {
      name,
      description,
      organizationType,
      teamSize,
      yearOfEstablishment,
      websiteUrl,
      location,
      avatarUrl,
    } = data;

    const updatedEmployer = await db
      .update(employers)
      .set({
        name,
        description,
        organizationType,
        teamSize,
        yearOfEstablishment: yearOfEstablishment
          ? parseInt(yearOfEstablishment)
          : null,
        websiteUrl,
        location,
      })
      .where(eq(employers.id, currentUserData.id));

    console.log("employer", updatedEmployer);

    await db
      .update(users)
      .set({
        avatarUrl,
      })
      .where(eq(users.id, currentUserData.id));

    return {
      status: "SUCCESS",
      message: "Profile Updated Succefully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};
