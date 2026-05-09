import { StatsCards } from "@/components/employer/components/EmployerStats";
import { Button } from "@/components/ui/button";
import { logoutUserAction } from "@/features/auth/server/auth.action";
import { getCurrentUser } from "@/features/auth/server/auth.quaries";
import { getGreeting } from "@/lib/utils";
import { redirect } from "next/navigation";

import React from "react";

const EmployerDashboard: React.FC = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          {getGreeting()}, <span className="capitalize">{user?.name}</span>
        </h1>
        <p className="text-muted-foreground">
          Here is your daily activities and appLications
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />
    </div>
  );
};

export default EmployerDashboard;
