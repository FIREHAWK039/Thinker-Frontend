import React from "react";
import {
  Plus,
  Folder,
  Image,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  User,
} from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <aside
      className={`h-screen bg-[#171717] text-white flex flex-col border-r border-gray-800 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        {!collapsed && (
          <div className="text-xl font-bold px-2">
            MentorMind
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-800"
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      {/* New Chat */}
      <div className="px-3 mt-4">
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg
          bg-white text-black hover:bg-gray-200 transition
          ${collapsed ? "justify-center" : ""}`}
        >
          <Plus size={20} />

          {!collapsed && (
            <span className="font-medium">
              New Chat
            </span>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 space-y-2">

        {/* Projects */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg
          hover:bg-gray-800 transition
          ${collapsed ? "justify-center" : ""}`}
        >
          <Folder size={20} />

          {!collapsed && (
            <span>Projects</span>
          )}
        </button>

        {/* Images */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg
          hover:bg-gray-800 transition
          ${collapsed ? "justify-center" : ""}`}
        >
          <Image size={20} />

          {!collapsed && (
            <span>Images</span>
          )}
        </button>

        {/* Chats */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg
          hover:bg-gray-800 transition
          ${collapsed ? "justify-center" : ""}`}
        >
          <MessageSquare size={20} />

          {!collapsed && (
            <span>Chats</span>
          )}
        </button>
      </nav>

      {/* Recent Chats */}
      {!collapsed && (
        <div className="mt-8 px-4 flex-1 overflow-y-auto">
          <p className="text-xs text-gray-500 uppercase mb-3">
            Recent
          </p>

          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-sm truncate">
              Two Sum Problem
            </button>

            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-sm truncate">
              Binary Search
            </button>

            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-sm truncate">
              Linked List Practice
            </button>
          </div>
        </div>
      )}

      {/* Bottom */}
      <div className="border-t border-gray-800 p-3 space-y-1">

        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg
          hover:bg-gray-800
          ${collapsed ? "justify-center" : ""}`}
        >
          <Settings size={20} />

          {!collapsed && <span>Settings</span>}
        </button>

        <button
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg
          hover:bg-gray-800
          ${collapsed ? "justify-center" : ""}`}
        >
          <User size={20} />

          {!collapsed && (
            <div className="text-left">
              <p className="text-sm font-medium">
                Student
              </p>
              <p className="text-xs text-gray-500">
                View Profile
              </p>
            </div>
          )}
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;