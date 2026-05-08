
import { getCurrentUser } from "@/features/auth/server/auth.quaries";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()

  if(!user) return redirect("/login")

  if(user.role !== "employer") return redirect("/dashboard")
  return (
    <div className="flex min-h-screen bg-background ">
     <h1>{user.name}</h1>
      <main className="container mx-auto mt-5 ml-70 mr-5">{children}</main>
    </div>
  );
}
