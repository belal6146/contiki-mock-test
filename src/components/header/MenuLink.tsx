import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface MenuLinkProps {
  to: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ to, label, onClick, className }) => {
  return (
    <Link
      to={to}
      className={`${styles.navItemButtonText} ${className || ''}`}
      onClick={onClick}
      data-testid="menu-link"
    >
      {label}
    </Link>
  );
};

export default MenuLink;
