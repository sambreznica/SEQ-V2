export interface NavItem {
  label: string;
  href: string;
}

export interface StepData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface MetricData {
  label: string;
  value: string;
  delta: string;
}

export interface NodePosition {
  x: number;
  y: number;
  z: number;
  label: string;
  type: 'cause' | 'linkage' | 'effect';
}