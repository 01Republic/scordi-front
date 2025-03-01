import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {FaChevronLeft} from 'react-icons/fa6';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {createBankAccountDtoAtom} from '^v3/share/modals/NewBankAccountModal/atom';

interface InputBankFormDataStepProps {
    bankCompany: BankAccountsStaticData;
    onBack: () => any;
    onSubmit: () => any;
}

export const InputBankFormDataStep = memo((props: InputBankFormDataStepProps) => {
    const {bankCompany, onBack, onSubmit} = props;
    const [formData, setFormData] = useRecoilState(createBankAccountDtoAtom);

    return (
        <div className="flex flex-col items-stretch">
            <div className="mb-4">
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={() => onBack()} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">계좌 직접 추가하기</p>
                <h3 className="font-bold text-xl leading-tight">
                    {bankCompany.displayName}의 <br /> 정보를 입력해주세요.
                </h3>
            </div>

            <div className="py-4 flex flex-col gap-4 items-stretch">
                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">계좌 이름</p>
                        <input
                            type="text"
                            placeholder="계좌 이름을 입력해주세요"
                            className="input border-gray-200 bg-gray-100 text-16 w-full"
                            onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <p className="text-12 text-gray-500 mb-1.5">계좌번호</p>

                        <input
                            type={'number'}
                            placeholder="지금 입력하지 않아도 괜찮아요"
                            className={`input border-gray-200 bg-gray-100 text-16 w-full`}
                            onChange={(e) => setFormData((prev) => ({...prev, number: e.target.value}))}
                        />
                    </label>
                </div>
            </div>

            <div className="py-4">
                <button className="btn btn-scordi btn-block" onClick={onSubmit}>
                    추가하기
                </button>
            </div>
        </div>
    );
});
InputBankFormDataStep.displayName = 'InputBankFormDataStep';
