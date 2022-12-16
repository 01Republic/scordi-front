import {NextPage} from 'next';
import {ComponentType, ReactElement, ReactNode} from 'react';
import {AppProps} from 'next/app';

export type Page<P = {}> = NextPage<P> & {
    // You can disable whichever you don't need
    getLayout?: (page: ReactElement) => ReactNode;
    getMobileLayout?: (page: ReactElement) => ReactNode;
    layout?: ComponentType;
};

export type Props = AppProps & {
    Component: Page;
};

/**
 * 페이지 컴포넌트의 파일은 다음 세 가지를 반드시 구성해야 합니다.
 * 1. PageRoute 객체 (export)
 * 2. Page 컴포넌트 (export default)
 * 3. 레이아웃 (Page.getLayout = LayoutFunction)
 */
