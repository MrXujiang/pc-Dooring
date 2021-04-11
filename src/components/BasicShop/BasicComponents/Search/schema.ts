import {
  IColorConfigType,
  INumberConfigType,
  ITextConfigType,
  IUploadConfigType,
  IRadioConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TRadioDefaultType,
  TTextDefaultType,
  TUploadDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type ButtonKeyType = 0 | 1;

export type ButtonSizeType = 'large' | 'middle' | 'small';

export type THeaderEditData = Array<
  IColorConfigType | INumberConfigType | IUploadConfigType | ITextConfigType | IRadioConfigType<ButtonKeyType> | IRadioConfigType<ButtonSizeType>
>;
export interface IHeaderConfig {
  placeholder: TTextDefaultType;
  enterButton: TRadioDefaultType<ButtonKeyType>;
  size: TRadioDefaultType<ButtonSizeType>
}

export interface IHeaderSchema {
  editData: THeaderEditData;
  config: IHeaderConfig;
}

const Header: IHeaderSchema = {
  editData: [
    {
      key: 'placeholder',
      name: '搜索提示文字',
      type: 'Text',
    },
    {
      key: 'enterButton',
      name: '按钮样式',
      type: 'Radio',
      range: [
        {
          key: 0,
          text: '默认',
        },
        {
          key: 1,
          text: '高亮',
        }
      ],
    },
    {
      key: 'size',
      name: '搜索框大小',
      type: 'Radio',
      range: [
        {
          key: 'large',
          text: '大',
        },
        {
          key: 'middle',
          text: '中',
        },
        {
          key: 'small',
          text: '小',
        }
      ],
    },
  ],
  config: {
    placeholder: '请输入内容',
    enterButton: 0,
    size: 'middle'
  },
};

export default Header;
