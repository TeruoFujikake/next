import ClassNames from 'classnames';
import styles from './BusinessHoursStatus.module.scss';

export const BUSINESS_HOURS_STATUS_CODES = {
  OPEN: 1,
  CLOSE: 2,
} as const;

export type BusinessHoursStatusCode = (typeof BUSINESS_HOURS_STATUS_CODES)[keyof typeof BUSINESS_HOURS_STATUS_CODES];

interface BusinessHoursStatusProps {
  fontSize?: 12 | 14 | 20;
  statusCode: BusinessHoursStatusCode;
  statusText: string;
}

const BusinessHoursStatus: React.FC<BusinessHoursStatusProps> = ({
  statusCode,
  statusText,
  fontSize = 14,
  }) => {
  const classNames = ClassNames({
    [styles.BusinessHoursStatus]: true,
    [styles['BusinessHoursStatus--open']]: statusCode === BUSINESS_HOURS_STATUS_CODES.OPEN,
    [styles['BusinessHoursStatus--close']]: statusCode === BUSINESS_HOURS_STATUS_CODES.CLOSE,
    [styles[`BusinessHoursStatus--fontSize${fontSize}`]]: true,
  });

  return (
    <div className={classNames}>
      <p className={styles.BusinessHoursStatus__status}>{statusText}</p>
    </div>
  );
};

export default BusinessHoursStatus;
