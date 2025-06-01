
import ClassNames from 'classnames';

import Crown from '../../../assets/icons/crown.svg';
import Heart from '../../../assets/icons/heart.svg';
import Star from '../../../assets/icons/star.svg';

import { IconType } from './IconType'; 
import styles from './Icon.module.scss';

export interface IconProps {
  color?: IconColors;
  size?: IconSize;
  type: IconType;
}

export type IconSize = 14 | 16 | 18;

export const ICON_COLORS = [
  'Default',
  'Primary',
  'Secondary',
  'Disabled',
] as const;
export type IconColors = (typeof ICON_COLORS)[number];

const Icon: React.FC<IconProps> = (props) => {
  const { color, size, type } = props;
  
  const iconMap: Record<IconType, React.FC<React.SVGProps<SVGSVGElement>>> = {
    crown: Crown,
    heart: Heart,
    star: Star,
  };

  const Component = iconMap[type];

  const classNames = ClassNames({
    [styles.Icon]: true,
    [styles[`Icon--size${size ? size : 16}`]]: true,
    [styles[`Icon--color${color ? color : 'Default'}`]]: true,
  });

  return (
    <i className={classNames} aria-hidden="true">
      {Component && <Component/>}
    </i>
  );
};

export default Icon;
