import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"p-4 antialiased"}>
        {<ApolloProviderWrapper>{children}</ApolloProviderWrapper>}
      </body>
    </html>
  );
}
