import React, {memo} from 'react';
import {OrgSettingsLayout} from '^clients/private/orgs/settings/OrgSettingsLayout';
import {SelectDropdown} from '^v3/share/Select';

export const OrgSettingsInformationPage = memo(function OrgSettingsInformationPage() {
    return (
        <OrgSettingsLayout>
            <OrgSettingsListItem
                title={'기본'}
                buttonAction={() => null}
                listItems={[
                    {title: '워크스페이스명', desc: '규리의 워크스페이스'},
                    {title: '주소', desc: <span className={'text-gray-400'}>주소를 등록해주세요</span>},
                    {title: '멤버', desc: '0명'},
                ]}
            />
            <OrgSettingsListItem
                title={'결제'}
                buttonAction={() => null}
                listItems={[
                    {title: '구독중인 플랜', desc: 'scordi 무료 체험'},
                    {title: '다음 결제일', desc: '-'},
                ]}
            />
            <OrgSettingsListItem
                title={'관리'}
                buttonAction={() => null}
                listItems={[
                    {title: '서비스 관리자', desc: '김규리'},
                    {title: '결제 관리자', desc: '-'},
                ]}
            />
            <div className={'pt-4 pb-12'}>
                <div className={'flex justify-start my-4'}>
                    <div className={'font-bold'}>워크스페이스 설정</div>
                </div>
                <div className={'flex justify-start items-center my-4'}>
                    <div className={'font-bold text-gray-600 w-40'}>언어 설정</div>
                    <SelectDropdown
                        placeholder="언어를 선택해주세요."
                        options={[{value: 'kr', text: '한국어', selected: true}]}
                        onChange={() => null}
                    />
                </div>
                <div className={'flex justify-start items-center my-4'}>
                    <div className={'font-bold text-gray-600 w-40'}>통화 설정</div>
                    <SelectDropdown
                        placeholder="언어를 선택해주세요."
                        options={[{value: 'won', text: '원화', selected: true}]}
                        onChange={() => null}
                    />
                </div>
            </div>
        </OrgSettingsLayout>
    );
});

interface OrgSettingsListItemProps {
    title: string;
    buttonAction: () => void;
    listItems: {title: string; desc: string | any}[];
}

const OrgSettingsListItem = memo(function (props: OrgSettingsListItemProps) {
    return (
        <div className={'pt-4 pb-12'}>
            <div className={'flex justify-between items-center'}>
                <div className={'font-bold'}>{props.title}</div>
                <div className={'text-blue-500 cursor-pointer'} onClick={props.buttonAction}>
                    변경
                </div>
            </div>
            {props.listItems.map((item) => (
                <div className={'flex justify-start items-center my-4'}>
                    <div className={'font-bold text-gray-500 w-40'}>{item.title}</div>
                    <div>{item.desc}</div>
                </div>
            ))}
        </div>
    );
});
