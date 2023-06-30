import dayjsLib from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/ko';

dayjsLib.extend(localizedFormat);
dayjsLib.extend(relativeTime);

export const dayjs = dayjsLib;
