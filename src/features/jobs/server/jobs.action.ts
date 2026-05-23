"use server"

import { getCurrentUser } from "@/features/auth/server/auth.quaries"
import { JobPostData, jobPostSchema } from "../jobs.schema"
import { db } from "@/config/db"
import { jobs } from "@/drizzle/schema"

export const createJobPost = async (data:JobPostData) =>{
  try{
    const {success, data: result, error}= jobPostSchema.safeParse(data)
    if(!success){
      console.log("ZOD ERRORS: ", error.flatten())
      console.log("RECEVIED DATA: ", data)

      return{
        status: "ERROR",
        message: error.issues[0].message
      }
    }

    const currentUser = await getCurrentUser();
    if(!currentUser || currentUser.role !== "employer"){
      return {
        status: "ERROR",
        message:"Unauthorized"
      }
    }

    await db.insert(jobs).values({...result, employerId: currentUser.id});
    return {
      status: "SUCCESS",
      message: "Job Post Successfully"
    }
    console.log("Server job post data: ", data)
    console.log("Server job post data 2: ", result)
  }catch(error){
    return{
      status: "ERROR",
      message: "Something went wrong, Please try again"
    }
  }
}