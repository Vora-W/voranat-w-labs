import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout({ title, children, rightContent }) {
  return (
    <div className="min-h-screen bg-brown-100">
      <div className="mx-auto max-w-[1200px] px-8 py-8">
        <div className="grid grid-cols-[260px_1fr] gap-8">
          <AdminSidebar />

          <div className="space-y-6">
            <AdminTopbar title={title} rightContent={rightContent} />

            <main className="rounded-2xl border border-brown-200 bg-brown-100 p-6 shadow-sm">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
