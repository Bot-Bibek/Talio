"use client";
import { Job } from "@/features/jobs/types/jobs.types";
import { Loader2, Turtle } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmployerJopCard from "./EmployerJopCard";
import {
  deleteEmployerJobPost,
  getEmployerJobsAction,
} from "@/features/jobs/server/jobs.action";
import { toast } from "sonner";

export default function EmployerJobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      try {
        const res = await getEmployerJobsAction();

        if (res.status === "SUCCESS" && res.data) {
          setJobs(res.data);
        } else {
          toast.error(res.message || "Failed to load Jobs");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);
  const handleDelete = async (jobId: number) => {
    try {
      const res = await deleteEmployerJobPost(jobId);
      if (res.status === "SUCCESS") {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        toast.success("Job deleted successfully");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An unexpected error occured");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No jobs posted yet</p>
      </div>
    );
  }
  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <EmployerJopCard key={job.id} job={job} onDelete={handleDelete} />
      ))}
    </section>
  );
}
