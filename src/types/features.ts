export type FeatureVariant = 'A' | 'B' | 'control'

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: 'development' | 'production' | 'all';
  isExperiment: boolean;
  variantDistribution?: {
    A: number;
    B: number;
    control: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FeatureUpdate {
  enabled: boolean;
  environment?: 'development' | 'production' | 'all';
  isExperiment?: boolean;
  variantDistribution?: {
    A: number;
    B: number;
    control: number;
  };
}

export interface ExperimentResult {
  variant: FeatureVariant;
  conversionRate: number;
  sampleSize: number;
  confidence: number;
} 