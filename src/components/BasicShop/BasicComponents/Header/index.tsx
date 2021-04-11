import { memo } from 'react';
import styles from './index.less';
import React from 'react';
import logos from '@/assets/04-页头.png';
import { IHeaderConfig } from './schema';

interface HeaderPropTypes extends IHeaderConfig {
  isTpl: boolean;
}

const Header = memo((props: HeaderPropTypes) => {
  const { bgColor, logo, logoText, fontSize, color } = props;
  return props.isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logos} alt="" />
    </div>
  ) : (
    <header className={styles.header} style={{ backgroundColor: bgColor }}>
      <div className={styles.logo}>
        <img src={logo && logo[0].url} alt={logoText} />
      </div>
      <div className={styles.title} style={{ fontSize, color }}>
        {logoText}
      </div>
    </header>
  );
});

export default Header;
