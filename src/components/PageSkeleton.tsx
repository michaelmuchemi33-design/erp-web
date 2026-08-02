export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="mx-auto max-w-3xl animate-pulse px-6">
        <div className="h-3 w-24 rounded bg-slate-200" />
        <div className="mt-4 h-10 w-3/4 rounded-lg bg-slate-200" />
        <div className="mt-4 h-4 w-full rounded bg-slate-100" />
        <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
        <div className="mt-10 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 w-1/2 rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-4/5 rounded bg-slate-100" />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="h-8 rounded-lg bg-slate-50" />
                <div className="h-8 rounded-lg bg-slate-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CardGridSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl animate-pulse gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-100 p-5">
          <div className="h-11 w-11 rounded-2xl bg-slate-200" />
          <div className="mt-4 h-4 w-1/2 rounded bg-slate-200" />
          <div className="mt-2 h-8 w-1/3 rounded bg-slate-100" />
          <div className="mt-4 h-12 w-full rounded bg-slate-50" />
        </div>
      ))}
    </div>
  );
}
