import {memo} from 'react';

// Q: https://stackoverflow.com/questions/57477395/typescript-generic-class-equivalent-for-react-memo
// A: https://stackoverflow.com/a/70890101
export const genericMemo: <T>(component: T) => T = memo;
