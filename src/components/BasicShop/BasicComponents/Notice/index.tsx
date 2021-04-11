import { NoticeBar } from 'zarm';
import React, { memo } from 'react';
import { INoticeConfig } from './schema';
import logo from '@/assets/09-通知.png';
interface NoticeType extends INoticeConfig {
  isTpl?: boolean;
}
const Notice = memo((props:NoticeType) => {
  const { text, speed, theme, isTpl, isClose = false } = props;
  return isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt=""></img>
    </div>
  ) : (
    <NoticeBar theme={theme === 'default' ? undefined : theme} closable={isClose} speed={speed}>
      <span style={{ color: 'inherit' }}>{text}</span>
    </NoticeBar>
  );
});

export default Notice;
