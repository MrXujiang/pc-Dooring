declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.mp3';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}
declare module 'dom-to-image' {
  const domtoimage:any
  export default domtoimage
}

declare var getFaceUrl:any;

