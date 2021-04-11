import React, { memo, useEffect, RefObject } from 'react';
import { Form, Select, InputNumber, Input, Switch, Radio } from 'antd';
import Upload from '../Upload';
import DataList from '../DataList';
import MutiText from '../MutiText';
import Color from '../Color';
import CardPicker from '../CardPicker';
import Table from '../Table';
import Pos from '../Pos';
import InteractionData from '../InteractionData';
import { Store } from 'antd/lib/form/interface';
import FormItems from '../FormItems';
// import styles from './index.less';
const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    //待修改
    return e;
  }
  return e && e.fileList;
};

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

interface FormEditorProps {
  uid: string;
  onSave: Function;
  defaultValue: { [key: string]: any };
  config: Array<any>;
  rightPannelRef: RefObject<HTMLDivElement>;
}

const FormEditor = (props: FormEditorProps) => {
  const { config, defaultValue, onSave, rightPannelRef, uid } = props;

  const onFinish = (values: Store) => {
    onSave && onSave(values);
  };

  const handlechange = () => {
    onFinish(form.getFieldsValue());
  };

  const [form] = Form.useForm();

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [uid, form]);
  return (
    <Form
      form={form}
      name={`form_editor`}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={defaultValue}
      onValuesChange={handlechange}
    >
      {config.map((item, i) => {
        return (
          <React.Fragment key={i}>
            {item.type === 'Number' && (
              <Form.Item label={item.name} name={item.key}>
                <InputNumber min={0} max={item.range && item.range[1]} />
              </Form.Item>
            )}
            {item.type === 'Text' && (
              <Form.Item label={item.name} name={item.key}>
                <Input />
              </Form.Item>
            )}
            {item.type === 'TextArea' && (
              <Form.Item label={item.name} name={item.key}>
                <TextArea rows={4} />
              </Form.Item>
            )}
            {item.type === 'DataList' && (
              <Form.Item label={item.name} name={item.key}>
                <DataList cropRate={item.cropRate} />
              </Form.Item>
            )}
            {item.type === 'InteractionData' && (
              <Form.Item label={item.name} name={item.key}>
                <InteractionData />
              </Form.Item>
            )}
            {item.type === 'Color' && (
              <Form.Item label={item.name} name={item.key}>
                <Color />
              </Form.Item>
            )}
            {item.type === 'MutiText' && (
              <Form.Item label={item.name} name={item.key}>
                <MutiText />
              </Form.Item>
            )}
            {item.type === 'Select' && (
              <Form.Item label={item.name} name={item.key}>
                <Select placeholder="请选择">
                  {item.range.map((v: any, i: number) => {
                    return (
                      <Option value={v.key} key={i}>
                        {v.text}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
            {item.type === 'Radio' && (
              <Form.Item label={item.name} name={item.key}>
                <Radio.Group>
                  {item.range.map((v: any, i: number) => {
                    return (
                      <Radio value={v.key} key={i}>
                        {v.text}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            )}
            {item.type === 'Switch' && (
              <Form.Item label={item.name} name={item.key} valuePropName="checked">
                <Switch />
              </Form.Item>
            )}
            {item.type === 'Upload' && (
              <Form.Item
                label={item.name}
                name={item.key}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload cropRate={item.cropRate} isCrop={item.isCrop} />
              </Form.Item>
            )}
            {item.type === 'CardPicker' && (
              <Form.Item label={item.name} name={item.key} valuePropName="type">
                <CardPicker icons={item.icons} type={defaultValue['type']} />
              </Form.Item>
            )}
            {item.type === 'Table' && (
              <Form.Item label={item.name} name={item.key} valuePropName="data">
                <Table data={item.data} />
              </Form.Item>
            )}
            {item.type === 'FormItems' && (
              <Form.Item name={item.key} valuePropName="formList">
                <FormItems data={item.data} rightPannelRef={rightPannelRef} />
              </Form.Item>
            )}
            {item.type === 'Pos' && (
              <Form.Item label={item.name} name={item.key}>
                <Pos />
              </Form.Item>
            )}
          </React.Fragment>
        );
      })}
    </Form>
  );
};

export default memo(FormEditor);
