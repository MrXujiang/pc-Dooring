import { memo } from 'react';
import styles from './index.less';
import React from 'react';
import { IWhiteTplConfig } from './schema';
import logo from '@/assets/13-空白.png';

interface IProps extends IWhiteTplConfig {
  isTpl: boolean;
}

const WhiteTpl = memo((props: IProps) => {
  const { bgColor, text, fontSize, color, height, isTpl } = props;

  return isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt=""></img>
    </div>
  ) : (
    <div className={styles.whiteTpl} style={{ backgroundColor: bgColor, height, lineHeight: height + 'px' }}>
      <div className={styles.title} style={{ fontSize, color }}>
        { isTpl ? '空白模版' : text }
      </div>
    </div>
  );
});

export default WhiteTpl;
