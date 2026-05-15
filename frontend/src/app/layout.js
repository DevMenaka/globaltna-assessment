import "./globals.css";

export const metadata = {
  title: "GlobalTNA Assessment",
  description: "Mini Service Request Board",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-gray-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}