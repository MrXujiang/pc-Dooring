import { Input, Radio, Select, Checkbox, InputNumber, DatePicker } from 'antd';
import styles from './baseForm.less';
import React, { ReactText, useState } from 'react';
import { formatTime } from '@/utils/tool';
import moment from 'moment';
import {
  baseFormDateTpl,
  baseFormMyRadioTpl,
  baseFormMyCheckboxTpl,
  baseFormMySelectTpl,
  baseFormNumberTpl,
  baseFormTextAreaTpl,
  baseFormTextTpl,
  baseFormUnionType,
  baseFormTextTipTpl
} from '@/components/PanelComponents/FormEditor/types';
// 维护表单控件， 提高form渲染性能

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const BaseForm: TBaseForm = {
  Text: (props: baseFormTextTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, placeholder, onChange } = props;
    return (
      <div className={styles.formItem}>
        <span className={styles.formLabel}>{ label }</span>
        <Input type="text" placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  },
  Textarea: (props: baseFormTextAreaTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, placeholder, onChange } = props;
    return (
      <div className={styles.formItem} style={{alignItems: 'flex-start'}}>
        <span className={styles.formLabel}>{ label }</span>
        <Input.TextArea
          rows={3}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  },
  Number: (props: baseFormNumberTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, placeholder, onChange } = props;
    return (
      <div className={styles.formItem}>
        <span className={styles.formLabel}>{ label }</span>
        <InputNumber type="number" placeholder={placeholder} onChange={onChange} style={{width: '100%'}} />
      </div>
    );
  },
  MyRadio: (props: baseFormMyRadioTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, options, onChange } = props;
    return (
      <div className={styles.radioWrap}>
        <div className={styles.radioTitle}>{label}</div>
          <Radio.Group onChange={(e) => onChange(e.target.value)}>
            {options.map((item, i) => {
              return (
                <Radio value={item.value} key={i} className={styles.radioItem}>
                  {item.label}
                </Radio>
              );
            })}
          </Radio.Group>
      </div>
    );
  },
  MyCheckbox: (props: baseFormMyCheckboxTpl & { onChange: (v: Array<ReactText> | undefined) => void }) => {
    const { label, options, onChange } = props;
    return (
      <div className={styles.radioWrap}>
        <div className={styles.radioTitle}>{label}</div>
          <Checkbox.Group onChange={onChange}>
            {options.map((item, i) => {
              return (
                <Checkbox value={item.value} key={i} className={styles.radioItem}>
                  {item.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
      </div>
    );
  },
  Date: (props: baseFormDateTpl & { onChange: (v: Date) => void }) => {
    const { label, placeholder, onChange } = props;
    const [value, setValue] = useState<any>('2020-11-01');
     const handleChange = (v:any, str) => {
       console.log(v, str)
      //  return
      setValue(str)
      onChange && onChange(str)
     }
     const dateFormat = 'YYYY-MM-DD';
    return (
      <div className={styles.formItem}>
        <span className={styles.formLabel}>{ label }</span>
        <DatePicker 
          onChange={handleChange}
          mode="date"
          placeholder={placeholder}
          onOk={handleChange}
          value={moment(value, dateFormat)}
          style={{width: '100%'}}
          format={dateFormat}
        />
      </div>
    );
  },
  MySelect: (
    props: baseFormMySelectTpl & { onChange: ((v: Record<string, any>) => void) | undefined },
  ) => {
    const { label, options, onChange } = props;
    return (
      <div className={styles.formItem}>
        <span className={styles.formLabel}>{ label }</span>
        <Select options={options} onChange={onChange} style={{width: '100%'}} placeholder={`请输入${label}`} />
      </div>
    )
  },
  MyTextTip: (
    props: baseFormTextTipTpl,
  ) => {
    const { label, color, fontSize } = props;
    return (
      <div className={styles.formItem}>
        <span className={styles.formLabel}></span>
        <div style={{color, fontSize, lineHeight: '2.2'}}>{label}</div>
      </div>
      
    );
  },
};

export default BaseForm;
