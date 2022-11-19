import { toast } from 'react-toastify';

export const successNotify = (msg: string) => {
  toast(msg);
};

export const errorNotify = (err: any) => {
  const error = err.response.data;
  const message = error.message as string[] | string;
  Array.isArray(message)
    // ? message.forEach((msg) => toast(msg))
    ? toast(message[0])
    : toast(message);
};
