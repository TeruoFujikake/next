export const iconTypes = [
  'crown',
  'heart',
  'star',
  'close',
] as const;

export type IconType = (typeof iconTypes)[number];
