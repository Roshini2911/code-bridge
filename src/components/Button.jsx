import React from 'react';

const Spinner = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    style={{ animation: 'btn-spin 0.75s linear infinite', flexShrink: 0 }} aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const VARIANTS = {
  primary:   { bg: '#2563eb', color: '#fff', border: '#2563eb', hBg: '#1d4ed8', shadow: '0 2px 10px rgba(37,99,235,0.28)' },
  secondary: { bg: '#f3f4f6', color: '#374151', border: '#e5e7eb', hBg: '#e5e7eb', shadow: 'none' },
  outline:   { bg: 'transparent', color: '#2563eb', border: '#2563eb', hBg: '#eff6ff', shadow: 'none' },
  ghost:     { bg: 'transparent', color: '#6b7280', border: 'transparent', hBg: '#f3f4f6', shadow: 'none' },
  danger:    { bg: '#ef4444', color: '#fff', border: '#ef4444', hBg: '#dc2626', shadow: '0 2px 10px rgba(239,68,68,0.25)' },
  success:   { bg: '#22c55e', color: '#fff', border: '#22c55e', hBg: '#16a34a', shadow: '0 2px 10px rgba(34,197,94,0.25)' },
  accent:    { bg: '#ff6b35', color: '#fff', border: '#ff6b35', hBg: '#e05520', shadow: '0 2px 10px rgba(255,107,53,0.28)' },
};

const SIZES = {
  sm: { height: 32, px: 12, fontSize: 13, gap: 6,  iconSize: 14 },
  md: { height: 40, px: 18, fontSize: 15, gap: 8,  iconSize: 16 },
  lg: { height: 48, px: 24, fontSize: 17, gap: 10, iconSize: 18 },
};

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, disabled = false, fullWidth = false,
  icon = null, iconRight = null,
  onClick, type = 'button', style = {}, className = '', ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const [active,  setActive]  = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size]       || SIZES.md;
  const isDisabled = disabled || loading;

  return (
    <>
      <style>{`@keyframes btn-spin { to { transform: rotate(360deg); } }`}</style>
      <button
        type={type}
        className={className}
        disabled={isDisabled}
        onClick={!isDisabled ? onClick : undefined}
        onMouseEnter={() => !isDisabled && setHovered(true)}
        onMouseLeave={() => { setHovered(false); setActive(false); }}
        onMouseDown={() => !isDisabled && setActive(true)}
        onMouseUp={() => setActive(false)}
        aria-disabled={isDisabled}
        aria-busy={loading}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          gap: s.gap, width: fullWidth ? '100%' : 'auto',
          height: s.height, padding: `0 ${s.px}px`,
          fontFamily: "'Outfit', sans-serif", fontSize: s.fontSize,
          fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap',
          background: active ? v.hBg : hovered ? v.hBg : v.bg,
          color: v.color,
          border: `1.5px solid ${v.border}`,
          borderRadius: 10,
          boxShadow: hovered && !isDisabled ? v.shadow : 'none',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          opacity: isDisabled ? 0.55 : 1,
          transition: 'all 0.18s ease',
          transform: active && !isDisabled ? 'scale(0.97)' : 'scale(1)',
          outline: 'none', userSelect: 'none',
          ...style,
        }}
        {...rest}
      >
        {loading ? <Spinner size={s.iconSize} /> : icon ? (
          <span style={{ display:'flex', alignItems:'center', flexShrink:0 }}>{icon}</span>
        ) : null}
        {children && <span style={{ display:'flex', alignItems:'center' }}>{children}</span>}
        {iconRight && !loading && (
          <span style={{ display:'flex', alignItems:'center', flexShrink:0 }}>{iconRight}</span>
        )}
      </button>
    </>
  );
}