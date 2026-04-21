import { cn } from "@/lib/utils";

type ProgressProps = {
  progress: number;
  isExpired: boolean;
  label?: string;
};

const ProgressIndicator = ({
  progress,
  isExpired,
  label = "Progress",
}: ProgressProps) => {
  // Circle config
  const radius = 36;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full">
      {/* ========== MOBILE (BAR) ========== */}
      <div className="sm:hidden w-full">
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-neutral-6">{label}</span>
          <span className="font-semibold">{progress}%</span>
        </div>

        <div
          className={cn(
            "h-4 w-full p-1 rounded-full bg-primary-4/40 border border-primary-4/50 overflow-hidden",
            isExpired && "bg-neutral-3 border-neutral-3",
          )}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(180deg, rgba(128,176,255,1) 0%, var(--primary-5) 100%)",
              transition: "width 300ms ease",
            }}
          />
        </div>
      </div>

      {/* ========== DESKTOP (CIRCLE) ========== */}
      <div className="relative hidden h-28 w-28 shrink-0 sm:flex items-center justify-center rounded-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 73 73"
          style={{ transform: "rotate(-90deg)" }}
        >
          <title>{`${label} ${progress}%`}</title>
          <defs>
            <linearGradient
              id="progress-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(128,176,255,1)" />
              <stop offset="100%" stopColor="var(--primary-5)" />
            </linearGradient>
          </defs>

          {/* Border Circle Effect */}
          <circle
            cx="36.5"
            cy="36.5"
            r={normalizedRadius}
            fill="none"
            stroke={isExpired ? "#BEBEBE" : "#80B0FF"}
            strokeWidth={strokeWidth + 1}
          />

          {/* Background circle */}
          <circle
            cx="36.5"
            cy="36.5"
            r={normalizedRadius}
            fill="none"
            stroke="#FFF"
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <circle
            cx="36.5"
            cy="36.5"
            r={normalizedRadius}
            fill="none"
            stroke={isExpired ? "#BEBEBE" : `url(#progress-gradient)`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 300ms ease" }}
          />
        </svg>

        {/* Center text */}
        <div className="z-10 w-full h-full  flex flex-col items-center justify-center text-center">
          <p className="text-xs text-neutral-5">{label}</p>
          <p className="text-sm font-semibold text-primary-5">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
