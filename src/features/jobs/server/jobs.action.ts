"use server";

import { getCurrentUser } from "@/features/auth/server/auth.quaries";
import { JobPostData, jobPostSchema } from "../jobs.schema";
import { db } from "@/config/db";
import { jobs } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { Job } from "../types/jobs.types";

export const createJobPost = async (data: JobPostData) => {
  try {
    const { success, data: result, error } = jobPostSchema.safeParse(data);
    if (!success) {
      console.log("ZOD ERRORS: ", error.flatten());
      console.log("RECEVIED DATA: ", data);

      return {
        status: "ERROR",
        message: error.issues[0].message,
      };
    }

    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "employer") {
      return {
        status: "ERROR",
        message: "Unauthorized",
      };
    }

    await db.insert(jobs).values({ ...result, employerId: currentUser.id });
    return {
      status: "SUCCESS",
      message: "Job Post Successfully",
    };
    console.log("Server job post data: ", data);
    console.log("Server job post data 2: ", result);
  } catch (error) {
    return {
      status: "ERROR",
      message: "Something went wrong, Please try again",
    };
  }
};

export const getEmployerJobsAction = async (): Promise<{
  status: "SUCCESS" | "ERROR";
  data?: Job[];
  message?: string;
}> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "employer") {
      return {
        status: "ERROR",
        data: [],
      };
    }

    const result = await db
      .select()
      .from(jobs)
      .where(eq(jobs.employerId, currentUser.id))
      .orderBy(jobs.createdAt);

    return {
      status: "SUCCESS",
      data: result as Job[],
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Something went wrong",
    };
  }
};

export const deleteEmployerJobPost = async (jobId: number) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "employer") {
      return {
        status: "ERROR",
        message: "Unauthorized",
      };
    }

    await db
      .delete(jobs)
      .where(and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id)));

    return {
      status: "SUCCESS",
      message: "Job deleted successfully",
    };
  } catch (error) {
    console.log("Delete_Job_Error", error);
    return {
      status: "ERROR",
      message: "Somthing went wrong while deleting",
    };
  }
};
