import {UseFormReturn} from 'react-hook-form';
import {CreateParserDto} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateParserDto';
import {ContentForm, ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';
import React from 'react';

interface CreateCodefParserFormProps {
    form: UseFormReturn<CreateParserDto>;
}

export const CodefParserForm = (props: CreateCodefParserFormProps) => {
    const {form} = props;

    return (
        <div>
            {/*<div>1</div>*/}

            <ContentForm
                onSubmit={(e) => {
                    console.log('event', event);
                    console.log('e', e);
                    return false;
                }}
            >
                <ContentPanel title="[1단계] 파서의 제목을 입력합니다.">
                    <ContentPanelList>
                        <ContentPanelInput
                            title="서비스 영문 이름으로 입력해주세요"
                            required={true}
                            text="파스칼케이스 : 띄어쓰기 등 공백없이 + 어절 단위로 대문자 형식"
                        >
                            <TextInput
                                required={true}
                                placeholder="ex. AmazonWebService"
                                {...form.register('serviceName', {required: true})}
                            />
                        </ContentPanelInput>
                    </ContentPanelList>
                </ContentPanel>

                <ContentPanel title="[2단계] 파서와 연결할 SaaS Product 를 설정합니다.">
                    <ContentPanelList>
                        <ContentPanelInput
                            title="서비스 영문 이름으로 입력해주세요"
                            required={true}
                            text="파스칼케이스 : 띄어쓰기 등 공백없이 + 어절 단위로 대문자 형식"
                        >
                            <TextInput
                                required={true}
                                placeholder="ex. AmazonWebService"
                                {...form.register('serviceName', {required: true})}
                            />
                        </ContentPanelInput>
                    </ContentPanelList>
                </ContentPanel>
            </ContentForm>
        </div>
    );
};
