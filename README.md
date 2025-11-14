# Audit Checklist Tool — README.md

> **Audit Checklist Tool**
> A fully client-side, extensible audit/checklist web app built with React + TypeScript. Runs directly from `index.html` (no backend, no build step). Pre-loaded with a detailed ISO/IEC 27001:2022 checklist and a full Admin Mode for customizing frameworks, categories, subsections and questions. All data persists in the browser (localStorage).

---

# 1. Introduction

The **Audit Checklist Tool** is a lightweight, single-file web application designed to streamline security and compliance audits. It runs entirely in the browser using modern ES modules and an importmap — there is no server or build process required.

Key goals:

* Provide an interactive checklist UI for multiple audit frameworks (ISO/IEC 27001:2022 included).
* Persist user responses and admin customizations to `localStorage`.
* Enable exporting audit data (JSON, PDF, Excel).
* Offer a secure Admin Mode to create and manage frameworks and questions.

---

# 2. Key Features

* **Multi-Framework Architecture**

  * Switch between frameworks (ISO/IEC 27001:2022 pre-loaded). Placeholders for SOC 2, PCI DSS v4.0, etc.

* **Interactive Checklist**

  * Status per control: *To do*, *In Progress*, *Done*.
  * Result per control: *Compliant*, *Partially Compliant*, *Non-Compliant*, *Not Applicable*, *Not assessed*.
  * Add notes and evidence links for each item.
  * Expandable question details with "Meaning" and "What to Show / Evidence" guidance.

* **Dynamic Progress Tracking**

  * Overall progress bar for each framework.
  * Radar chart (Chart.js) to compare category progress.
  * Per-category and per-subcategory progress cards.

* **Data Persistence**

  * All responses and admin edits saved to `localStorage` keys.

* **Data Export**

  * **JSON** export of framework responses.
  * **PDF** summary report (jsPDF).
  * **Excel (.xlsx)** export (SheetJS / xlsx).

* **Full Admin Panel**

  * Secure access via URL query `?admin`.
  * Login page with credentials (see *Admin Mode*).
  * Create, edit, delete frameworks, categories, subsections, and questions.
  * Custom color & icon per category.

---

# 3. Technology Stack

* **Frontend:** React 19, TypeScript
* **Styling:** Tailwind CSS (CDN)
* **Charts:** Chart.js (radar chart)
* **PDF generation:** jsPDF
* **Excel export:** SheetJS (xlsx)
* **Architecture:** Single-page, client-side ES module app (no bundler required)

---

# 4. File Structure

```
code/
├── index.html                  # Main HTML entry point, loads libraries and scripts.
├── index.tsx                   # Mounts the main React <App /> component.
├── metadata.json               # Application metadata (title, version, seed info).
├── App.tsx                     # Core application component; manages state, views, routing.
├── types.ts                    # TypeScript type definitions.
├── constants.ts                # Initial seed data (ISO checklist + placeholders).
├── AdminLogin.tsx              # Admin login screen (access when ?admin is present).
├── Modal.tsx                   # Generic modal component.
├── FrameworkModal.tsx          # Create/edit framework modal.
│
└── components/
    ├── DashboardComponents.tsx # ProgressCard, RadarChart, etc.
    ├── icons.tsx               # SVG icon library used across the UI.
    ├── ProgressBar.tsx         # Main progress bar component.
    ├── QuestionAccordion.tsx   # Single question component (expand/collapse + edit).
    ├── Section.tsx             # Lists subsections in a category.
    ├── SectionCard.tsx         # Category card used on dashboard.
    ├── SectionModal.tsx        # Create/edit category modal.
    ├── SubSectionDetailView.tsx# View that shows checklist for a subsection.
    ├── SubSectionModal.tsx     # Create/edit subsection modal.
    └── SummaryModal.tsx        # Audit summary modal and export controls.
```

---

# 5. How to Use

### Running the Application

1. Download the `code/` folder or clone the repository.
2. Open `index.html` in a modern browser (Chrome, Firefox, Edge). No server required.

> Note: local file restrictions in some browsers may block ES module imports when opened via `file://`. If that happens, run a quick static server (e.g., `python -m http.server`) and open `http://localhost:8000`.

### Standard User Mode

1. **Select Framework**: From the home screen choose a framework (e.g., *ISO/IEC 27001:2022*).
2. **Dashboard**: View overall progress, category cards, and export options.
3. **Navigate**:

   * Click a Category Card to open its subsections.
   * Click a Subsection to view its checklist (questions).
4. **Answer Questions**:

   * Click a question row to expand full details.
   * Update *Status* and *Result* via dropdowns.
   * Add *Observations & Notes* and *Evidence* links or attachments (links).
   * Changes are **saved automatically** to `localStorage`.
5. **Export Data**:

   * Use JSON, Excel, or PDF buttons on the dashboard or summary modal.
   * Use *Reset* to clear responses for the selected framework.

### Admin Mode (Content Management)

1. **Access Admin Login**: Append `?admin` to the application URL (e.g., `file:///path/index.html?admin`).
2. **Login Credentials**:

   * **Username:** `dqadm`
   * **Password:** `admin`
3. **Admin Capabilities**:

   * **Frameworks (Home):** Add/Edit/Delete frameworks.
   * **Categories (Dashboard):** Add/Edit/Delete categories (color, icon).
   * **Subsections:** Add/Edit/Delete subsections per category.
   * **Questions:** Add/Edit/Delete questions with control text, priority, meaning, evidence guidance.
4. **Logout**: Click *Logout* in the header. Admin session state stored in `sessionStorage` (isAdmin flag).

---

# 6. Data Management (localStorage keys)

* `iso27001-checklist-responses`

  * Stores the user's audit responses for the ISO framework (organized by subsection ID). Format: JSON object keyed by subsection ID.

* `audit-frameworks`

  * Stores the full frameworks data structure when admin has made changes (frameworks → categories → subsections → questions).

* `sessionStorage`

  * Stores temporary session flags such as `isAdmin` while admin is logged in.

> All data is local to the browser. There is **no remote storage** by default. Advise users to back up frameworks and responses via the JSON export.

---

# 7. UI & UX Notes

* **Progress visualization**

  * Per-category cards show a percentage, quick counts (compliant / non-compliant / not assessed).
  * Radar chart uses Chart.js to provide visual distribution of progress across categories.

* **Question layout**

  * Each question has:

    * `Control Text` (the question/control itself)
    * `Priority` (e.g., High/Medium/Low)
    * `Meaning` (explanation of intent)
    * `What to Show / Evidence` (practical evidence examples)
    * `Status` and `Result` selectors
    * `Observations & Notes` text area
    * `Evidence` text/links area

* **Accessibility**

  * Keyboard accessible components, focus states, and readable contrast for the color-coded category cards.

---

# 8. Export Formats — Implementation Notes

* **JSON Export**

  * Exports a structured object containing framework metadata, categories, subsections, questions, and user responses (timestamps optional).

* **PDF Export**

  * Summary-style PDF via `jsPDF` with:

    * Framework title, date, overall progress
    * Per-category summary (progress, counts)
    * Optionally include top non-compliant items with notes.

* **Excel (XLSX) Export**

  * Uses SheetJS to produce a workbook:

    * One sheet per framework (or one sheet per category if desired)
    * Columns: Category, Subsection, Question ID, Control Text, Priority, Status, Result, Notes, Evidence, LastModified

---

# 9. Admin Data Model (brief)

```ts
type Framework = {
  id: string;
  title: string;
  description?: string;
  color?: string;
  icon?: string;
  categories: Category[];
};

type Category = {
  id: string;
  title: string;
  color?: string;
  icon?: string;
  subsections: Subsection[];
};

type Subsection = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

type Question = {
  id: string;
  control: string;
  priority?: 'High' | 'Medium' | 'Low';
  meaning?: string;
  evidenceGuidance?: string;
};
```

User responses can be stored as:

```ts
type Response = {
  questionId: string;
  status: 'To do'|'In Progress'|'Done';
  result: 'Compliant'|'Partially Compliant'|'Non-Compliant'|'Not Applicable'|'Not assessed';
  notes?: string;
  evidence?: string;
  lastModified?: string;
};
```

---

# 10. Security Considerations

* Admin credentials are simple (for local use). If you deploy this app in any shared environment, replace the simple admin auth with a stronger method (or remove admin mode).
* All data is stored in the browser. Sensitive evidence should not be stored in plaintext links if the machine is shared.
* Consider optional encryption or download-only export for high-sensitivity environments.

---

# 11. Suggested Enhancements (future)

* Optional remote sync (encrypted) to back up progress.
* Role-based access control (RBAC) if used across teams.
* Attach real files (with safe sandboxing) rather than links.
* More export templates (detailed findings, remediation plans).
* Import/Export frameworks (shareable JSON templates).
* Multi-user collaboration (requires backend and auth).

---

# 12. Troubleshooting

* If the app does not load when opened via `file://`:

  * Run a tiny static server: `python -m http.server` (or `npx http-server`) and open `http://localhost:8000`.
* Clearing app state:

  * Delete the `audit-frameworks` and `iso27001-checklist-responses` keys from browser `localStorage` to reset frameworks and responses.
* Admin mode not appearing:

  * Make sure to append `?admin` to the URL and reload the page.

---

# 13. Licensing & Attribution

This project uses open-source libraries (React, Chart.js, jsPDF, SheetJS). Follow each library's license. The project source and seed data may be redistributed under the license you choose for your repo (e.g., MIT).

---

# 14. Contact / Maintainer

You can adapt and extend this project for your organization. If you want, paste this Markdown into a `README.md` file inside your project root to accompany the code.

---

*End of Audit Checklist Tool README*

If you want, I can:

* produce a ready-to-drop `index.html` + minimal `index.tsx` + `constants.ts` seed file (single-file distribution) as example code; or
* convert this README into a nicely formatted PDF or DOCX for sharing.
