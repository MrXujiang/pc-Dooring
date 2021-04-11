import { useEffect, useState, useLayoutEffect, RefObject } from 'react';
import { RGBColor } from 'react-color';

// 生成uuid
function uuid(len: number, radix: number) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

// 将rgba字符串对象转化为rgba对象
function rgba2Obj(rgba = '') {
  let reg = /rgba\((\d+),(\d+),(\d+),(\d+)\)/g;
  let rgbaObj: RGBColor = { r: 0, g: 0, b: 0, a: 0 };

  rgba.replace(reg, (_m, r, g, b, a) => {
    rgbaObj = { r, g, b, a };
    return rgba;
  });
  return rgbaObj;
}

export { uuid, rgba2Obj };

export function useGetRect() {
  const [rect, setRect] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setRect({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  return rect;
}

export function useGetScrollBarWidth(ref: RefObject<HTMLElement>) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (ref.current) {
      const diff = ref.current.offsetWidth - ref.current.clientWidth;
      setWidth(diff);
    }
  }, [ref]);
  return width;
}

export function useAnimation(state: boolean, delay: number) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    let timer: number;
    if (state && display === true) {
      setDisplay(false);
    } else if (!state && display === false) {
      timer = window.setTimeout(() => {
        setDisplay(true);
      }, delay);
    }
    return () => {
      window.clearTimeout(timer);
    };
  }, [delay, display, state]);
  return [display, setDisplay];
}

export function unParams(params = '?a=1&b=2&c=3') {
  let obj:any = {}
  params && params.replace(/((\w*)=([\.a-z0-9A-Z]*)?)?/g, (m,a,b,c):any => {
    if(b || c) obj[b] = c
  })
  return obj
}

export function throttle(fn: Function, delay: number) {
  let flag = true;
  return (...args: any) => {
    if (flag) {
      flag = false;
      fn(...args);
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}

export function formatTime(fmt:string, dateObj:any) {
  const date = dateObj || new Date();
  const o:any = { 
    "M+" : date.getMonth()+1,                 //月份 
    "d+" : date.getDate(),                    //日 
    "h+" : date.getHours(),                   //小时 
    "m+" : date.getMinutes(),                 //分 
    "s+" : date.getSeconds(),                 //秒 
    "q+" : Math.floor((date.getMonth()+3)/3), //季度 
    "S"  : date.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
  return fmt; 
}

export const isDev = process.env.NODE_ENV === 'development';

export const serverUrl = isDev ? 'http://localhost:3000' : 'http://h5.dooring.cn';