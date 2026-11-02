import type { CommissionConfig, PriceBreakdown } from '../types';

export const FORMAT_DETAILS = {
  'Chibi Icon': {
    basePrice: 35,
    baseDays: 3,
    description: 'Bust or avatar doodle with clean lines. Recommended for social profiles and discord icons.'
  },
  'Full Doodle': {
    basePrice: 55,
    baseDays: 5,
    description: 'Full-body doodle of character, couple, or pet. Recommended for gifts and personal prints.'
  },
  'Scene Illustration': {
    basePrice: 95,
    baseDays: 8,
    description: 'Complete environment composition with custom indoor or outdoor props and background elements.'
  }
} as const;

export const SUBJECT_UNIT_PRICE = 20;

export const BACKGROUND_PRICES = {
  'Flat Color': 0,
  'Simple Props': 15,
  'Detailed Room': 35
} as const;

export const COMMERCIAL_FEE = 50;
export const EXPRESS_FEE = 25;
export const SOURCE_FILES_FEE = 20;
export const PRINTABLE_SHEET_FEE = 15;

export function calculateCommissionPrice(config: CommissionConfig): PriceBreakdown {
  const formatInfo = FORMAT_DETAILS[config.format];
  const basePrice = formatInfo.basePrice;
  const extraSubjectsCount = Math.max(0, config.subjectCount - 1);
  const extraSubjectsPrice = extraSubjectsCount * SUBJECT_UNIT_PRICE;
  const backgroundPrice = BACKGROUND_PRICES[config.backgroundType];
  const commercialFee = config.usageRights === 'Commercial' ? COMMERCIAL_FEE : 0;
  const expressFee = config.expressDelivery ? EXPRESS_FEE : 0;
  const sourceFilesFee = config.sourceFiles ? SOURCE_FILES_FEE : 0;
  const printableSheetFee = config.printableSheet ? PRINTABLE_SHEET_FEE : 0;

  const totalCost =
    basePrice +
    extraSubjectsPrice +
    backgroundPrice +
    commercialFee +
    expressFee +
    sourceFilesFee +
    printableSheetFee;

  let estimatedDays = formatInfo.baseDays + extraSubjectsCount;
  if (config.backgroundType === 'Simple Props') estimatedDays += 1;
  if (config.backgroundType === 'Detailed Room') estimatedDays += 2;

  if (config.expressDelivery) {
    estimatedDays = Math.max(3, Math.ceil(estimatedDays * 0.5));
  }

  return {
    basePrice,
    extraSubjectsPrice,
    backgroundPrice,
    commercialFee,
    expressFee,
    sourceFilesFee,
    printableSheetFee,
    totalCost,
    estimatedTurnaroundDays: estimatedDays
  };
}
