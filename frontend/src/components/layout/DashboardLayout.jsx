import { useState } from "react";
import FilterSidebar from "../filters/FilterSidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-brand-900 text-white h-14 flex items-center px-4 shadow-lg">
        <button
          onClick={() => setSidebarOpen((o) => !o)}
          className="mr-3 p-1 rounded hover:bg-brand-700 transition-colors md:hidden"
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-lg font-bold tracking-wide">5G City</span>
        <span className="ml-2 text-brand-100 text-sm font-medium">Smart Coverage Dashboard</span>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-72
          bg-white shadow-lg flex-shrink-0 overflow-y-auto
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <FilterSidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 mt-14 overflow-hidden flex flex-col">
        {children}
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
