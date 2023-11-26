import React, {memo} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {subscriptionsForCurrentOrgState} from '^v3/V3OrgAppsPage/atom';

export const SubscriptionListPageTitle = memo(function SubscriptionListPageTitle() {
    // const currentOrg = useRecoilValue(currentOrgAtom);
    const subscriptions = useRecoilValue(subscriptionsForCurrentOrgState);

    return (
        <section className="mb-6 flex justify-between flex-col md:flex-row">
            <h1>
                {/*<span className="block">*/}
                {/*    <span className="text-scordi">{currentOrg?.name}</span> 팀,*/}
                {/*</span>*/}
                <span className="block">
                    <span className="text-scordi">{subscriptions.length}개</span>의 서비스를 쓰고 있어요
                </span>
            </h1>

            <div>
                <div className="dropdown dropdown-end w-full md:w-auto">
                    <label
                        tabIndex={0}
                        className="btn btn-scordi m-1 gap-2 whitespace-nowrap flex-nowrap mt-8 md:mt-0 btn-lg md:btn-md w-full md:w-auto"
                    >
                        <span>서비스 등록</span>
                        <FaPlus />
                    </label>

                    {/*
                     음,, 드롭다운 보다는 right-modal 이 열려서
                     모바일 버전 /apps/new 랑 같은 UI 를 랜더링 하면 좋을 것 같은데...
                     1. 컴포넌트 재활용
                     2. 연동 플로우를 자연스럽게 재활용
                     3. 연동 과정을 모달 안에서 세세하게 인터렉션 하기 좋음.
                    */}
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
                        <li>
                            <a>워크스페이스 연동하기</a>
                        </li>
                        <li>
                            <a>결제 수신 계정으로 연동하기</a>
                        </li>
                        <li>
                            <a>직접 입력하기</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
});
