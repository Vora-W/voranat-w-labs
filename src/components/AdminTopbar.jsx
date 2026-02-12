export default function AdminTopbar({ title, rightContent }) {
  return (
    <div className="flex h-[96px] w-full items-center justify-between gap-10 border-b border-brown-200 px-[60px] py-6">
      <h1 className="text-headline-3 text-brown-600">{title}</h1>
      {rightContent}
    </div>
  );
}
