import React, {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';
import {UpdateCodefBankAccountParserRequestDto} from '^models/_codef/CodefBankAccountParser/type';

interface SetParserNamePanelProps {
    readOnly?: boolean;
}

export const SetParserNamePanel = memo((props: SetParserNamePanelProps) => {
    const {readOnly = false} = props;
    const {register} = useFormContext<UpdateCodefBankAccountParserRequestDto>();

    return (
        <ContentPanel title="[1단계] 파서의 이름을 입력합니다." stickyHeader>
            <ContentPanelList>
                <ContentPanelInput
                    title="파서의 이름을 입력해주세요"
                    required={true}
                    text="서비스 영문명과 일치하면 좋습니다."
                >
                    <TextInput
                        required
                        minLength={3}
                        placeholder="ex. AmazonWebService"
                        {...register('title')}
                        readOnly={readOnly}
                    />

                    {/*<div className="pt-1">*/}
                    {/*    {formState.errors.title && (*/}
                    {/*        <p className="text-11 text-red-400">{formState.errors.title.message}</p>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </ContentPanelInput>

                <ContentPanelInput title="비고" text="이 버전에 대한 메모사항이 있다면 기록." className={''}>
                    <textarea
                        rows={2}
                        {...register('memo')}
                        readOnly={readOnly}
                        className="textarea textarea-bordered w-full bg-slate-50"
                    />
                </ContentPanelInput>
            </ContentPanelList>
        </ContentPanel>
    );
});
SetParserNamePanel.displayName = 'SetParserNamePanel';
