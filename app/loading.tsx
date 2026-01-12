import { LoadingState } from "@/shared/ui";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF9F9]">
      <LoadingState message="Wait for it..." />
    </div>
  );
}
