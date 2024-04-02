import { FC } from 'react';
import { NavLink as Link } from 'react-router-dom';

import { paths } from '@/shared/routing';
import styles from './styles.module.css';
import LogoIcon from '@/assets/svg/logo.svg?react';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className = '' }) => (
  <Link className={className} to={paths.home} relative="path">
    <LogoIcon className={styles.logo} />
  </Link>
);
