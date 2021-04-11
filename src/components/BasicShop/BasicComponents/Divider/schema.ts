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

export type TOrientationSelectKeyType = 'left' | 'right' | 'center';

export type TTypeSelectKeyType = 'horizontal' | 'vertical';

export type TTextEditData = Array<
  ITextConfigType | 
  IColorConfigType | 
  ISelectConfigType<TDashedSelectKeyType> |
  ISelectConfigType<TOrientationSelectKeyType> |
  ISelectConfigType<TTypeSelectKeyType>
>;

export type TDashedSelectKeyType = 0 | 1;

export interface ITextConfig {
  text: TTextDefaultType;
  color: TColorDefaultType;
  dashed: TSelectDefaultType<TDashedSelectKeyType>;
  orientation: TSelectDefaultType<TOrientationSelectKeyType>;
  type: TSelectDefaultType<TTypeSelectKeyType>;
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
      key: 'dashed',
      name: '是否虚线',
      type: 'Select',
      range: [
        {
          key: 0,
          text: '否',
        },
        {
          key: 1,
          text: '是',
        }
      ],
    },
    {
      key: 'orientation',
      name: '分割线标题位置',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左',
        },
        {
          key: 'center',
          text: '中',
        },
        {
          key: 'right',
          text: '右',
        },
      ],
    },
    {
      key: 'type',
      name: '分割线方向',
      type: 'Select',
      range: [
        {
          key: 'horizontal',
          text: '水平',
        },
        {
          key: 'vertical',
          text: '垂直',
        }
      ],
    },
  ],
  config: {
    text: '',
    color: 'rgba(60,60,60,1)',
    dashed: 0,
    orientation: 'center',
    type: 'horizontal'
  },
};
export default Text;
