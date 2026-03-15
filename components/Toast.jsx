import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext(null);

const STYLES = {
  success: { bg:'#f0fdf4', border:'#bbf7d0', color:'#15803d', icon:'✅' },
  error:   { bg:'#fef2f2', border:'#fecaca', color:'#b91c1c', icon:'❌' },
  info:    { bg:'#eff6ff', border:'#bfdbfe', color:'#1d4ed8', icon:'ℹ️' },
  warning: { bg:'#fffbeb', border:'#fde68a', color:'#b45309', icon:'⚠️' },
};

function ToastItem({ id, message, variant = 'info', onRemove }) {
  const [visible, setVisible] = useState(false);
  const v = STYLES[variant] || STYLES.info;

  useEffect(() => { const t = setTimeout(() => setVisible(true), 20); return () => clearTimeout(t); }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => onRemove(id), 300);
  }, [id, onRemove]);

  return (
    <div style={{
      display:'flex', alignItems:'center', gap:12,
      background:v.bg, border:`1px solid ${v.border}`,
      borderRadius:12, padding:'13px 16px',
      boxShadow:'0 4px 20px rgba(0,0,0,0.10)',
      minWidth:300, maxWidth:400,
      transition:'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      opacity:visible?1:0,
      transform:visible?'translateX(0)':'translateX(40px)',
      pointerEvents:'all',
    }}>
      <span style={{ fontSize:18, flexShrink:0 }}>{v.icon}</span>
      <span style={{ flex:1, fontSize:14, fontWeight:500, color:v.color }}>{message}</span>
      <button onClick={close} style={{
        background:'none', border:'none', cursor:'pointer',
        color:v.color, opacity:0.6, fontSize:16, padding:0, flexShrink:0,
      }}>✕</button>
    </div>
  );
}

export function ToastProvider({ children, duration = 4000 }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message, variant = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, message, variant }]);
    setTimeout(() => removeToast(id), duration);
  }, [duration, removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position:'fixed', bottom:24, right:24, zIndex:200,
        display:'flex', flexDirection:'column', gap:10, pointerEvents:'none',
      }}>
        {toasts.map(t => (
          <ToastItem key={t.id} id={t.id} message={t.message}
            variant={t.variant} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside <ToastProvider>');
  return { showToast: ctx.showToast };
}

export default ToastProvider;