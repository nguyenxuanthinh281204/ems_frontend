import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Users, LayoutDashboard, Building2, BarChart3, Settings, Zap
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard',   icon: LayoutDashboard, path: '/',            disabled: true  },
  { id: 'employees',   label: 'Employees',   icon: Users,           path: '/employees',   disabled: false },
  { id: 'departments', label: 'Departments', icon: Building2,       path: '/departments', disabled: true  },
  { id: 'reports',     label: 'Reports',     icon: BarChart3,       path: '/reports',     disabled: true  },
  { id: 'settings',    label: 'Settings',    icon: Settings,        path: '/settings',    disabled: true  },
];

const SidebarComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/employees') return location.pathname === '/' || location.pathname.startsWith('/employees') || location.pathname.startsWith('/add-employee') || location.pathname.startsWith('/edit-employee');
    return location.pathname === path;
  };

  return (
    <aside className="ems-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Zap size={18} />
        </div>
        <div>
          <div className="sidebar-logo-text">EMS</div>
          <div className="sidebar-logo-sub">Management System</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="Main navigation">
        <div className="nav-section-label">Main Menu</div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-item ${active ? 'active' : ''}`}
              onClick={() => !item.disabled && navigate(item.path)}
              style={item.disabled && !active ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
              aria-current={active ? 'page' : undefined}
              title={item.disabled ? 'Coming soon' : item.label}
            >
              <Icon size={17} className="nav-item-icon" />
              {item.label}
              {item.disabled && !active && (
                <span style={{
                  marginLeft: 'auto', fontSize: '10px',
                  color: 'var(--text-muted)', background: 'var(--bg-hover)',
                  padding: '1px 6px', borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.05em'
                }}>Soon</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="sidebar-user">
        <div className="user-avatar">AD</div>
        <div>
          <div className="user-name">Admin</div>
          <div className="user-role">System Admin</div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarComponent;
