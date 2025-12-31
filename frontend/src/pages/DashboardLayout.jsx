import React, { useState } from "react";
import { Home, Users, Settings, BarChart2, Menu, X } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } hidden md:flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b border-slate-800">
          <span className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>
            MyApp
          </span>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-800 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            icon={<Home size={20} />}
            label="Overview"
            isOpen={isSidebarOpen}
            active
          />
          <NavItem
            icon={<Users size={20} />}
            label="Customers"
            isOpen={isSidebarOpen}
          />
          <NavItem
            icon={<BarChart2 size={20} />}
            label="Analytics"
            isOpen={isSidebarOpen}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            isOpen={isSidebarOpen}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center px-6 justify-between">
          <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {children ? (
            children
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Example Stats Cards */}
              <StatCard title="Total Users" value="1,234" color="bg-blue-500" />
              <StatCard title="Revenue" value="$12,345" color="bg-green-500" />
              <StatCard
                title="Active Sessions"
                value="432"
                color="bg-purple-500"
              />

              {/* Big Content Placeholder */}
              <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-3 h-64 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                Main Content Area (Charts/Tables go here)
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Simple Helper Components
const NavItem = ({ icon, label, isOpen, active }) => (
  <div
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
      active
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    <div>{icon}</div>
    {isOpen && <span className="ml-3 whitespace-nowrap">{label}</span>}
  </div>
);

const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full mr-3 ${color}`}></div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    </div>
    <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default DashboardLayout;
