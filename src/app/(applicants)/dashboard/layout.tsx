
import { getCurrentUser } from "@/features/auth/server/auth.quaries";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  // Protect applicant dashboard
  if (user.role !== "applicant") {
    return redirect("/employer-dashboard");
  }
  return (
    <div className="flex min-h-screen bg-background ">
      <main className="container mx-auto mt-5 ml-70 mr-5">{children}</main>
    </div>
  );
}
