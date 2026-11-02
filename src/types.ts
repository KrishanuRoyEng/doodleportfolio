export type WorkCategory = 'All works' | 'Character' | 'Couple' | 'Pet' | 'Sticker sheet';

export type CommissionFormat = 'Chibi Icon' | 'Full Doodle' | 'Scene Illustration';

export type BackgroundType = 'Flat Color' | 'Simple Props' | 'Detailed Room';

export type UsageType = 'Personal' | 'Commercial';

export interface WorkItem {
  id: string;
  title: string;
  category: 'Character' | 'Couple' | 'Pet' | 'Sticker sheet';
  format: CommissionFormat | 'Sticker Sheet';
  dimensions: string;
  medium: string;
  completionYear: string;
  imageUrl: string;
  colorTokens: string[];
  description: string;
  turnaroundDays: number;
  baseRateUsd: number;
}

export interface CommissionConfig {
  format: CommissionFormat;
  subjectCount: number;
  backgroundType: BackgroundType;
  usageRights: UsageType;
  expressDelivery: boolean;
  sourceFiles: boolean;
  printableSheet: boolean;
}

export interface PriceBreakdown {
  basePrice: number;
  extraSubjectsPrice: number;
  backgroundPrice: number;
  commercialFee: number;
  expressFee: number;
  sourceFilesFee: number;
  printableSheetFee: number;
  totalCost: number;
  estimatedTurnaroundDays: number;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  clientHandle: string;
  commissionedFormat: string;
  date: string;
  turnaroundTime: string;
  quote: string;
  verifiedOrder: boolean;
}

export interface RequestSubmissionData {
  clientName: string;
  email: string;
  referenceUrl: string;
  projectNotes: string;
  deadlineDate?: string;
  config: CommissionConfig;
  priceBreakdown: PriceBreakdown;
  referenceId: string;
  submittedAt: string;
}
