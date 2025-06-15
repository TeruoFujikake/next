export const DEVICE = {
  PC: 'pc',
  SP: 'sp',
  TABLET: 'tablet',
} as const;
export type DEVICE = (typeof DEVICE)[keyof typeof DEVICE];
