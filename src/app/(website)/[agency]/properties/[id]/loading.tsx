export default function PropertyDetailsLoading() {
  return (
    <div className="min-h-screen bg-muted/20 pb-24 pt-24">
      {/* Gallery Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[400px] md:h-[500px] lg:h-[600px]">
          <div className="lg:col-span-3 h-full bg-muted rounded-3xl" />
          <div className="hidden lg:grid grid-rows-2 gap-4 h-full">
            <div className="bg-muted rounded-xl" />
            <div className="bg-muted rounded-xl" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-card rounded-2xl border p-6 md:p-8 space-y-6">
              <div className="h-10 bg-muted rounded-full w-3/4" />
              <div className="h-6 bg-muted rounded-full w-1/4" />
              <div className="h-12 bg-muted rounded-full w-1/3" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-card p-4 rounded-xl border h-32 flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 bg-muted rounded-full" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl border p-6 md:p-8 space-y-4">
              <div className="h-8 bg-muted rounded-full w-1/3 mb-4" />
              <div className="h-4 bg-muted rounded-full w-full" />
              <div className="h-4 bg-muted rounded-full w-full" />
              <div className="h-4 bg-muted rounded-full w-5/6" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-2xl border p-6 space-y-6">
              <div className="h-6 bg-muted rounded-full w-1/2" />
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-5 bg-muted rounded-full w-3/4" />
                  <div className="h-4 bg-muted rounded-full w-1/2" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-12 bg-muted rounded-xl w-full" />
                <div className="h-12 bg-muted rounded-xl w-full" />
              </div>
              <div className="space-y-4 pt-6 border-t">
                <div className="h-6 bg-muted rounded-full w-1/2" />
                <div className="h-12 bg-muted rounded-md w-full" />
                <div className="h-12 bg-muted rounded-md w-full" />
                <div className="h-24 bg-muted rounded-md w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
