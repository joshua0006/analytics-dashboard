interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface Props {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  formatter?: (value: number, name: string) => string;
}

export function ChartTooltip({ active, payload, label, formatter }: Props) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-xl text-xs font-mono">
      <div className="text-muted mb-1.5">{label}</div>
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: item.color }} />
          <span className="text-muted">{item.name}:</span>
          <span className="text-primary font-semibold">
            {formatter ? formatter(item.value, item.name) : item.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
