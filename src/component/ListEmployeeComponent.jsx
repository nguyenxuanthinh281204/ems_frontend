import React, { useEffect, useState, useCallback } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Users, UserCheck, UserPlus, Pencil, Trash2 } from 'lucide-react';
import DeleteModal from './DeleteModal';

/* Generate a gradient color from employee name initials */
const AVATAR_GRADIENTS = [
  ['#4f46e5', '#7c3aed'], ['#0891b2', '#0e7490'], ['#059669', '#047857'],
  ['#d97706', '#b45309'], ['#dc2626', '#b91c1c'], ['#7c3aed', '#6d28d9'],
  ['#0284c7', '#0369a1'], ['#db2777', '#be185d'],
];
const avatarGradient = (name = '') => {
  const i = (name.charCodeAt(0) || 0) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[i];
};
const initials = (first = '', last = '') =>
  `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

const ListEmployeeComponent = ({ addToast }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }
  const navigate = useNavigate();

  const getAllEmployees = useCallback(() => {
    listEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => { getAllEmployees(); }, [getAllEmployees]);

  const filtered = employees.filter((emp) => {
    const q = search.toLowerCase();
    return (
      emp.firstName?.toLowerCase().includes(q) ||
      emp.lastName?.toLowerCase().includes(q) ||
      emp.email?.toLowerCase().includes(q)
    );
  });

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteEmployee(deleteTarget.id)
      .then(() => {
        getAllEmployees();
        addToast?.(`${deleteTarget.name} has been deleted.`, 'success');
        setDeleteTarget(null);
      })
      .catch((err) => {
        console.error(err);
        addToast?.('Failed to delete employee.', 'error');
        setDeleteTarget(null);
      });
  };

  return (
    <div className="ems-content fade-slide-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button
          id="add-employee-btn"
          className="btn btn-primary"
          onClick={() => navigate('/add-employee')}
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon indigo">
            <Users size={22} color="white" />
          </div>
          <div>
            <div className="stat-value">{employees.length}</div>
            <div className="stat-label">Total Employees</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cyan">
            <UserCheck size={22} color="white" />
          </div>
          <div>
            <div className="stat-value">{employees.length}</div>
            <div className="stat-label">Active</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon emerald">
            <UserPlus size={22} color="white" />
          </div>
          <div>
            <div className="stat-value">
              {employees.filter((_, i) => i < 3).length}
            </div>
            <div className="stat-label">Added Recently</div>
          </div>
        </div>
      </div>

      {/* Table Panel */}
      <div className="table-panel">
        {/* Toolbar */}
        <div className="table-toolbar">
          <div className="search-wrap">
            <Search size={15} className="search-icon" />
            <input
              id="employee-search"
              className="search-input"
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span style={{
            fontSize: 'var(--text-xs)', color: 'var(--text-muted)',
            whiteSpace: 'nowrap'
          }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Users size={28} color="var(--text-muted)" />
            </div>
            <div className="empty-title">
              {search ? 'No results found' : 'No employees yet'}
            </div>
            <p className="empty-desc">
              {search
                ? `No employees match "${search}". Try a different search.`
                : 'Get started by adding your first team member.'}
            </p>
            {!search && (
              <button
                className="btn btn-primary"
                onClick={() => navigate('/add-employee')}
                style={{ marginTop: '8px' }}
              >
                <Plus size={15} /> Add Employee
              </button>
            )}
          </div>
        ) : (
          <table className="data-table" id="employees-table">
            <thead>
              <tr>
                <th style={{ width: 48 }}>#</th>
                <th>Employee</th>
                <th>Email</th>
                <th style={{ width: 100, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, idx) => {
                const [g1, g2] = avatarGradient(emp.firstName);
                const ini = initials(emp.firstName, emp.lastName);
                return (
                  <tr key={emp.id}>
                    <td style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                      {idx + 1}
                    </td>
                    <td>
                      <div className="emp-cell">
                        <div
                          className="emp-avatar"
                          style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
                        >
                          {ini}
                        </div>
                        <div>
                          <div className="emp-name">
                            {emp.firstName} {emp.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="emp-email">{emp.email}</td>
                    <td>
                      <div className="row-actions" style={{ justifyContent: 'center' }}>
                        <button
                          id={`edit-btn-${emp.id}`}
                          className="action-btn edit"
                          onClick={() => navigate(`/edit-employee/${emp.id}`)}
                          title="Edit"
                          aria-label={`Edit ${emp.firstName}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          id={`delete-btn-${emp.id}`}
                          className="action-btn delete"
                          onClick={() => setDeleteTarget({
                            id: emp.id,
                            name: `${emp.firstName} ${emp.lastName}`
                          })}
                          title="Delete"
                          aria-label={`Delete ${emp.firstName}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        employeeName={deleteTarget?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default ListEmployeeComponent;
