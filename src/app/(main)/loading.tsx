export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-base font-bold text-slate-400 uppercase tracking-widest animate-pulse">SAMIN Loading...</p>
      </div>
    </div>
  );
}
