import { LucideIcon } from 'lucide-react';

export interface Model {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering';
  accuracy: number;
  description: string;
}

export interface FeatureFormData {
  netWeight: number;
  grossWeight: number;
  quantity: number;
  itemCount: number;
  fobPrice: number;
  destinationCountry: number;
  destinationContinent: number;
  originDept: number;
  transportType: number;
  weightRatio: number;
}

export interface UserStats {
  xp: number;
  level: number;
  predictionsMade: number;
  streak: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Shipment {
  id: string;
  destination: string;
  status: 'Pending' | 'Customs' | 'In Transit' | 'Delivered';
  date: string;
  value: number;
  transport: 'Maritime' | 'Air' | 'Land';
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}