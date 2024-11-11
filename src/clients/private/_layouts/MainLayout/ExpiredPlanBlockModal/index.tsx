import {memo, useEffect, useState} from 'react';
import {OrganizationDto} from '^models/Organization/type';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {useRouter} from 'next/router';

interface ExpiredPlanBlockModalProps {
    currentOrg: OrganizationDto;
}

export const ExpiredPlanBlockModal = memo((props: ExpiredPlanBlockModalProps) => {
    const {currentOrg} = props;
    const router = useRouter();
    const [isOpened, setIsOpened] = useState(false);

    // 이 조직의 현재 구독이 만료된 상태인지를 판단하고, 만약 만료된 상태라면 블락 모달을 활성화 시킵니다.
    const checkExpired = () => {
        console.log('currentOrg', currentOrg);
        // 로직은 아직 구현 해야 함.
        setIsOpened(true);
    };

    useEffect(() => {
        if (!router.isReady) return;
        checkExpired();
    }, [router.isReady]);

    return (
        <AnimatedModal backdrop={{opacity: 0.5}} open={isOpened} onClose={() => 1}>
            <div className="relative mx-auto max-w-screen-lg w-full">
                <div className={'bg-white rounded-3xl p-12'}>
                    <div className="mb-4">
                        <h1>아이엠 미주</h1>
                        <p>미주미주미주미주미주미주미주미주미주미주미주미주미주미주미주미주미주미주미주미주</p>
                        <br />

                        {/*@ts-ignore*/}
                        <marquee>
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5603AQEfOVCFoRezDg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1691737382709?e=2147483647&v=beta&t=re5k63F5ELpowfzdt_4-8Ub0jq8-3RrtU3_Rohef8vw"
                                alt="orange"
                                className="w-[100px] h-[100px] rounded-lg"
                            />
                            <p>일해라 절해라</p>
                            {/*@ts-ignore*/}
                        </marquee>
                    </div>

                    <ul className="list-disc pl-4">
                        <li>
                            이 조직의 현재 구독이 만료된 상태인지를 판단하고, 만약 만료된 상태라면 블락 모달을 활성화
                            시킵니다.
                        </li>
                        <li>로직은 아직 구현 해야 함.</li>
                    </ul>
                </div>
            </div>
        </AnimatedModal>
    );
});
ExpiredPlanBlockModal.displayName = 'ExpiredPlanBlockModal';
