import React, {memo, useEffect} from 'react';
import {StepContentProps} from '^components/util/funnel';
import {CheckCircle} from '^components/react-icons/check-circle';
import {Container} from '^v3/share/OnboardingFlow/Container';
import {FaArrowRight} from 'react-icons/fa6';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';

interface Props extends StepContentProps {
    // onNext: () => any;
}

export const FinishStep = memo(function FinishStep(props: Props) {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload: reloadCurrentOrg} = useCurrentOrg(orgId);
    const {onNext} = props;

    useEffect(() => {
        reloadCurrentOrg();
    }, []);

    return (
        <div data-step="Finish" className="h-full flex flex-col justify-start gap-7">
            <Container size="sm" className="flex justify-center mb-4">
                <CheckCircle className="w-[60px]" color="#5E5FEE" />
            </Container>

            <Container size="lg" className="mb-4">
                <div className="text-center">
                    <h3 className="font-bold text-3xl mb-4">SaaS 관리 준비가 끝났어요!</h3>
                    <p className="text-16 text-gray-500">
                        누가 어떤 서비스를 쓰고, 언제 / 어디서 / 얼마가 사용되는지 <br /> 한 눈에 관리해요.
                    </p>
                </div>
            </Container>

            <Container size="sm">
                <button
                    className="btn btn-lg btn-block btn-scordi-light-200 !text-scordi !hover:text-scordi-700 rounded-box gap-2"
                    onClick={() => onNext()}
                >
                    <span>스코디로 관리 시작하기</span>
                    <FaArrowRight />
                </button>
            </Container>
        </div>
    );
});
