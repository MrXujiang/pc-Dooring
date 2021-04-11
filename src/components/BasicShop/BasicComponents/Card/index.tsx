import React, { memo } from 'react';
import { ICardConfig } from './schema';
import logo from '@/assets/card@2x.png';

interface CardType extends ICardConfig {
  isTpl?: boolean;
}

const Card = memo((props: CardType) => {
  const { 
    width,
    imgUrl,
    title,
    link,
    desc,
    titColor,
    titFontSize,
    descColor,
    descFontSize,
    bgColor,
    bgPadding,
    cardRadius,
    isTpl
  } = props;
  const toLink = () => {
    if(link && window.location.href.indexOf('editor') < 0) {
      window.location.href = link;
    }
  }
  return isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt=""></img>
    </div>
  ) : (
    <div 
      style={{ 
        width: width + 'px', 
        maxWidth: '96%', 
        backgroundColor: bgColor, 
        padding: bgPadding + 'px', 
        borderRadius: cardRadius + 'px', 
        margin: '16px auto',
        boxShadow: '0 0 6px rgba(0,0,0, .1)'
      }}
      onClick={toLink}
    >
      <img src={Card && imgUrl[0].url} alt={title} style={{ width: '100%' }} />
      <div 
        style={{ 
          textAlign: 'center', 
          color: titColor, 
          fontSize: titFontSize + 'px', 
          paddingTop: '8px' 
        }}
      >
        { title }
      </div>
      <div 
        style={{ 
          textAlign: 'center', 
          color: descColor, 
          fontSize: descFontSize + 'px', 
          paddingTop: '8px',
          wordBreak: 'break-all'
        }}
      >
        { desc }
      </div>
    </div>
  );
});

export default Card;
