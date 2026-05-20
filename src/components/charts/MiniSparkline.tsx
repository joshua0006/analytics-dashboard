interface Props {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

function colorHash(color: string): string {
  let h = 5381;
  for (let i = 0; i < color.length; i++) h = ((h << 5) + h) ^ color.charCodeAt(i);
  return (h >>> 0).toString(36);
}

function buildLinePath(pts: [number, number][], tension = 0.4): string {
  if (pts.length < 2) return `M ${pts[0][0]} ${pts[0][1]}`;
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
    const cp1y = p1[1] + (p2[1] - p0[1]) * tension;
    const cp2x = p2[0] - (p3[0] - p1[0]) * tension;
    const cp2y = p2[1] - (p3[1] - p1[1]) * tension;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d;
}

export function MiniSparkline({ data, color, width = 96, height = 40 }: Props) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const PAD = 5;

  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - ((v - min) / range) * (height - PAD * 2) - PAD,
  ]);

  const linePath = buildLinePath(pts);
  const [lastX, lastY] = pts[pts.length - 1];
  const areaPath = `${linePath} L ${lastX.toFixed(2)} ${height} L 0 ${height} Z`;
  const gradId = `sg-${colorHash(color)}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} overflow="visible" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
          <stop offset="70%"  stopColor={color} stopOpacity="0.06" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <circle cx={lastX} cy={lastY} r="5"   fill={color} opacity="0.18" />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
}
