import React, {memo} from 'react';
import {V3MainLayout, V3MainLayoutContainer} from '^v3//layouts/V3MainLayout';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';

export const V3OrgHomePage = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);

    console.log('currentOrg', currentOrg);

    return (
        <V3MainLayout>
            {!currentOrg ? (
                <></>
            ) : (
                <V3MainLayoutContainer>
                    <section className={`${styles.greeting} flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                            <img src="/images/v3/home-calendar.png" width={80} />
                            <h1 className="max-w-[24rem]" style={{wordBreak: 'keep-all'}}>
                                {currentOrg.name} 팀의 흩어진{' '}
                                <span className="whitespace-nowrap">결제내역을 확인 해보세요!</span>
                            </h1>
                        </div>

                        <div>
                            <button className="btn btn-lg btn-scordi-500 shadow gap-2">
                                <span>청구메일 추가</span>
                                <span>📩</span>
                            </button>
                        </div>
                    </section>
                </V3MainLayoutContainer>
            )}
        </V3MainLayout>
    );
});
