import React, { useEffect } from 'react';

export default function Modal({
  isOpen = false, onClose, title = '',
  size = 'md', hideClose = false, footer = null, children,
}) {
  const maxWidth = { sm:'400px', md:'540px', lg:'720px', xl:'960px' }[size] || '540px';

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes modal-in { from{opacity:0} to{opacity:1} }
        @keyframes modal-slide { from{opacity:0;transform:translateY(-16px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        .gymflow-modal-close:hover { background: #f3f4f6 !important; }
      `}</style>
      <div onClick={onClose} style={{
        position:'fixed', inset:0, background:'rgba(17,24,39,0.5)',
        backdropFilter:'blur(4px)', zIndex:100,
        display:'flex', alignItems:'center', justifyContent:'center', padding:24,
        animation:'modal-in 0.2s ease',
      }}>
        <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" style={{
          background:'#fff', borderRadius:20,
          boxShadow:'0 24px 64px rgba(0,0,0,0.18)',
          width:'100%', maxWidth, maxHeight:'90vh',
          display:'flex', flexDirection:'column',
          animation:'modal-slide 0.22s cubic-bezier(0.34,1.56,0.64,1)',
          border:'1px solid #e5e7eb',
        }}>
          {(title || !hideClose) && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'20px 24px 16px', borderBottom:'1px solid #f3f4f6', flexShrink:0 }}>
              {title && <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22,
                fontWeight:700, color:'#111827', margin:0 }}>{title}</h2>}
              {!hideClose && (
                <button className="gymflow-modal-close" onClick={onClose}
                  style={{ width:34, height:34, borderRadius:8, border:'none',
                    background:'transparent', color:'#9ca3af', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    marginLeft:'auto', transition:'background 0.18s' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          )}
          <div style={{ padding:24, overflowY:'auto', flex:1,
            color:'#374151', fontSize:15, lineHeight:1.6 }}>{children}</div>
          {footer && (
            <div style={{ padding:'16px 24px 20px', borderTop:'1px solid #f3f4f6',
              display:'flex', justifyContent:'flex-end', gap:10, flexShrink:0 }}>{footer}</div>
          )}
        </div>
      </div>
    </>
  );
}