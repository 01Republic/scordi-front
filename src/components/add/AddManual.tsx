import {AppIconButton} from '^components/AppIconButton';
import {TextInput} from '^components/TextInput';
import {DefaultButton} from '^components/Button';
import {AddCompletePageRoute} from '^pages/apps/add/complete';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {Icon} from '^components/Icon';
import {MobileViewContainer} from '^components/MobileTopNav';

type AddManualProps = {
    appInfo: ApplicationPrototypeDto;
};

export const AddManual = (props: AddManualProps) => {
    const router = useRouter();
    const [isFailed, setIsFailed] = useState(false);

    return (
        <MobileViewContainer>
            {isFailed ? (
                <>
                    <h2>연동이 실패되었어요</h2>
                    <p className={'mt-[20px] text-[#6D7684]'}>인보이스를 다시 확인해 주세요.</p>
                </>
            ) : (
                <>
                    <h2>서비스 연동하기</h2>
                    <p className={'mt-[20px] text-[#6D7684]'}>
                        자동연동을 준비중인 서비스 입니다.
                        <br />
                        인보이스 업로드를 통해 서비스를 확인합니다.
                        <br />
                        서비스로부터 이메일 등으로 고지받은 인보이스를 직접 업로드 합니다.
                    </p>
                </>
            )}

            <div className={'py-[30px] text-center'}>
                <AppIconButton name={props.appInfo.name} icon={props.appInfo.image} />
            </div>

            <div className={'bg-[#F0EFFF] py-[40px] rounded-xl mb-16 text-center'}>
                <div className={'flex justify-center mb-2'}>
                    <Icon.Upload />
                </div>
                <p>
                    이메일로 전달받은 결제 청구서를
                    <br />
                    업로드해주세요.
                </p>
            </div>

            {isFailed ? (
                <>
                    <DefaultButton text={'다시 연동하기'} onClick={() => null} />
                    <DefaultButton text={'다른 서비스 연동하기'} onClick={() => null} />
                </>
            ) : (
                <DefaultButton text={'연동 시작하기'} onClick={() => router.push(AddCompletePageRoute.pathname)} />
            )}
        </MobileViewContainer>
    );
};
