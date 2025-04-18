import { ClerkProvider } from "@clerk/nextjs";


export default function Services({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}
