export default function AgencyGlobalLoading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8">
      {/* 
        Tailwind's animate-pulse provides the shimmering skeleton effect.
        We use generic shapes to represent loading page content.
      */}
      <div className="w-full max-w-4xl space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-12 bg-muted rounded-full w-2/3 md:w-1/2"></div>
          <div className="h-6 bg-muted rounded-full w-3/4 md:w-2/3"></div>
        </div>

        {/* Content Block Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          <div className="h-64 bg-muted rounded-3xl"></div>
          <div className="space-y-4 py-4">
            <div className="h-6 bg-muted rounded-full w-1/4"></div>
            <div className="h-10 bg-muted rounded-full w-3/4"></div>
            <div className="h-4 bg-muted rounded-full w-full"></div>
            <div className="h-4 bg-muted rounded-full w-full"></div>
            <div className="h-4 bg-muted rounded-full w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
