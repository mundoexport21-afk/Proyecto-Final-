import React from 'react';
import { LayoutDashboard, BrainCircuit, Award, Settings, LogOut, Box } from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'predict', label: 'Predicción ML', icon: BrainCircuit },
    { id: 'logistics', label: 'Logística', icon: Box },
    { id: 'achievements', label: 'Logros', icon: Award },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-surface h-screen fixed left-0 top-0 border-r border-slate-700 z-40">
      <div className="p-6 border-b border-slate-700 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
          <BrainCircuit className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          ExportAI
        </span>
      </div>

      <div className="flex-1 py-6 px-3 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(79,70,229,0.15)] border border-primary/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary' : 'text-slate-500 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]"></div>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700/50">
          <p className="text-xs text-slate-400 mb-2">Plan Pro</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mb-2">
            <div className="bg-secondary h-1.5 rounded-full w-[75%]"></div>
          </div>
          <p className="text-[10px] text-slate-500">750/1000 Queries</p>
        </div>
        <button className="mt-4 w-full flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm px-2">
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;