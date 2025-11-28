import React, { useEffect, useState } from 'react';
import { X, Play, RotateCcw } from 'lucide-react';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0); // 0: Idle, 1: Truck, 2: Crane, 3: Ship
  
  useEffect(() => {
    if (isOpen) {
        setStep(0);
    }
  }, [isOpen]);

  const startSimulation = () => {
    setStep(1);
    setTimeout(() => setStep(2), 2000); // Truck arrives
    setTimeout(() => setStep(3), 4500); // Crane lifts
    setTimeout(() => setStep(4), 7000); // Ship departs
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-surface border border-slate-700 w-full max-w-4xl rounded-2xl p-6 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Simulación de Logística de Exportación</h2>
        <p className="text-slate-400 mb-6">Visualización en tiempo real del proceso de carga y despacho basado en sus datos.</p>

        <div className="bg-slate-900 rounded-xl overflow-hidden h-80 relative flex items-end justify-center border border-slate-800">
           {/* Sky */}
           <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
           
           {/* Moon */}
           <div className="absolute top-10 right-20 w-12 h-12 bg-yellow-100 rounded-full blur-md opacity-80"></div>

           {/* Ship */}
           <div className={`absolute bottom-10 right-10 transition-all duration-[3000ms] ease-in-out ${step === 4 ? 'translate-x-96 opacity-0' : 'translate-x-0'}`}>
             <svg width="200" height="120" viewBox="0 0 200 120">
                <path d="M10,60 L190,60 L170,110 L30,110 Z" fill="#475569" stroke="#94a3b8" strokeWidth="2"/>
                <rect x="50" y="30" width="30" height="30" fill="#334155" />
                <rect x="90" y="30" width="30" height="30" fill="#334155" />
                <line x1="100" y1="0" x2="100" y2="30" stroke="#94a3b8" strokeWidth="4" />
             </svg>
           </div>

           {/* Crane */}
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
              <svg width="100" height="200" viewBox="0 0 100 200">
                 <line x1="50" y1="200" x2="50" y2="20" stroke="#fbbf24" strokeWidth="6" />
                 <line x1="50" y1="20" x2="120" y2="20" stroke="#fbbf24" strokeWidth="6" />
                 {/* Rope */}
                 <line x1="90" y1="20" x2="90" y2={step === 2 ? "120" : step === 3 ? "80" : "20"} stroke="#9ca3af" strokeWidth="2" className="transition-all duration-1000" />
              </svg>
           </div>

           {/* Truck */}
           <div className={`absolute bottom-10 z-20 transition-all duration-[2000ms] ease-out ${step === 0 ? '-translate-x-60' : step >= 1 ? 'left-1/3' : ''} ${step === 4 ? '-translate-x-96' : ''}`}>
              <svg width="120" height="60" viewBox="0 0 120 60">
                 <rect x="0" y="20" width="80" height="30" fill="#2563eb" />
                 <circle cx="20" cy="50" r="8" fill="#1e293b" />
                 <circle cx="60" cy="50" r="8" fill="#1e293b" />
                 <rect x="80" y="30" width="30" height="20" fill="#1d4ed8" />
                 <circle cx="95" cy="50" r="8" fill="#1e293b" />
              </svg>
              {/* Container on Truck */}
              <div className={`absolute -top-6 left-2 w-16 h-8 bg-red-600 border-2 border-red-400 transition-all duration-1000
                  ${step === 2 ? '-translate-y-16 translate-x-24' : ''} 
                  ${step === 3 ? '-translate-y-4 translate-x-52' : ''}
                  ${step === 4 ? '-translate-y-4 translate-x-52 opacity-0' : ''}
              `}>
                 <div className="w-full h-full flex items-center justify-center text-[8px] text-white font-bold">EXP-01</div>
              </div>
           </div>

           {/* Water */}
           <div className="absolute bottom-0 w-full h-10 bg-blue-900/50 backdrop-blur-sm"></div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Estado del Proceso:</p>
            <div className="flex gap-2">
               <span className={`px-3 py-1 rounded-full text-xs ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Logística</span>
               <span className={`px-3 py-1 rounded-full text-xs ${step >= 2 ? 'bg-yellow-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Carga</span>
               <span className={`px-3 py-1 rounded-full text-xs ${step >= 4 ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Despacho</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setStep(0)}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition flex items-center gap-2"
            >
              <RotateCcw size={18} /> Reset
            </button>
            <button 
              onClick={startSimulation}
              disabled={step > 0 && step < 4}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-indigo-600 text-white font-bold shadow-lg hover:shadow-indigo-500/25 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Play size={18} /> Iniciar Simulación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationModal;