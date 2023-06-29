import dayjsLib from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';

dayjsLib.extend(localizedFormat);

export const dayjs = dayjsLib;
