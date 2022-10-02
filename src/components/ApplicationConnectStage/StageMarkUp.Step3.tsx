import React, { useState } from 'react';
import { StageFormProps, StageMarkUp } from './StageMarkUp';
import { ModalActionButton, ModalActionWrapper } from '^components/Modal';
import { OrgResponseDataDto } from '^components/ApplicationConnectStage/dto/OrgResponseData.dto';
import { Radio } from '^components/Radio';
import { Step4Data } from '^components/ApplicationConnectStage/StageMarkUp.Step4';

export type Step3Data = {
  email: string;
  password: string;
  verificationCode?: string;
  orgDataList: OrgResponseDataDto[];
}

/**
 * step3. 조직 선택
 * ---
 * 1. 앞 단게에서 사용자로부터 로그인 계정과 조직목록을 전달받습니다.
 * 2. 전달받은 조직목록을 보여줍니다.
 * 3. 그 중 하나를 선택하고 다음 버튼을 클릭하여 step4에 정보를 넘깁니다.
 *    (다음 단계에서 정보 크롤링을 모두 실행하게 됩니다)
 */
export const StageMarkUpStep3: StageMarkUp = {
  title: (name) => `${name} 계정 연결하기.`,
  description: '로그인 정보는 암호화 되어 전송되며, 보관하지 않습니다.',
  StageForm: (props: StageFormProps<Step3Data>) => {
    const { api, title = '', description = '', next, data } = props;
    const [selectedOrgName, setSelectedOrgName] = useState('');

    const radioOnClickHandler = (e: any) => setSelectedOrgName(e.target.value);

    const onSubmitHandler = () => {
      const { email, password, verificationCode, orgDataList } = data;
      const selectedOrg = orgDataList.find((org) => org.name === selectedOrgName)!;
      // console.log('to sign', { email, password, verificationCode });
      // console.log(selectedOrg);
      next<Step4Data>({
        email,
        password,
        verificationCode,
        selectedOrg,
      });
    };

    return (
      <>
        <div>
          <h3 className='font-bold text-lg'>조직 선택하기</h3>
          <p className='py-4'>입력한 계정으로 관리할 수 있는 조직들입니다.<br/>연동할 조직을 선택해주세요.</p>

          <div className="mb-2">
            {data.orgDataList.map((org, i) => (
              <Radio
                key={i}
                name="selectOrg"
                value={org.name}
                onClick={radioOnClickHandler}
                wrapperClassName="p-3 mb-2 flex rounded-box shadow border"
              >
                <p className="text-sm cursor-pointer">{org.name}</p>
              </Radio>
            ))}
          </div>

          <ModalActionWrapper>
            <ModalActionButton
              text={`${selectedOrgName ? `'${selectedOrgName}' ` : ''}연동하기`}
              className="btn-secondary btn-block"
              disabled={!selectedOrgName} onClick={onSubmitHandler}
            />
          </ModalActionWrapper>
        </div>
      </>
    )
  },
}
