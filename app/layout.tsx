import "./globals.css";
import  ApolloWrapper  from "./lib/apollo-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>POS</title>
      <body>
        <ApolloWrapper>
        {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
