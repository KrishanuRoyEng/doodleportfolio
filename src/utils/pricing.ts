import type { CommissionConfig, PriceBreakdown } from '../types';

export const FORMAT_DETAILS = {
  'Mini Art Card (A6)': {
    basePriceInr: 999,
    baseDays: 3,
    size: '10.5 x 14.8 cm',
    paper: '300 GSM Cotton Rag',
    description: 'Original hand-inked illustration on archival postcard-weight paper. Ideal for desks, gifts, and personal bookmarks.'
  },
  'Original Artwork (A5)': {
    basePriceInr: 1899,
    baseDays: 5,
    size: '14.8 x 21.0 cm',
    paper: '300 GSM Cold-Pressed Board',
    description: 'Full hand-drawn character, couple, or pet illustration painted with traditional gouache and pigment fine-liners.'
  },
  'Framed Masterpiece (A4)': {
    basePriceInr: 3499,
    baseDays: 8,
    size: '21.0 x 29.7 cm',
    paper: '300 GSM Arches Cotton Board',
    description: 'Detailed multi-layer original artwork with full interior room props, furniture, and environmental scenery.'
  }
} as const;

export const SUBJECT_UNIT_PRICE_INR = 500;

export const BACKGROUND_PRICES_INR = {
  'Clean Paper Wash': 0,
  'Floral & Hand Botanicals': 450,
  'Detailed Gouache Room': 950
} as const;

export const COMMERCIAL_FEE_INR = 1500;
export const TEAK_FRAME_FEE_INR = 750;
export const GIFT_NOTE_FEE_INR = 350;
export const EXPRESS_COURIER_FEE_INR = 450;

export function calculateCommissionPrice(config: CommissionConfig): PriceBreakdown {
  const formatInfo = FORMAT_DETAILS[config.format];
  const basePriceInr = formatInfo.basePriceInr;
  const extraSubjectsCount = Math.max(0, config.subjectCount - 1);
  const extraSubjectsPriceInr = extraSubjectsCount * SUBJECT_UNIT_PRICE_INR;
  const backgroundPriceInr = BACKGROUND_PRICES_INR[config.backgroundType];
  const commercialFeeInr = config.usageRights === 'Commercial & Publishing' ? COMMERCIAL_FEE_INR : 0;
  const teakWoodFrameFeeInr = config.teakWoodFrame ? TEAK_FRAME_FEE_INR : 0;
  const giftWrappingFeeInr = config.giftWrappingNote ? GIFT_NOTE_FEE_INR : 0;
  const expressCourierFeeInr = config.expressTrackedCourier ? EXPRESS_COURIER_FEE_INR : 0;

  const totalCostInr =
    basePriceInr +
    extraSubjectsPriceInr +
    backgroundPriceInr +
    commercialFeeInr +
    teakWoodFrameFeeInr +
    giftWrappingFeeInr +
    expressCourierFeeInr;

  let estimatedDays = formatInfo.baseDays + extraSubjectsCount;
  if (config.backgroundType === 'Floral & Hand Botanicals') estimatedDays += 1;
  if (config.backgroundType === 'Detailed Gouache Room') estimatedDays += 2;
  if (config.teakWoodFrame) estimatedDays += 1;

  if (config.expressTrackedCourier) {
    estimatedDays = Math.max(3, Math.ceil(estimatedDays * 0.65));
  }

  return {
    basePriceInr,
    extraSubjectsPriceInr,
    backgroundPriceInr,
    commercialFeeInr,
    teakWoodFrameFeeInr,
    giftWrappingFeeInr,
    expressCourierFeeInr,
    totalCostInr,
    estimatedTurnaroundDays: estimatedDays
  };
}

export function formatInr(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
