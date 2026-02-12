import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout({ title, children, rightContent }) {
  return (
    <div className="min-h-screen bg-brown-100">
      <div className="flex w-full">
        <AdminSidebar />

        <div className="min-w-0 flex-1 flex flex-col gap-10">
          <AdminTopbar title={title} rightContent={rightContent} />

          <main className="h-full w-full px-[60px] pb-[120px] pl-[60px] pr-[60px]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
