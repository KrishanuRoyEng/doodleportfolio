export type WorkCategory = 'All works' | 'Character' | 'Couple' | 'Pet' | 'Sticker sheet';

export type CommissionFormat = 
  | 'Mini Art Card (A6)'
  | 'Original Artwork (A5)'
  | 'Framed Masterpiece (A4)';

export type BackgroundType = 
  | 'Clean Paper Wash'
  | 'Floral & Hand Botanicals'
  | 'Detailed Gouache Room';

export type UsageType = 'Personal Keepsake' | 'Commercial & Publishing';

export interface WorkItem {
  id: string;
  title: string;
  category: 'Character' | 'Couple' | 'Pet' | 'Sticker sheet';
  format: CommissionFormat | 'Handmade Sticker Sheet';
  dimensions: string;
  medium: string;
  paperType: string;
  completionYear: string;
  imageUrl: string;
  colorTokens: string[];
  description: string;
  turnaroundDays: number;
  baseRateInr: number;
}

export interface CommissionConfig {
  format: CommissionFormat;
  subjectCount: number;
  backgroundType: BackgroundType;
  usageRights: UsageType;
  teakWoodFrame: boolean;
  giftWrappingNote: boolean;
  expressTrackedCourier: boolean;
}

export interface PriceBreakdown {
  basePriceInr: number;
  extraSubjectsPriceInr: number;
  backgroundPriceInr: number;
  commercialFeeInr: number;
  teakWoodFrameFeeInr: number;
  giftWrappingFeeInr: number;
  expressCourierFeeInr: number;
  totalCostInr: number;
  estimatedTurnaroundDays: number;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  clientHandle: string;
  commissionedFormat: string;
  location: string;
  date: string;
  turnaroundTime: string;
  quote: string;
  verifiedOrder: boolean;
}

export interface RequestSubmissionData {
  clientName: string;
  email: string;
  phoneWhatsapp: string;
  shippingCity: string;
  referenceUrl: string;
  projectNotes: string;
  deadlineDate?: string;
  config: CommissionConfig;
  priceBreakdown: PriceBreakdown;
  referenceId: string;
  submittedAt: string;
}
