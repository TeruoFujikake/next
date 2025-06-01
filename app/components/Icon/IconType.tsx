export const iconTypes = [
  'crown',
  'heart',
  'star',
] as const;

export type IconType = (typeof iconTypes)[number];
