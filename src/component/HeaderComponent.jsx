import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Bell, Search } from 'lucide-react';

const BREADCRUMB_MAP = {
  '/':              [{ label: 'Employees' }],
  '/employees':     [{ label: 'Employees' }],
  '/add-employee':  [{ label: 'Employees', path: '/employees' }, { label: 'Add Employee' }],
};

const getEditBreadcrumb = () => [
  { label: 'Employees', path: '/employees' },
  { label: 'Edit Employee' }
];

const HeaderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const crumbs = location.pathname.startsWith('/edit-employee')
    ? getEditBreadcrumb()
    : (BREADCRUMB_MAP[location.pathname] || [{ label: 'Page' }]);

  return (
    <header className="ems-topbar" role="banner">
      {/* Breadcrumb */}
      <nav className="topbar-breadcrumb" aria-label="Breadcrumb">
        {crumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <ChevronRight size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
            {crumb.path ? (
              <button
                onClick={() => navigate(crumb.path)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font)', padding: 0,
                  transition: 'color var(--t-fast)'
                }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {crumb.label}
              </button>
            ) : (
              <span className="topbar-breadcrumb-current">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Actions */}
      <div className="topbar-actions">
        <button className="topbar-icon-btn" id="topbar-search-btn" aria-label="Search" title="Search">
          <Search size={16} />
        </button>
        <button className="topbar-icon-btn" id="topbar-notif-btn" aria-label="Notifications" title="Notifications">
          <Bell size={16} />
        </button>
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, var(--brand-dark), var(--accent-dark))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-bold)', color: 'white',
          cursor: 'pointer', flexShrink: 0
        }}
          id="topbar-avatar"
          title="Admin"
        >
          AD
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
