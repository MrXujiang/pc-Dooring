import React, { memo, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.less'

interface IProps {
    visible: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal = (props: IProps) => {
    const { visible, title, children, onClose } = props;

    const childDom = <div className={styles.modalWrap}>
                        <div className={styles.modalMask}></div>
                        <div className={styles.modal}>
                            <span className={styles.closeBtn} onClick={onClose}>x</span>
                            <div className={styles.modalTit}>{ title }</div>
                            <div> { children } </div>
                        </div>
                    </div>;

    return visible ? ReactDOM.createPortal(childDom, document.body) : null
}

export default memo(Modal)