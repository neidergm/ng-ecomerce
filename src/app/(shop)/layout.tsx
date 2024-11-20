import { SideBar, TopMenu } from "@/components";

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen md:p-4">
      <TopMenu />
      <SideBar />
      {children}
    </div>
  );
}