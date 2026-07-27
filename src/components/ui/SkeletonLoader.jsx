const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer-slide_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";

function SkeletonBox({ className }) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-sand/30 ${shimmer} ${className}`}
      aria-hidden="true"
    />
  );
}

export function GallerySkeleton() {
  return (
    <div className="flex flex-col items-center gap-20 sm:gap-28 md:gap-36 lg:gap-44 py-12" aria-label="Loading gallery">
      <SkeletonBox className="w-full max-w-[1400px] aspect-[4/3]" />
      <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4">
        <SkeletonBox className="flex-1 aspect-[4/5]" />
        <SkeletonBox className="flex-1 aspect-[4/5]" />
      </div>
      <SkeletonBox className="w-full max-w-[1400px] aspect-[4/3]" />
      <SkeletonBox className="w-full max-w-[900px] aspect-[4/5]" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-ivory" aria-label="Loading page">
      <div className="pt-36 sm:pt-44 lg:pt-52 px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1480px]">
          <SkeletonBox className="h-4 w-32 mb-6" />
          <SkeletonBox className="h-20 w-3/4 mb-6" />
          <SkeletonBox className="h-4 w-1/2 mb-12" />
          <SkeletonBox className="w-full aspect-[16/7] rounded-[10px]" />
        </div>
      </div>
      <div className="mt-20 px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1480px]">
          <SkeletonBox className="h-6 w-48 mb-12" />
          <SkeletonBox className="w-full max-w-[1400px] aspect-[4/3] mb-24" />
          <SkeletonBox className="w-full max-w-[1400px] aspect-[4/3]" />
        </div>
      </div>
    </div>
  );
}
