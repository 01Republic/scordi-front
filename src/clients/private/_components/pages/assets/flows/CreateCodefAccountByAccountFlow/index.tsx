import {memo} from 'react';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {NewCardAccountStep} from '^_components/pages/assets/flows/CreateCodefAccountByAccountFlow/NewCardAccountStep';

interface CreateCodefAccountByAccountFlowProps {
    company: CardAccountsStaticData;
    onBack: () => any;
    onFinish: (createdAccountId: number) => any;
}

/**
 * 홈페이지계정 등록 플로우
 * ---
 * - 계정등록 진행
 * - 완료되면 등록된 계정을 콜백으로 반환
 */
export const CreateCodefAccountByAccountFlow = memo((props: CreateCodefAccountByAccountFlowProps) => {
    const {company, onBack, onFinish} = props;

    return (
        <>
            {/* 계정 유무 확인 및 로그인 페이지 */}
            <NewCardAccountStep
                company={company}
                onBack={onBack}
                onNext={(codefAccountIds) => {
                    onFinish(codefAccountIds[0]);
                }}
            />

            {/* 계정 등록 진행중 페이지 */}
            {/*<div>계정 등록 진행중 페이지</div>*/}
        </>
    );
});
CreateCodefAccountByAccountFlow.displayName = 'CreateCodefAccountByAccountFlow';
