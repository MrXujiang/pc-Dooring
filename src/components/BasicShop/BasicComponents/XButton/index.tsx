import React, { memo, useState } from 'react';
import Modal from './Modal';
import styles from './index.less';
import { IButtonConfig } from './schema';
import logo from '@/assets/16-botton.png';

interface IProps extends IButtonConfig {
  isTpl: boolean;
}

const XButton = memo((props: IProps) => {
  const { 
    isTpl,
    bgColor,
    round,
    marginTop,
    text,
    width,
    fontSize,
    color,
    interaction
  } = props

  const { type, content, title } = interaction;

  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    if(type === 'link') {
      window.location.href = content;
    }else if(type === 'modal') {
      setVisible(true);
    }else if(type === 'code') {
      eval(content);
    }
  }

  const handleClose = () => {
    setVisible(false);
  }
  
  return isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt=""></img>
    </div>
  ) : <div style={{textAlign: 'center', padding: '6px', marginTop}}>
        <div className={styles.btn} style={{backgroundColor: bgColor, borderRadius: round, width}}>
            <a className={styles.text} style={{fontSize, color}} onClick={handleClick}>{ text }</a>
        </div>
        <Modal visible={visible} onClose={handleClose} title={title}>
            <div dangerouslySetInnerHTML = {{ __html: content }}></div>
        </Modal>
  </div>
})
export default XButton;
