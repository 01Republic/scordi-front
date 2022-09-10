import { FC, SVGProps } from 'react';
import ArrowLeft from '../../public/home/icons/icon-arrow-left.svg';
import ArrowRight from '../../public/home/icons//icon-arrow-right.svg';
import BellOff from '../../public/home/icons//icon-bell-off.svg';
import Bell from '../../public/home/icons//icon-bell.svg';
import Bookmark from '../../public/home/icons//icon-bookmark.svg';
import Calendar from '../../public/home/icons//icon-calendar.svg';
import ChevronDown from '../../public/home/icons//icon-chevron-down.svg';
import ChevronLeft from '../../public/home/icons//icon-chevron-left.svg';
import ChevronRight from '../../public/home/icons//icon-chevron-right.svg';
import ChevronUp from '../../public/home/icons//icon-chevron-up.svg';
import Clock from '../../public/home/icons//icon-clock.svg';
import CreditCard from '../../public/home/icons//icon-credit-card.svg';
import Download from '../../public/home/icons//icon-download.svg';
import ExternalLink from '../../public/home/icons//icon-external-link.svg';
import EyeOff from '../../public/home/icons//icon-eye-off.svg';
import Eye from '../../public/home/icons//icon-eye.svg';
import FileUpload from '../../public/home/icons//icon-file-upload.svg';
import File from '../../public/home/icons//icon-file.svg';
import Folder from '../../public/home/icons//icon-folder.svg';
import Heart from '../../public/home/icons//icon-heart.svg';
import Home from '../../public/home/icons//icon-home.svg';
import Instagram from '../../public/home/icons//icon-instagram.svg';
import Link from '../../public/home/icons//icon-link.svg';
import Mail from '../../public/home/icons//icon-mail.svg';
import MapPin from '../../public/home/icons//icon-map-pin.svg';
import Map from '../../public/home/icons//icon-map.svg';
import Menu from '../../public/home/icons//icon-menu.svg';
import Minus from '../../public/home/icons//icon-minus.svg';
import MoreHorizontal from '../../public/home/icons//icon-more-horizontal.svg';
import MoreVertical from '../../public/home/icons//icon-more-vertical.svg';
import Phone from '../../public/home/icons//icon-phone.svg';
import Plus from '../../public/home/icons//icon-plus.svg';
import RefreshCCW from '../../public/home/icons//icon-refresh-ccw.svg';
import Search from '../../public/home/icons//icon-search.svg';
import Send from '../../public/home/icons//icon-send.svg';
import Settings from '../../public/home/icons//icon-settings.svg';
import Share from '../../public/home/icons//icon-share.svg';
import ShoppingCart from '../../public/home/icons//icon-shopping-cart.svg';
import Star from '../../public/home/icons//icon-star.svg';
import Tick from '../../public/home/icons//icon-tick.svg';
import Trash from '../../public/home/icons//icon-trash.svg';
import Upload from '../../public/home/icons//icon-upload.svg';
import User from '../../public/home/icons//icon-user.svg';
import X from '../../public/home/icons//icon-x.svg';
import Youtube from '../../public/home/icons//icon-youtube.svg';

function withStroke<T extends SVGProps<SVGSVGElement>>(
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
): FC<T> {
  return ({ className = '', ...props }) => (
    <Icon className={`stroke-current ${className}`} {...(props as T)} />
  );
}

export const Icon = {
  FileUpload: withStroke(FileUpload),
  ArrowLeft: withStroke(ArrowLeft),
  ArrowRight: withStroke(ArrowRight),
  BellOff: withStroke(BellOff),
  Bell: withStroke(Bell),
  Bookmark: withStroke(Bookmark),
  Calendar: withStroke(Calendar),
  ChevronDown: withStroke(ChevronDown),
  ChevronLeft: withStroke(ChevronLeft),
  ChevronRight: withStroke(ChevronRight),
  ChevronUp: withStroke(ChevronUp),
  Clock: withStroke(Clock),
  CreditCard: withStroke(CreditCard),
  Download: withStroke(Download),
  ExternalLink: withStroke(ExternalLink),
  EyeOff: withStroke(EyeOff),
  Eye: withStroke(Eye),
  File: withStroke(File),
  Folder: withStroke(Folder),
  Heart: withStroke(Heart),
  Home: withStroke(Home),
  Instagram: withStroke(Instagram),
  Link: withStroke(Link),
  Mail: withStroke(Mail),
  MapPin: withStroke(MapPin),
  Map: withStroke(Map),
  Menu: withStroke(Menu),
  Minus: withStroke(Minus),
  MoreHorizontal: withStroke(MoreHorizontal),
  MoreVertical: withStroke(MoreVertical),
  Phone: withStroke(Phone),
  Plus: withStroke(Plus),
  RefreshCCW: withStroke(RefreshCCW),
  Search: withStroke(Search),
  Send: withStroke(Send),
  Settings: withStroke(Settings),
  Share: withStroke(Share),
  ShoppingCart: withStroke(ShoppingCart),
  Star: withStroke(Star),
  Tick: withStroke(Tick),
  Trash: withStroke(Trash),
  Upload: withStroke(Upload),
  User: withStroke(User),
  X: withStroke(X),
  Youtube: withStroke(Youtube),
};
