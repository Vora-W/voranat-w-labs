export default function AdminTopbar({ title, rightContent }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-brown-600">{title}</h1>
      {rightContent != null ? (
        rightContent
      ) : (
        <div className="flex items-center gap-3 rounded-full border border-brown-200 bg-brown-100 px-3 py-2 shadow-sm">
          <div className="h-7 w-7 rounded-full bg-brown-300" />
          <span className="text-sm font-medium text-brown-600">Admin</span>
        </div>
      )}
    </div>
  );
}
