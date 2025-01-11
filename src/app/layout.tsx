import "./globals.css";
import { Inter } from "next/font/google";

import { ApolloWrapper } from "~/components/providers/ApolloProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description: "Explore countries, continents, and languages worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <div className="min-h-screen bg-[#342E6A]">
            <div className="flex h-full">{children}</div>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
