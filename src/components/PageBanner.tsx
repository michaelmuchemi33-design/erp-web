const BANNER = "/web-erp-picture-1.png";

export function PageBanner({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden border-b border-slate-100 bg-slate-100">
      <img
        src={BANNER}
        alt="Unity ERP — dashboard, inventory, invoices, mobile and support"
        className="h-[180px] w-full object-cover object-center sm:h-[220px] md:h-[280px] lg:h-[320px]"
        loading="eager"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/15 to-transparent" />
      {(title || subtitle) && (
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:pb-8">
          <div className="mx-auto max-w-6xl">
            {title && (
              <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow sm:text-3xl md:text-4xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1 max-w-xl text-sm text-white/90 drop-shadow md:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
