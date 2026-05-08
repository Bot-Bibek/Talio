import LoginFrom from "@/components/Login/LoginForm";
import { getCurrentUser } from "@/features/auth/server/auth.quaries";
import { redirect } from "next/navigation";

const LoginPage: React.FC = async () => {
  const user = await getCurrentUser();

  if (user) {
    if (user.role == "employer") return redirect("/employer-dashboard");
    if (user.role == "applicant") return redirect("/dashboard");
  }
  return (
    <>
      <LoginFrom />
    </>
  );
};
export default LoginPage;
