import EmployerSetting from '@/components/employer/components/EmployerSetting'
import { getCurrentEmployer } from "@/features/employer/employer.quaries";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const currentEmployerData = await getCurrentEmployer();
  if (!currentEmployerData) {
    return redirect("/login");
  }

  console.log("current Employer: ", currentEmployerData);

  return (
    <div>
      <EmployerSetting
        initialData={{
          avatarUrl: currentEmployerData.avatarUrl,
          name: currentEmployerData.employerDetails.name,
          description: currentEmployerData.employerDetails.description,
          organizationType:
            currentEmployerData.employerDetails.organizationType,
          teamSize: currentEmployerData.employerDetails.teamSize,
          location: currentEmployerData.employerDetails.location,
          yearOfEstablishment:
            currentEmployerData.employerDetails.yearOfEstablishment?.toString(),
          websiteUrl: currentEmployerData.employerDetails.websiteUrl,
        }}
      />
    </div>
  );
}

export default page
