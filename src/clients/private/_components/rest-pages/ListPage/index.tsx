import React, {memo, ReactNode, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {ReactComponentLike} from 'prop-types';
import {orgIdParamState} from '^atoms/common';
import {WithChildren} from '^types/global.type';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb, BreadcrumbPath} from '^clients/private/_layouts/_shared/Breadcrumb';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';

interface ListPageProps extends WithChildren {
    onReady?: () => any;
    onUnmount?: () => any;
    breadcrumb?: BreadcrumbPath[];
    titleText?: ReactNode;
    Title?: ReactComponentLike;
    Buttons?: ReactComponentLike;
    ScopeHandler?: ReactComponentLike;
    onSearch?: (keyword?: string) => any;
    searchInputPlaceholder?: string;
}

export const ListPage = memo((props: ListPageProps) => {
    const {
        onReady,
        onUnmount,
        breadcrumb,
        titleText = '목록페이지',
        Title,
        Buttons,
        ScopeHandler,
        onSearch,
        searchInputPlaceholder = '검색어를 입력해주세요',
        children,
    } = props;
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        onReady && onReady();

        return () => {
            onUnmount && onUnmount();
        };
    }, [orgId, router.isReady]);

    return (
        <MainLayout>
            <MainContainer>
                {breadcrumb && <Breadcrumb paths={breadcrumb} />}

                <div className="flex items-center justify-between mb-8">
                    {Title ? <Title /> : <h1 className="text-2xl">{titleText}</h1>}

                    <div className={'flex space-x-4'}>
                        {onSearch && <ListPageSearchInput onSearch={onSearch} placeholder={searchInputPlaceholder} />}
                        {Buttons && <Buttons />}
                    </div>
                </div>

                <div className={'mb-8'}>{ScopeHandler && <ScopeHandler />}</div>

                {children}
            </MainContainer>
        </MainLayout>
    );
});
ListPage.displayName = 'ListPage';
