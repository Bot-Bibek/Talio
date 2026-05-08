"use client"
import { Button } from "@/components/ui/button";
import { logoutUserAction } from "@/features/auth/server/auth.action";
import React from "react";

function EmployerDashboard() {
  return (
    <div>
      <h1>Employer Dashboard</h1>
      <Button onClick={logoutUserAction}>Logout</Button>
    </div>
  );
}

export default EmployerDashboard
