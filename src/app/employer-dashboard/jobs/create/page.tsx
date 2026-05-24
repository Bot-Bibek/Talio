import { EmployerJobForm } from "@/components/employer/components/EmployerJobForm";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className="mb-5 "> Post a New Job </h1>
      <EmployerJobForm />
    </div>
  );
}
