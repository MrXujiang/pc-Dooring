import React, { memo } from 'react';
import { IQrcodeConfig } from './schema';
import logo from '@/assets/10-二维码.png';

interface QrcodeType extends IQrcodeConfig {
  isTpl?: boolean;
}

const Qrcode = memo((props: QrcodeType) => {
  const { qrcode, text, color, isTpl, fontSize = 14 } = props;
  return isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt=""></img>
    </div>
  ) : (
    <div style={{ width: '100%', maxWidth: '220px', margin: '16px auto' }}>
      <img src={qrcode && qrcode[0].url} alt={text} style={{ width: '100%' }} />
      <div style={{ textAlign: 'center', color, fontSize, paddingTop: '8px' }}>{text}</div>
    </div>
  );
});

export default Qrcode;
