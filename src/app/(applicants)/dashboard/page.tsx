import { Button } from '@/components/ui/button';
import { logoutUserAction } from '@/features/auth/server/auth.action';

import React from 'react'

function ApplicantDashboard() {
  
  return (
    <div>
      <h1>Welcome to Applicant Dashboard</h1>
      <Button onClick={logoutUserAction}>Logout</Button>
    </div>
  );
}

export default ApplicantDashboard;
