import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, Pencil, User, Mail, AlertCircle } from 'lucide-react';

const EmployeeComponent = ({ addToast }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const validate = () => {
    const errs = { firstName: '', lastName: '', email: '' };
    let valid = true;
    if (!firstName.trim()) { errs.firstName = 'First name is required'; valid = false; }
    if (!lastName.trim())  { errs.lastName  = 'Last name is required';  valid = false; }
    if (!email.trim())     { errs.email     = 'Email is required';      valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email'; valid = false;
    }
    setErrors(errs);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const payload = { firstName, lastName, email };
    try {
      if (isEdit) {
        await updateEmployee(id, payload);
        addToast?.(`${firstName} ${lastName} updated successfully.`, 'success');
      } else {
        await createEmployee(payload);
        addToast?.(`${firstName} ${lastName} added successfully.`, 'success');
      }
      navigate('/employees');
    } catch (err) {
      console.error(err);
      addToast?.('Something went wrong. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ems-content">
      {/* Back button */}
      <button
        className="btn btn-ghost"
        onClick={() => navigate('/employees')}
        style={{ marginBottom: 'var(--sp-6)', alignSelf: 'flex-start' }}
        id="back-btn"
      >
        <ArrowLeft size={15} />
        Back to Employees
      </button>

      {/* Form Card */}
      <div className="form-card fade-slide-in">
        {/* Card Header */}
        <div className="form-card-header">
          <div className="form-card-title">
            {isEdit
              ? <><Pencil size={22} color="var(--brand-light)" /> Edit Employee</>
              : <><Sparkles size={22} color="var(--brand-light)" /> Add New Employee</>
            }
          </div>
          <p style={{
            fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
            marginTop: 'var(--sp-2)'
          }}>
            {isEdit
              ? 'Update the information below.'
              : 'Fill in the details to add a new team member.'}
          </p>
        </div>

        {/* Card Body */}
        <form className="form-card-body" onSubmit={handleSubmit} noValidate>
          {/* Personal Information */}
          <div className="form-section-label">Personal Information</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                <User size={13} />
                First Name
                <span className="required-dot" title="Required" />
              </label>
              <input
                id="firstName"
                className={`form-input${errors.firstName ? ' invalid' : ''}`}
                type="text"
                placeholder="e.g. John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <span className="error-msg">
                  <AlertCircle size={12} />
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lastName">
                <User size={13} />
                Last Name
                <span className="required-dot" title="Required" />
              </label>
              <input
                id="lastName"
                className={`form-input${errors.lastName ? ' invalid' : ''}`}
                type="text"
                placeholder="e.g. Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <span className="error-msg">
                  <AlertCircle size={12} />
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section-label">Contact Information</div>
          <div className="form-row">
            <div className="form-group full">
              <label className="form-label" htmlFor="email">
                <Mail size={13} />
                Email Address
                <span className="required-dot" title="Required" />
              </label>
              <input
                id="email"
                className={`form-input${errors.email ? ' invalid' : ''}`}
                type="email"
                placeholder="e.g. john.doe@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-msg">
                  <AlertCircle size={12} />
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate('/employees')}
              id="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              id="submit-btn"
              style={saving ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
            >
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeComponent;