import "./globals.css";
import ClientLayout from "../src/components/ClientLayout";

export const metadata = {
  title: "Quick Tech Solutions | Premium Software Agency",
  description: "Web site created using create-react-app",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
