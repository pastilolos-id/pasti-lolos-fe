export default function PrivateRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>PrivateRouteLayout</p>
      <div>{children}</div>
    </div>
  );
}
