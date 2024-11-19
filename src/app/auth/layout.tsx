
export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-400">
        {children}
    </div>
  );
}