import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <p className="text-sm font-medium animate-pulse">Đang tải dữ liệu...</p>
    </div>
  );
}
