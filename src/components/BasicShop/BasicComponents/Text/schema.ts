import {
  IColorConfigType,
  INumberConfigType,
  ISelectConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TTextDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type TTextSelectKeyType = 'left' | 'right' | 'center';

export type TTextTipSelectKeyType = 'left' | 'right' | 'bottom' | 'top';
export type TTextEditData = Array<
  ITextConfigType | 
  IColorConfigType | 
  INumberConfigType | 
  ISelectConfigType<TTextSelectKeyType> |
  ISelectConfigType<TTextTipSelectKeyType> |
  ISelectConfigType<TTextWeightSelectKeyType>
>;
export type TTextWeightSelectKeyType = '300' | '400' | '500' | '600';

export interface ITextConfig {
  text: TTextDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  align: TSelectDefaultType<TTextSelectKeyType>;
  lineHeight: TNumberDefaultType;
  fontWeight: TSelectDefaultType<TTextWeightSelectKeyType>;
  bgColor: TColorDefaultType;
  padding: TNumberDefaultType;
  radius: TNumberDefaultType;
  link: TTextDefaultType;
  textTip: TTextDefaultType;
  textTipPosition: TSelectDefaultType<TTextTipSelectKeyType>;
}

export interface ITextSchema {
  editData: TTextEditData;
  config: ITextConfig;
}
const Text: ITextSchema = {
  editData: [
    {
      key: 'text',
      name: '文字',
      type: 'Text',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number',
    },
    {
      key: 'align',
      name: '对齐方式',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左对齐',
        },
        {
          key: 'center',
          text: '居中对齐',
        },
        {
          key: 'right',
          text: '右对齐',
        },
      ],
    },
    {
      key: 'lineHeight',
      name: '行高',
      type: 'Number',
    },
    {
      key: 'fontWeight',
      name: '文字粗细',
      type: 'Select',
      range: [
        {
          key: '300',
          text: '300 x 300',
        },
        {
          key: '400',
          text: '400 x 400',
        },
        {
          key: '500',
          text: '500 x 500',
        },
        {
          key: '600',
          text: '600 x 600',
        },
      ],
    },
    {
      key: 'bgColor',
      name: '背景颜色',
      type: 'Color',
    },
    {
      key: 'padding',
      name: '填充间距',
      type: 'Number',
    },
    {
      key: 'radius',
      name: '背景圆角',
      type: 'Number',
    },
    {
      key: 'link',
      name: '链接地址',
      type: 'Text',
    },
    {
      key: 'textTip',
      name: ' 文字提示',
      type: 'Text',
    },
    {
      key: 'textTipPosition',
      name: '文字提示方向',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左',
        },
        {
          key: 'right',
          text: '右',
        },
        {
          key: 'top',
          text: '上',
        },
        {
          key: 'bottom',
          text: '下',
        },
      ],
    },
  ],
  config: {
    text: '我是文本',
    color: 'rgba(60,60,60,1)',
    fontSize: 18,
    fontWeight: '400',
    align: 'center',
    lineHeight: 2,
    bgColor: 'rgba(255,255,255,0)',
    padding: 0,
    radius: 0,
    link: '',
    textTip: '',
    textTipPosition: 'bottom'
  },
};
export default Text;
