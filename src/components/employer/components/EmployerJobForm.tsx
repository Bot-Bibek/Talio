"use client";
import { JobPostData, jobPostSchema } from "@/features/jobs/jobs.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function EmployerJobForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobPostData>({
    resolver: zodResolver(jobPostSchema),
  });
  return <div></div>;
}
