import EmployerJobList from "@/components/employer/components/EmployerJobList";
import React from "react";

export default function page() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">My Job Posts</h1>
      <EmployerJobList />
    </div>
  );
}
