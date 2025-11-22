import ClientDashboard from "../components/ClientDashboard";
import { cookies } from 'next/headers';

export const metadata = {
  title: "Client Portal | Quick Tech Solutions",
  description: "Secure client dashboard for project management and deliverables.",
};

export default async function ClientPortalPage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get('user_email')?.value;

  return <ClientDashboard userEmail={userEmail} />;
}
