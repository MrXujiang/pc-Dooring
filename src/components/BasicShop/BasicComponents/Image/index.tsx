import React, { memo } from 'react';
import { IImageConfig } from './schema';
import logo from '@/assets/06-图片组件.png';

interface ImageType extends IImageConfig {
  isTpl?: boolean;
}

const Image = memo((props: ImageType) => {
  const { 
    imgUrl, 
    round = 0, 
    translate, 
    align, 
    titText, 
    titFontSize, 
    titColor, 
    titFontWeight,
    subTitText, 
    subTitFontSize, 
    subTitColor, 
    subTitFontWeight
  } = props;
  return props.isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt="" />
    </div>
  ) : (
    <div style={{ borderRadius: round, width: '100%', textAlign: 'center', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', 
        width: '100%',
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        marginLeft: translate && translate[0],
        marginTop: translate && translate[1],
        textAlign: align
      }}>
        <div style={{fontSize: titFontSize, color: titColor, fontWeight: +titFontWeight }}>{ titText }</div>
        <div style={{fontSize: subTitFontSize, color: subTitColor, fontWeight: +subTitFontWeight, lineHeight: 2.6}}>{ subTitText }</div>
      </div>
      <img src={imgUrl && imgUrl[0].url} alt="" style={{ width: '100%' }} />
    </div>
  )
})

export default Image;
