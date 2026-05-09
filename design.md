# 🎨 EMS Frontend — Modern UI/UX Design Specification

> **Mục tiêu**: Nâng cấp giao diện từ Bootstrap mặc định lên một design system hiện đại, premium, tối ưu UX cho ứng dụng quản lý nhân viên.

---

## 📊 Phân Tích Hiện Trạng (Trước Khi Redesign)

| Khu vực | Vấn đề cũ | Giải pháp mới |
|---|---|---|
| **Header** | `navbar-dark bg-dark` Bootstrap, link trỏ sang Google | Sidebar cố định với glassmorphism |
| **Danh sách nhân viên** | Table Bootstrap đơn giản, không có search/filter | Stats cards + modern data table |
| **Form thêm/sửa** | Card Bootstrap thô, validation xấu | Form 2 cột với focus ring đẹp |
| **Typography** | System font mặc định | Inter font từ Google Fonts |
| **Màu sắc** | Bootstrap default (blue, danger, info) | Indigo + Cyan curated palette |
| **Layout** | Container cứng, không sidebar | Sidebar + main content area |
| **Animation** | Không có transition nào | Micro-animations toàn diện |
| **Feedback** | `console.log` sau mỗi action | Toast notification system |
| **Delete UX** | Xóa ngay lập tức | Confirm modal |
| **Empty state** | Không có UI | Illustrated empty state |

---

## 🎨 Design System

### 1. Color Palette — Indigo + Cyan

```css
/* DARK MODE (mặc định) */
--color-bg-base:      #0d0d1a;   /* Nền toàn trang */
--color-bg-sidebar:   #111127;   /* Sidebar */
--color-bg-card:      #16162a;   /* Card / panel */
--color-bg-input:     #1e1e36;   /* Input background */
--color-bg-hover:     rgba(99, 102, 241, 0.08);

--color-brand:        #6366f1;   /* Indigo-500 */
--color-brand-light:  #818cf8;   /* Indigo-400 */
--color-brand-dark:   #4f46e5;   /* Indigo-600 */
--color-accent:       #22d3ee;   /* Cyan-400 */

--color-success:      #34d399;   /* Emerald-400 */
--color-warning:      #fbbf24;   /* Amber-400 */
--color-danger:       #f87171;   /* Red-400 */
--color-danger-dark:  #ef4444;   /* Red-500 */

--color-text-primary:   #e0e7ff; /* Indigo-100 */
--color-text-secondary: #a5b4fc; /* Indigo-300 */
--color-text-muted:     #6b7280; /* Gray-500 */

--color-border:       rgba(99, 102, 241, 0.2);
--color-border-focus: rgba(99, 102, 241, 0.8);
```

### 2. Typography — Inter

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

font-family: 'Inter', system-ui, sans-serif;

/* Scale */
--text-xs:   0.75rem;    /* 12px */
--text-sm:   0.875rem;   /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg:   1.125rem;   /* 18px */
--text-xl:   1.25rem;    /* 20px */
--text-2xl:  1.5rem;     /* 24px */
--text-3xl:  1.875rem;   /* 30px */
```

### 3. Shadows & Effects

```css
--shadow-sm:    0 1px 3px rgba(0,0,0,0.3);
--shadow-md:    0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1);
--shadow-lg:    0 10px 40px rgba(0,0,0,0.5);
--shadow-brand: 0 0 24px rgba(99,102,241,0.4);
--shadow-glow:  0 0 40px rgba(99,102,241,0.25);

/* Glassmorphism */
--glass-bg:     rgba(17,17,39,0.7);
--glass-border: rgba(99,102,241,0.15);
backdrop-filter: blur(16px);
```

### 4. Animations

```css
--transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base:   250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-spring: 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## 🏗️ Layout Architecture

```
┌────────────────────────────────────────────────────────────────┐
│  SIDEBAR (260px fixed)    │  MAIN CONTENT (flex-grow)          │
│  ┌──────────────────────┐ │  ┌──────────────────────────────┐  │
│  │  ⬡ EMS    [← ≡]     │ │  │  TOP BAR                     │  │
│  ├──────────────────────┤ │  │  Breadcrumb | Search | Avatar │  │
│  │  NAVIGATION          │ │  ├──────────────────────────────┤  │
│  │  🏠 Dashboard        │ │  │                              │  │
│  │  👥 Employees  ←●    │ │  │  PAGE CONTENT                │  │
│  │  🏢 Departments      │ │  │                              │  │
│  │  📊 Reports          │ │  │                              │  │
│  │  ⚙️  Settings        │ │  └──────────────────────────────┘  │
│  ├──────────────────────┤ │                                    │
│  │  👤 Admin User       │ │                                    │
│  └──────────────────────┘ │                                    │
└────────────────────────────────────────────────────────────────┘
```

---

## 📱 Thiết Kế Từng Màn Hình

### Màn 1: Sidebar

- **Glassmorphism**: `backdrop-filter: blur(16px)` + semi-transparent bg
- **Logo**: Icon SVG gradient Indigo→Cyan + text
- **Nav item active**: Left border 3px brand + bg highlight
- **Nav item hover**: `translateX(4px)` smooth transition
- **User profile**: Avatar với initials + gradient + name/role ở dưới cùng

### Màn 2: Employee List

```
┌─────────────────────────────────────────────────────┐
│  Employees                          [+ Add Employee]│
│  Manage your team members                           │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ 👥 Total    │  │ ✅ Active   │  │ 🆕 This Mo  │ │  ← Stats cards
│  │    125      │  │     98      │  │     12      │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────────┤
│  🔍 [Search employees...]        [Filter] [Export]  │
├─────────────────────────────────────────────────────┤
│  #   NAME              EMAIL           ACTIONS      │
│  ─────────────────────────────────────────────────  │
│  1   [JD] John Doe    john@co.com      ✏️  🗑️      │
│  2   [JL] Jane Lee    jane@co.com      ✏️  🗑️      │
│  ─────────────────────────────────────────────────  │
│  Showing 1-10 of 125        [< 1 2 3 ... >]        │
└─────────────────────────────────────────────────────┘
```

**Key design choices:**
- Avatar với initials + gradient background ngẫu nhiên theo tên
- Action buttons chỉ hiện khi hover row
- Table rows fade-in với stagger (delay 50ms mỗi row)
- Delete button mở confirm modal thay vì xóa ngay

### Màn 3: Add/Edit Employee Form

```
┌───────────────────────────────────────────────┐
│  ← Back                                       │
│  ┌─────────────────────────────────────────┐  │
│  │  ✨ Add New Employee                    │  │
│  ├─────────────────────────────────────────┤  │
│  │  PERSONAL INFORMATION                   │  │
│  │  ┌─────────────────┐ ┌───────────────┐ │  │
│  │  │ First Name *    │ │ Last Name *   │ │  │
│  │  │ [John         ] │ │ [Doe        ] │ │  │
│  │  └─────────────────┘ └───────────────┘ │  │
│  │  CONTACT INFORMATION                    │  │
│  │  ┌───────────────────────────────────┐ │  │
│  │  │ Email *                           │ │  │
│  │  │ [john.doe@company.com           ] │ │  │
│  │  └───────────────────────────────────┘ │  │
│  │          [Cancel]  [Save Employee →]   │  │
│  └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

### Màn 4: Delete Confirmation Modal

```
  ╔══════════════════════════════════════╗
  ║  🚨 Confirm Delete                  ║
  ║                                     ║
  ║  Are you sure you want to delete    ║
  ║  John Doe? This cannot be undone.   ║
  ║                                     ║
  ║           [Cancel]  [Delete]        ║
  ╚══════════════════════════════════════╝
```

### Màn 5: Toast Notifications

```
                     ┌──────────────────────────────┐
                     │  ✅  Employee added!          │  ← Top-right, 3s
                     └──────────────────────────────┘
                     ┌──────────────────────────────┐
                     │  🗑️  Deleted successfully     │
                     └──────────────────────────────┘
```

---

## ✨ Micro-Animations Checklist

| Element | Animation |
|---|---|
| Page load | `fadeSlideIn` — fade + translateY(-12px) |
| Table rows | Stagger: row n có delay `n × 50ms` |
| Sidebar nav hover | `translateX(4px)` + bg highlight |
| Button hover | `translateY(-2px)` + shadow glow |
| Button click | `scale(0.97)` active state |
| Card hover | `translateY(-3px)` + shadow tăng |
| Form input focus | Border color + glow ring |
| Modal open | `scale(0.95)→1` + fade backdrop |
| Toast | Slide-in từ phải + fade out |
| Stats counter | Count-up animation |

---

## 🗂️ File Structure Sau Redesign

```
src/
├── index.css                    ← Design tokens + global styles (viết lại)
├── App.css                      ← Layout wrapper styles (viết lại)
├── App.jsx                      ← Bọc bởi Layout (cập nhật)
├── main.jsx                     ← Không đổi
└── component/
    ├── Layout.jsx               ← MỚI: Sidebar + main area wrapper
    ├── HeaderComponent.jsx      ← Viết lại: Top bar với breadcrumb
    ├── SidebarComponent.jsx     ← MỚI: Navigation sidebar
    ├── ListEmployeeComponent.jsx← Viết lại: Stats + modern table
    ├── EmployeeComponent.jsx    ← Viết lại: Form 2 cột đẹp
    ├── DeleteModal.jsx          ← MỚI: Confirm dialog
    ├── ToastNotification.jsx    ← MỚI: Toast system
    └── FooterComponent.jsx      ← Viết lại: Footer tích hợp sidebar layout
```

---

## 📦 Dependencies

```bash
npm install lucide-react   # Icon library (đã cài)
```

> Bootstrap vẫn được import nhưng bị override hoàn toàn bởi custom CSS.
> Sau này có thể bỏ Bootstrap để giảm bundle size.

---

*Tài liệu này được tạo song song với quá trình implement thực tế.*
*Last updated: 2026-05-09*
