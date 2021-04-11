import React, { useState, memo, useEffect, ChangeEvent } from 'react';
import { Select, Input, Modal, Button } from 'antd';
import { UnControlled } from 'react-codemirror2';
import XEditor from '../XEditor';
import { TInteractionDefaultType } from '../FormEditor/types';
import styles from './index.less';
require('codemirror/mode/javascript/javascript');

type InteractionDataProps = {
  value?: TInteractionDefaultType;
  onChange?: (v: TInteractionDefaultType) => void;
};

const { Option } = Select;

const InteractionDataComponent = (props:InteractionDataProps) => {
    const { onChange, value } = props;
    const { type, title, content } = value || {};
    const [curType, setCurType] = useState(type);
    const [visible, setVisible] = useState(false);

    const formData: any = {}

    const handleChange = (v:string) => {
        setCurType(v)
    }

    const handleCodeChange = (
        _editor: CodeMirror.Editor,
        _data: CodeMirror.EditorChange,
        value: string,
    ) => {
        formData['content'] = value;
    };

    const onFormItemChange = (e: ChangeEvent<HTMLInputElement>, key:string) => {
        formData[key] = e.target.value;
    }

    const handleOk = () => {
        onChange && onChange({type: curType, ...formData});
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const openModal = () => {
        setVisible(true)
    }

    const handleSaveEditor = (html:string) => {
        formData['content'] = html;
    }

    return <div className={styles.interactionWrap}>
        <Button type="primary" onClick={openModal}>设置交互</Button>
        <Modal
          title="按钮交互设置"
          visible={visible}
          width={600}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <div className={styles.selectBox}>
            <span className={styles.formLabel}>交互类型: </span>
            <Select placeholder="请选择交互类型" defaultValue={curType} onChange={handleChange} style={{width: '100%'}}>
                <Option value="link">跳转链接</Option>
                <Option value="modal">打开弹窗</Option>
                <Option value="code">自定义代码</Option>
            </Select>
          </div>
          <div className={styles.contentBox}>
            {
                curType === 'link' &&
                <div className={styles.formItem}>
                    <span className={styles.formLabel}>链接地址: </span>
                    <Input defaultValue={content} onChange={(e) => onFormItemChange(e, 'content')} />
                </div>
            }
            {
                curType === 'modal' &&
                <>
                    <div className={styles.formItem}>
                        <span className={styles.formLabel}>弹窗标题: </span>
                        <Input defaultValue={title} onChange={(e) => onFormItemChange(e, 'title')} />
                    </div>
                    <div className={styles.formItem} style={{alignItems: 'flex-start'}}>
                        <span className={styles.formLabel}>弹窗内容: </span>
                        {/* 富文本 */}
                        <div style={{width: '100%'}}><XEditor defaultValue={content} onSave={handleSaveEditor} /></div>
                    </div>
                </>
            }
            {
                curType === 'code' &&
                <>
                    <div className={styles.formItem}>
                        <span className={styles.formLabel}>自定义代码: </span>
                        {/* 代码段 */}
                        <UnControlled
                            className={styles.codeWrap}
                            value={content}
                            options={{
                                mode: 'javascript',
                                theme: 'material',
                                lineNumbers: true,
                            }}
                            onBeforeChange={handleCodeChange}
                        />
                    </div>
                </>
            }
          </div>
        </Modal>
        
    </div>
}

export default memo(InteractionDataComponent)