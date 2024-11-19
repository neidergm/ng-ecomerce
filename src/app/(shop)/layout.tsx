import { SideBar, TopMenu } from "@/components";

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-4">
      <TopMenu />
      <SideBar />
      {children}
    </div>
  );
}