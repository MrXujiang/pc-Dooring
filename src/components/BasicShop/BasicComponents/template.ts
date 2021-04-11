import Carousel from './Carousel/template';
import Footer from './Footer/template';
import Form from './Form/template';
import Header from './Header/template';
import Icon from './Icon/template';
import Image from './Image/template';
import List from './List/template';
import LongText from './LongText/template';
import Notice from './Notice/template';
import Card from './Card/template';
import Qrcode from './Qrcode/template';
import Tab from './Tab/template';
import Text from './Text/template';
import XButton from './XButton/template';
import WhiteTpl from './WhiteTpl/template';
import Search from './Search/template';
import Divider from './Divider/template';

const basicTemplate = [
  Carousel,
  Form,
  Header,
  Footer,
  Icon,
  Image,
  WhiteTpl,
  List,
  LongText,
  Notice,
  Card,
  Qrcode,
  Tab,
  Text,
  Search,
  XButton,
  Divider
];
const BasicTemplate = basicTemplate.map(v => {
  return { ...v, category: 'base' };
});

export default BasicTemplate;
