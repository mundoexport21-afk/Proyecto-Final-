import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SimulationModal from './components/SimulationModal';
import { Model, UserStats, FeatureFormData, Shipment, Badge as BadgeType } from './types';
import { 
  TrendingUp, Activity, Target, Award, Play, Info, CheckCircle, Zap,
  BrainCircuit, Box, Ship, Map, Clock, Shield, Bell, User, Globe,
  AlertCircle, Search, ArrowRight, Lock, Unlock, Truck, Plane,
  BarChart3, PieChart, DollarSign, Calendar
} from 'lucide-react';

// --- CONSTANTS & MOCK DATA ---

const MODELS: Model[] = [
  { id: 'rf', name: 'Random Forest Classifier', type: 'classification', accuracy: 0.96, description: 'Alta precisión para detección de fraudes y viabilidad.' },
  { id: 'xgb', name: 'XGBoost Regressor', type: 'regression', accuracy: 0.92, description: 'Optimizado para estimación de precios FOB.' },
  { id: 'kmeans', name: 'K-Means Market Cluster', type: 'clustering', accuracy: 0.0, description: 'Segmentación de destinos y rutas similares.' },
];

// Updated to user specifications
const INITIAL_FORM: FeatureFormData = {
  netWeight: 1000,
  grossWeight: 555,
  quantity: 4,
  itemCount: 4,
  fobPrice: 44,
  destinationCountry: 44, 
  destinationContinent: 4, 
  originDept: 4, 
  transportType: 1, // Maritime
  weightRatio: 0.555 // Calculated automatically usually, but setting initial based on inputs
};

const SHIPMENTS: Shipment[] = [
  { id: 'EXP-2023-001', destination: 'United States (840)', status: 'In Transit', date: '2023-10-15', value: 45000, transport: 'Maritime' },
  { id: 'EXP-2023-002', destination: 'Germany (276)', status: 'Customs', date: '2023-10-18', value: 12500, transport: 'Air' },
  { id: 'EXP-2023-003', destination: 'Mexico (484)', status: 'Delivered', date: '2023-10-01', value: 8200, transport: 'Land' },
  { id: 'EXP-2023-004', destination: 'China (156)', status: 'Pending', date: '2023-10-20', value: 98000, transport: 'Maritime' },
];

const BADGES_DATA: BadgeType[] = [
  { id: '1', name: 'Pionero Exportador', description: 'Realiza tu primera predicción', icon: 'flag', unlocked: true },
  { id: '2', name: 'Mago de Datos', description: 'Alcanza 90% de precisión en 5 envíos', icon: 'wand', unlocked: true },
  { id: '3', name: 'Logística Global', description: 'Envía a 3 continentes distintos', icon: 'globe', unlocked: false },
  { id: '4', name: 'Maestro de Carga', description: 'Optimiza el ratio de peso en 10 envíos', icon: 'weight', unlocked: false },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  
  // Gamification State
  const [userStats, setUserStats] = useState<UserStats>({
    xp: 2450,
    level: 14,
    predictionsMade: 45,
    streak: 5,
    badges: BADGES_DATA
  });

  // Prediction State
  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0].id);
  const [formData, setFormData] = useState<FeatureFormData>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showExplainer, setShowExplainer] = useState(false);

  // Logistics State
  const [searchTerm, setSearchTerm] = useState('');

  // --- EFFECTS ---

  // Auto-calculate Ratio when weights change
  useEffect(() => {
    if (formData.netWeight > 0 && formData.grossWeight > 0) {
      const ratio = formData.grossWeight / formData.netWeight;
      setFormData(prev => ({ ...prev, weightRatio: parseFloat(ratio.toFixed(4)) }));
    }
  }, [formData.netWeight, formData.grossWeight]);

  // --- HANDLERS ---

  const handleInputChange = (field: keyof FeatureFormData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    // Simulate ML Latency
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock Logic
      const isViable = formData.weightRatio < 1.2 && formData.weightRatio > 0.8;
      
      setResult({
        value: selectedModel === 'xgb' ? `$${(formData.fobPrice * 1.05).toFixed(2)}` : (isViable ? 'Exportación Viable' : 'Revisión Requerida'),
        confidence: isViable ? 0.94 : 0.65,
        details: isViable 
          ? 'Los indicadores sugieren un despacho fluido. El ratio de peso está dentro de los parámetros normales de la DIAN.' 
          : 'Alerta: El ratio de peso bruto/neto es inusual para este tipo de mercancía (Bajo o Excesivo). Se recomienda revisión física.'
      });
      
      // Update Gamification
      setUserStats(prev => ({
        ...prev,
        xp: prev.xp + 150,
        predictionsMade: prev.predictionsMade + 1
      }));
    }, 1800);
  };

  // --- RENDER MODULES ---

  const renderDashboardModule = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs uppercase font-bold">Total Exportado</p>
            <h3 className="text-2xl font-bold text-white">$1.2M</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
            <DollarSign size={20} />
          </div>
        </div>
        <div className="bg-surface border border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs uppercase font-bold">Envíos Activos</p>
            <h3 className="text-2xl font-bold text-white">12</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <Ship size={20} />
          </div>
        </div>
        <div className="bg-surface border border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs uppercase font-bold">Precisión ML</p>
            <h3 className="text-2xl font-bold text-white">94.2%</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
            <BrainCircuit size={20} />
          </div>
        </div>
        <div className="bg-surface border border-slate-700 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs uppercase font-bold">Eficiencia</p>
            <h3 className="text-2xl font-bold text-white">+18%</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-surface border border-slate-700 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-primary" size={20} /> Volumen de Exportación (2023)
            </h3>
            <select className="bg-dark border border-slate-700 rounded-lg text-xs px-2 py-1 text-slate-300 outline-none">
              <option>Últimos 6 meses</option>
              <option>Año actual</option>
            </select>
          </div>
          
          {/* Mock Chart Visual */}
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[45, 60, 75, 50, 80, 95, 85, 70, 90, 100, 85, 95].map((h, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                 <div className="relative w-full bg-slate-700/50 rounded-t-sm h-full flex items-end overflow-hidden hover:bg-slate-700/80 transition-colors">
                    <div 
                      className={`w-full bg-gradient-to-t from-primary/50 to-primary transition-all duration-1000 ease-out group-hover:to-indigo-400`} 
                      style={{ height: `${h}%` }}
                    ></div>
                 </div>
                 <span className="text-[10px] text-slate-500 font-mono">{['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution & Alerts */}
        <div className="space-y-6">
          <div className="bg-surface border border-slate-700 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <PieChart className="text-secondary" size={20} /> Destinos Top
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 rounded-full bg-blue-500"></span> USA</span>
                <span className="font-bold text-white">45%</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-blue-500 h-full w-[45%]"></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 rounded-full bg-purple-500"></span> China</span>
                <span className="font-bold text-white">30%</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-purple-500 h-full w-[30%]"></div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-slate-300"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Alemania</span>
                <span className="font-bold text-white">15%</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-amber-500 h-full w-[15%]"></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden">
             <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
             <h4 className="text-indigo-200 font-bold mb-2 flex items-center gap-2">
               <Zap size={16} /> Acciones Rápidas
             </h4>
             <button 
                onClick={() => setActiveTab('predict')}
                className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm transition-all flex items-center justify-center gap-2 mb-2"
             >
                Nueva Predicción
             </button>
             <button 
                onClick={() => setIsSimulationOpen(true)}
                className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-sm transition-all flex items-center justify-center gap-2"
             >
                Simulador 3D
             </button>
          </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="bg-surface border border-slate-700 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
           <h3 className="font-bold text-white flex items-center gap-2">
             <Activity size={20} className="text-slate-400"/> Actividad Reciente
           </h3>
           <button className="text-xs text-primary hover:text-white transition-colors">Ver todo</button>
        </div>
        <div className="divide-y divide-slate-700/50">
           {[
             { title: 'Predicción Exitosa', desc: 'Envío a China (156) clasificado como viable', time: 'Hace 2 min', icon: CheckCircle, color: 'text-green-400' },
             { title: 'Actualización de Estado', desc: 'EXP-2023-002 llegó a Aduanas', time: 'Hace 45 min', icon: Truck, color: 'text-amber-400' },
             { title: 'Logro Desbloqueado', desc: 'Has alcanzado el Nivel 14', time: 'Hace 2 horas', icon: Award, color: 'text-purple-400' },
           ].map((item, i) => (
             <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors">
                <div className={`p-2 rounded-full bg-slate-800 ${item.color}`}>
                   <item.icon size={18} />
                </div>
                <div className="flex-1">
                   <h4 className="text-sm font-bold text-white">{item.title}</h4>
                   <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <span className="text-xs text-slate-500">{item.time}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  const renderPredictModule = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Left Column: Inputs (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Model Selector */}
        <section className="bg-surface border border-slate-700 rounded-2xl p-1 shadow-lg flex p-1 gap-1 overflow-x-auto">
          {MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`flex-1 min-w-[200px] p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                selectedModel === model.id 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <div className={`p-2 rounded-lg ${selectedModel === model.id ? 'bg-white/20' : 'bg-slate-700'}`}>
                <BrainCircuit size={18} />
              </div>
              <div>
                <div className="font-bold text-sm">{model.name}</div>
                <div className="text-[10px] opacity-80">{model.type.toUpperCase()}</div>
              </div>
            </button>
          ))}
        </section>

        {/* Main Form */}
        <section className="bg-surface border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary"></div>
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="text-primary" /> Parámetros de Carga (Legiscomex)
            </h3>
            <button onClick={() => setShowExplainer(!showExplainer)} className="text-primary hover:text-white text-sm flex items-center gap-1 transition-colors">
              <Info size={16} /> Ayuda
            </button>
          </div>

          {showExplainer && (
            <div className="mb-6 bg-indigo-900/40 border border-indigo-500/50 p-4 rounded-xl text-sm text-indigo-200 animate-in slide-in-from-top-2">
              <h4 className="font-bold mb-1 flex items-center gap-2"><AlertCircle size={14}/> Guía de Códigos</h4>
              <ul className="list-disc pl-4 space-y-1 opacity-90">
                <li><strong>Vía Transporte:</strong> 1=Marítimo, 4=Aéreo, 3=Terrestre.</li>
                <li><strong>Ratio:</strong> Calculado automáticamente (Bruto/Neto). Valores > 1.15 pueden activar alertas.</li>
              </ul>
            </div>
          )}

          <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="lg:col-span-3 pb-2 border-b border-slate-700/50 mb-2">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Datos Físicos</h4>
            </div>

            <InputGroup 
              label="Peso Neto (kg)" 
              value={formData.netWeight} 
              onChange={(v) => handleInputChange('netWeight', v)} 
            />
            <InputGroup 
              label="Peso Bruto (kg)" 
              value={formData.grossWeight} 
              onChange={(v) => handleInputChange('grossWeight', v)} 
            />
            <InputGroup 
              label="Ratio Peso (Auto)" 
              value={formData.weightRatio} 
              readonly 
              icon={<Lock size={14} />}
              highlight
            />

            <div className="lg:col-span-3 pb-2 border-b border-slate-700/50 mb-2 mt-2">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detalles Comerciales</h4>
            </div>

            <InputGroup 
              label="Cantidad" 
              value={formData.quantity} 
              onChange={(v) => handleInputChange('quantity', v)} 
            />
            <InputGroup 
              label="Número de Artículos" 
              value={formData.itemCount} 
              onChange={(v) => handleInputChange('itemCount', v)} 
            />
            <InputGroup 
              label="Precio FOB Total (USD)" 
              value={formData.fobPrice} 
              onChange={(v) => handleInputChange('fobPrice', v)} 
              icon="$"
            />

            <div className="lg:col-span-3 pb-2 border-b border-slate-700/50 mb-2 mt-2">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logística y Origen</h4>
            </div>

            <SelectGroup 
              label="País Destino" 
              value={formData.destinationCountry}
              onChange={(v) => handleInputChange('destinationCountry', v)}
              options={[
                { label: 'Estados Unidos (840)', value: 840 },
                { label: 'China (156)', value: 156 },
                { label: 'Alemania (276)', value: 276 },
                { label: 'Colombia (170)', value: 170 },
                { label: 'Otro (44)', value: 44 },
              ]}
            />
             <SelectGroup 
              label="Continente Destino" 
              value={formData.destinationContinent}
              onChange={(v) => handleInputChange('destinationContinent', v)}
              options={[
                { label: 'América (2)', value: 2 },
                { label: 'Europa (4)', value: 4 },
                { label: 'Asia (5)', value: 5 },
                { label: 'Otro (4)', value: 4 },
              ]}
            />
            <SelectGroup 
              label="Depto. Origen" 
              value={formData.originDept}
              onChange={(v) => handleInputChange('originDept', v)}
              options={[
                { label: 'Antioquia (05)', value: 5 },
                { label: 'Bogotá D.C. (11)', value: 11 },
                { label: 'Valle del Cauca (76)', value: 76 },
                { label: 'Atlántico (08)', value: 8 },
                { label: 'Otro (4)', value: 4 },
              ]}
            />
            <SelectGroup 
              label="Vía Transporte" 
              value={formData.transportType}
              onChange={(v) => handleInputChange('transportType', v)}
              options={[
                { label: '1 - Marítimo', value: 1 },
                { label: '4 - Aéreo', value: 4 },
                { label: '3 - Terrestre', value: 3 },
                { label: '2 - Ferroviario', value: 2 },
              ]}
            />

            <div className="lg:col-span-3 mt-6">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-500 hover:to-primary rounded-xl text-white font-bold text-lg shadow-lg shadow-indigo-900/50 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {isLoading ? (
                  <>
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     Analizando Vectores...
                  </>
                ) : (
                  <>
                    <Zap className="group-hover:text-yellow-300 transition-colors" /> Ejecutar Predicción
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Right Column: Results & Stats (4 cols) */}
      <div className="lg:col-span-4 space-y-6">
         {/* Result Card */}
         <div className={`bg-surface border border-slate-700 rounded-2xl p-6 min-h-[280px] flex flex-col relative overflow-hidden transition-all duration-500 ${result ? 'ring-2 ring-secondary shadow-[0_0_40px_rgba(16,185,129,0.2)]' : ''}`}>
            {!result && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-800/50">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mb-4 animate-pulse-slow">
                   <Target size={32} />
                </div>
                <p className="text-sm font-medium">Esperando parámetros...</p>
              </div>
            )}
            
            {result && (
              <div className="relative z-10 animate-in fade-in zoom-in duration-300 h-full flex flex-col">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                      <Award size={24} />
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">CONF: {(result.confidence * 100).toFixed(1)}%</span>
                 </div>
                 
                 <h4 className="text-slate-400 text-xs uppercase font-bold tracking-wide mb-1">Predicción del Modelo</h4>
                 <div className="text-3xl font-black text-white mb-4 leading-tight">{result.value}</div>
                 
                 <div className="flex-1 bg-dark/40 rounded-xl p-4 border border-slate-700/50 mb-4 overflow-y-auto">
                    <p className="text-sm text-slate-300 leading-relaxed">{result.details}</p>
                 </div>
                 
                 <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle size={12} /> Modelo validado con 10k registros
                 </div>
              </div>
            )}
         </div>

         {/* Quick Stats Widget */}
         <div className="bg-gradient-to-br from-slate-800 to-surface border border-slate-700 rounded-2xl p-5">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <TrendingUp size={16} className="text-blue-400" /> Métricas en Vivo
            </h4>
            <div className="space-y-3">
               <StatRow label="Precisión Global" value="94.2%" change="+2.1%" positive />
               <StatRow label="Error Cuadrático" value="0.042" change="-0.001" positive />
               <StatRow label="Latencia API" value="124ms" />
            </div>
         </div>
      </div>
    </div>
  );

  const renderLogisticsModule = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
         <div>
           <h2 className="text-2xl font-bold text-white">Centro de Logística</h2>
           <p className="text-slate-400">Rastreo de despachos en tiempo real</p>
         </div>
         <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar despacho (EXP-...)" 
              className="w-full bg-surface border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-primary outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-surface p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Ship size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-slate-400">En Tránsito (Mar)</div>
            </div>
         </div>
         <div className="bg-surface p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-sm text-slate-400">En Aduanas</div>
            </div>
         </div>
         <div className="bg-surface p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              <CheckCircle size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">84</div>
              <div className="text-sm text-slate-400">Completados (Mes)</div>
            </div>
         </div>
      </div>

      <div className="bg-surface border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase">
                <th className="p-4 font-semibold">ID Despacho</th>
                <th className="p-4 font-semibold">Destino</th>
                <th className="p-4 font-semibold">Transporte</th>
                <th className="p-4 font-semibold">Valor FOB</th>
                <th className="p-4 font-semibold">Fecha</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {SHIPMENTS.filter(s => s.id.toLowerCase().includes(searchTerm.toLowerCase())).map((shipment) => (
                <tr key={shipment.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono text-white font-medium">{shipment.id}</td>
                  <td className="p-4 text-slate-300">{shipment.destination}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      {shipment.transport === 'Maritime' ? <Ship size={16} className="text-blue-400"/> : 
                       shipment.transport === 'Air' ? <Plane size={16} className="text-sky-400"/> : 
                       <Truck size={16} className="text-amber-400"/>}
                      {shipment.transport}
                    </div>
                  </td>
                  <td className="p-4 text-white font-medium">${shipment.value.toLocaleString()}</td>
                  <td className="p-4 text-slate-400 text-sm">{shipment.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      shipment.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                      shipment.status === 'In Transit' ? 'bg-blue-500/20 text-blue-400' :
                      shipment.status === 'Customs' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAchievementsModule = () => (
    <div className="animate-in fade-in slide-in-from-right-4">
       <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-orange-600/30 mb-4">
            <Award size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Nivel {userStats.level} - Experto en Logística</h2>
          <p className="text-slate-400">Has superado al 85% de los usuarios esta semana</p>
          
          <div className="max-w-md mx-auto mt-6 bg-slate-800 rounded-full h-4 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 w-[65%]"></div>
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-slate-500">
             <span>XP Actual: {userStats.xp}</span>
             <span>Siguiente Nivel: 3000</span>
          </div>
       </div>

       <h3 className="text-xl font-bold text-white mb-6 pl-2 border-l-4 border-primary">Medallas y Logros</h3>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStats.badges.map((badge) => (
            <div key={badge.id} className={`relative bg-surface border ${badge.unlocked ? 'border-amber-500/30' : 'border-slate-700'} rounded-2xl p-6 flex flex-col items-center text-center group transition-all hover:-translate-y-2`}>
               {!badge.unlocked && (
                 <div className="absolute inset-0 bg-dark/60 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-10">
                    <Lock className="text-slate-500" size={32} />
                 </div>
               )}
               <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${badge.unlocked ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20' : 'bg-slate-800'}`}>
                  {badge.icon === 'flag' && <Zap className="text-white" />}
                  {badge.icon === 'wand' && <BrainCircuit className="text-white" />}
                  {badge.icon === 'globe' && <Globe className="text-white" />}
                  {badge.icon === 'weight' && <Box className="text-white" />}
               </div>
               <h4 className={`font-bold mb-2 ${badge.unlocked ? 'text-white' : 'text-slate-500'}`}>{badge.name}</h4>
               <p className="text-sm text-slate-400">{badge.description}</p>
            </div>
          ))}
       </div>
    </div>
  );

  const renderSettingsModule = () => (
    <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-300">
      <h2 className="text-2xl font-bold text-white mb-6">Configuración del Sistema</h2>
      
      <div className="space-y-6">
        <div className="bg-surface border border-slate-700 rounded-2xl overflow-hidden">
           <div className="p-4 border-b border-slate-700 bg-slate-800/50">
              <h3 className="font-bold text-white flex items-center gap-2"><User size={18} /> Perfil de Usuario</h3>
           </div>
           <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm text-slate-400 mb-1">Nombre</label>
                    <input type="text" value="Ingeniero Pro" className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 text-white" readOnly />
                 </div>
                 <div>
                    <label className="block text-sm text-slate-400 mb-1">Rol</label>
                    <input type="text" value="Logistics Manager" className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 text-slate-400" readOnly />
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-surface border border-slate-700 rounded-2xl overflow-hidden">
           <div className="p-4 border-b border-slate-700 bg-slate-800/50">
              <h3 className="font-bold text-white flex items-center gap-2"><Bell size={18} /> Notificaciones</h3>
           </div>
           <div className="p-6 space-y-4">
              <ToggleRow label="Alertas de Ratio Peso/Volumen" checked={true} />
              <ToggleRow label="Cambios de Estado en Envíos" checked={true} />
              <ToggleRow label="Boletín Semanal Legiscomex" checked={false} />
           </div>
        </div>

        <div className="bg-surface border border-slate-700 rounded-2xl overflow-hidden">
           <div className="p-4 border-b border-slate-700 bg-slate-800/50">
              <h3 className="font-bold text-white flex items-center gap-2"><Shield size={18} /> Seguridad & API</h3>
           </div>
           <div className="p-6 space-y-4">
              <div>
                 <label className="block text-sm text-slate-400 mb-1">Clave API ProColombia</label>
                 <div className="flex gap-2">
                   <input type="password" value="sk-prod-88392000192" className="flex-1 bg-dark border border-slate-700 rounded-lg px-4 py-2 text-slate-400 font-mono" readOnly />
                   <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">Regenerar</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  // --- MAIN RENDER ---

  return (
    <div className="min-h-screen bg-dark text-slate-200 font-sans flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto h-screen scroll-smooth">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">ExportAI <span className="text-primary">Pro</span></h1>
            <p className="text-slate-400 text-sm">Dashboard de Inteligencia Artificial para Comercio Exterior</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Gamification Widget */}
            <div className="bg-surface border border-slate-700 rounded-xl p-2 pr-4 flex items-center gap-3 flex-1 md:flex-initial shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-inner">
                <Zap size={20} fill="currentColor" />
              </div>
              <div>
                <div className="flex justify-between items-end mb-1 w-32">
                  <span className="text-xs font-bold text-white uppercase">Nivel {userStats.level}</span>
                  <span className="text-[10px] text-amber-400 font-mono">{userStats.xp} XP</span>
                </div>
                <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full transition-all duration-1000" style={{ width: `${(userStats.xp % 1000) / 10}%` }}></div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsSimulationOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] group border border-indigo-400/50"
              title="Visualizar Logística"
            >
              <Play size={24} className="group-hover:scale-110 transition-transform" fill="currentColor" />
            </button>
          </div>
        </header>

        {/* Content Switcher */}
        <div className="mb-8">
          {activeTab === 'dashboard' && renderDashboardModule()}
          {activeTab === 'predict' && renderPredictModule()}
          {activeTab === 'logistics' && renderLogisticsModule()}
          {activeTab === 'achievements' && renderAchievementsModule()}
          {activeTab === 'settings' && renderSettingsModule()}
        </div>

      </main>

      <SimulationModal isOpen={isSimulationOpen} onClose={() => setIsSimulationOpen(false)} />
    </div>
  );
};

// --- REUSABLE COMPONENTS ---

interface InputGroupProps {
  label: string;
  value: number;
  onChange?: (val: number) => void;
  readonly?: boolean;
  icon?: React.ReactNode;
  highlight?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, value, onChange, readonly, icon, highlight }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold text-slate-300 ml-1 uppercase tracking-wide">{label}</label>
    <div className="relative group">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </div>
      )}
      <input 
        type="number" 
        value={value}
        onChange={(e) => onChange && onChange(parseFloat(e.target.value) || 0)}
        readOnly={readonly}
        className={`w-full bg-dark border text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-mono 
          ${readonly ? 'opacity-70 cursor-not-allowed border-slate-800' : 'border-slate-700 group-hover:border-slate-500'}
          ${icon ? 'pl-9' : ''}
          ${highlight ? 'text-green-400 font-bold border-green-900/50 bg-green-900/10' : ''}
        `}
      />
    </div>
  </div>
);

interface SelectGroupProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  options: { label: string; value: number }[];
}

const SelectGroup: React.FC<SelectGroupProps> = ({ label, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold text-slate-300 ml-1 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full bg-dark border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none transition-all hover:border-slate-500 cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
        <Map size={16} />
      </div>
    </div>
  </div>
);

const StatRow = ({ label, value, change, positive }: any) => (
  <div className="flex justify-between items-center p-3 bg-dark/40 rounded-lg border border-slate-700/50 hover:bg-dark/60 transition-colors">
     <span className="text-xs text-slate-400 font-medium">{label}</span>
     <div className="text-right">
       <div className="font-mono font-bold text-white text-sm">{value}</div>
       {change && (
         <div className={`text-[10px] ${positive ? 'text-green-400' : 'text-red-400'}`}>{change}</div>
       )}
     </div>
  </div>
);

const ToggleRow = ({ label, checked }: { label: string, checked: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-slate-300">{label}</span>
    <button className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-slate-700'}`}>
      <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </button>
  </div>
);

export default App;