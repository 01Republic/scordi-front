import {memo} from 'react';
import {V3MainLayout, V3MainLayoutContainer, V3MainLayoutProps} from '../V3MainLayout';

interface V3ListPageLayoutProps extends V3MainLayoutProps {
    // // 페이지 상단의 제목
    // title?: ReactNodeLike;
}

export const V3ListPageLayout = memo((props: V3ListPageLayoutProps) => {
    const {children, ...layoutProps} = props;

    return (
        <V3MainLayout {...layoutProps}>
            <V3MainLayoutContainer>{children}</V3MainLayoutContainer>
        </V3MainLayout>
    );
});
V3ListPageLayout.displayName = 'V3ListPageLayout';
