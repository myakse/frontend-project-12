import React from 'react';
import { useTranslation } from 'react-i18next';
import style from './Nav.module.scss';

const Nav = ({ button }) => {
  const { t } = useTranslation();
  return (
    <nav className={style.nav}>
      <div className={style.navContainer}>
        <a href="/">{t('chatLogo')}</a>
        {button}
      </div>
    </nav>
  );
};

export default Nav;
