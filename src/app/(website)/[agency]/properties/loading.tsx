export default function PropertiesLoading() {
  return (
    <div className="min-h-screen bg-muted/20 pb-24 pt-28">
      {/* Page Header Skeleton */}
      <div className="bg-primary/5 py-12 border-b mb-10 animate-pulse">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <div className="h-12 bg-muted rounded-full w-64 mb-4"></div>
          <div className="h-6 bg-muted rounded-full w-full max-w-2xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Bar Skeleton */}
        <div className="bg-card rounded-2xl shadow-sm border p-4 mb-8 h-20 animate-pulse hidden lg:block" />

        {/* Results Info Skeleton */}
        <div className="mb-6 h-6 w-48 bg-muted rounded animate-pulse" />

        {/* Properties Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card rounded-3xl border shadow-sm overflow-hidden animate-pulse">
              {/* Image Box */}
              <div className="h-64 bg-muted w-full" />
              
              {/* Content Box */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <div className="h-8 bg-muted rounded-full w-1/3" />
                  <div className="h-8 bg-muted rounded-full w-1/4" />
                </div>
                <div className="h-4 bg-muted rounded-full w-2/3" />
                <div className="h-4 bg-muted rounded-full w-1/2" />
                <div className="pt-4 border-t border-border flex justify-between">
                  <div className="h-4 bg-muted rounded w-16" />
                  <div className="h-4 bg-muted rounded w-16" />
                  <div className="h-4 bg-muted rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
