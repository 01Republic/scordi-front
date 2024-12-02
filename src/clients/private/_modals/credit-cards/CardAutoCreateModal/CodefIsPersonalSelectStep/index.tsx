import React, {memo} from 'react';
import {FaChevronLeft} from 'react-icons/fa6';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';

interface CodefIsPersonalSelectStepProps {
    defaultValue: CodefCustomerType;
    onBack: () => any;
    onChange: (codefClientType: CodefCustomerType) => any;
}

export const CodefIsPersonalSelectStep = memo((props: CodefIsPersonalSelectStepProps) => {
    const {onBack, defaultValue, onChange} = props;

    return (
        <div className="h-full">
            <div>
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onBack} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">새로운 카드 등록하기</p>
                <h3 className="font-bold text-xl leading-tight mb-3">어떤 사업자 형태이신가요?</h3>
                <p className="text-14 text-gray-500">
                    개인사업자의 경우 금융사마다 정의가 달라요. <br /> 두 항목 모두 시도해보세요.
                </p>
            </div>

            <div className="py-12">
                <ButtonGroupRadio
                    defaultValue={defaultValue}
                    onChange={(option) => onChange(option.value)}
                    options={[
                        {label: '개인', value: CodefCustomerType.Personal},
                        {label: '법인', value: CodefCustomerType.Business},
                    ]}
                />
                {/*{CardCompanies.map((cardCompanyData, i) => (*/}
                {/*    <CardCompanyItem*/}
                {/*        key={i}*/}
                {/*        cardCompanyData={cardCompanyData}*/}
                {/*        onClick={() => setCompany(cardCompanyData)}*/}
                {/*    />*/}
                {/*))}*/}
            </div>
        </div>
    );
});
CodefIsPersonalSelectStep.displayName = 'CodefIsPersonalSelectStep';
