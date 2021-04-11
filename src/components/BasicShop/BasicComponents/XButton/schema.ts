import {
  IColorConfigType,
  INumberConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TTextDefaultType,
  IInteractionConfigType,
  TInteractionDefaultType
} from '@/components/PanelComponents/FormEditor/types';

export type TButtonEditData = Array<
  ITextConfigType | IColorConfigType | INumberConfigType | IInteractionConfigType
>;

export interface IButtonConfig {
  round: TNumberDefaultType;
  text: TTextDefaultType;
  bgColor: TColorDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  width: TNumberDefaultType;
  marginTop: TNumberDefaultType;
  interaction: TInteractionDefaultType;
}

export interface IButtonSchema {
  editData: TButtonEditData;
  config: IButtonConfig;
}
const Button: IButtonSchema = {
  editData: [
    {
      "key": "bgColor",
      "name": "背景色",
      "type": "Color"
    },
    {
      "key": "width",
      "name": "宽度",
      "type": "Number"
    },
    {
      "key": "marginTop",
      "name": "上边距",
      "type": "Number"
    },
    {
      "key": "round",
      "name": "圆角",
      "type": "Number"
    },
    {
      "key": "text",
      "name": "按钮文字",
      "type": "Text"
    },
    {
      "key": "color",
      "name": "文字颜色",
      "type": "Color"
    },
    {
      "key": "fontSize",
      "name": "文字大小",
      "type": "Number"
    },
    {
      "key": "interaction",
      "name": "交互",
      "type": "InteractionData"
    }
  ],
  config: {
    "bgColor": "rgba(22,40,212,1)",
      "width": 190,
      "marginTop": 0,
      "round": 16,
      "text": "按钮",
      "fontSize": 15,
      "color": "rgba(255,255,255,1)",
      "interaction": {
        type: "link",
        title: "",
        content: ""
      }
  },
};
export default Button;
