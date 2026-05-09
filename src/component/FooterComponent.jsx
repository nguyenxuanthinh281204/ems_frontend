import React from 'react';

const FooterComponent = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: 'var(--sp-4) var(--sp-8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-xs)',
    }}>
      <span>© 2026 NguyenXuanThinh28122004 — All rights reserved</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--success)', display: 'inline-block'
        }} />
        All systems operational
      </span>
    </footer>
  );
};

export default FooterComponent;