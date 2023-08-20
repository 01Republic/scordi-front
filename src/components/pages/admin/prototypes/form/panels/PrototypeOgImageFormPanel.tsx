import React, {memo, useEffect, useState} from 'react';
import {ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';
import {ProfileImageFileInput} from '^components/ProfileImageFileInput';
import {
    ApplicationPrototypeDto,
    CreateApplicationPrototypeRequestDto as CreateDto,
    UpdateApplicationPrototypeRequestDto as UpdateDto,
} from '^types/applicationPrototype.type';
import {UseFormReturn} from 'react-hook-form';
import {getOgImageUrl} from '^api/utils.api/open-graph.api';

interface OgImageFormPanelProps {
    proto: ApplicationPrototypeDto | null;
    form: UseFormReturn<CreateDto> | UseFormReturn<UpdateDto>;
}

export const OgImageFormPanel = memo((props: OgImageFormPanelProps) => {
    const {proto, form} = props;
    const [result, setResult] = useState('');

    useEffect(() => {
        form.setValue('ogImageUrl', proto?.ogImageUrl ?? undefined);
    }, [proto]);

    return (
        <ContentPanel title="공유 썸네일 이미지">
            <ContentPanelList>
                <ContentPanelInput
                    title="<도구> 공유 썸네일 이미지 ( Open Graph Image ) 추출기"
                    text="웹사이트 주소를 넣으면 OpenGraph Image URL 을 추출해줍니다."
                >
                    <input
                        type="text"
                        className="input input-sm input-bordered w-full"
                        onChange={(e) => {
                            const url = e.target.value;
                            getOgImageUrl(url).then((url) => setResult(url));
                        }}
                    />
                    <div className="pt-3">
                        <p className="text-sm mb-2">Result:</p>
                        {result && (
                            <div className="flex gap-4 items-end">
                                <img src={result} className="w-24 border rounded" />
                                <button
                                    type="button"
                                    className="btn btn-sm btn-accent text-white"
                                    onClick={() => form.setValue('ogImageUrl', result)}
                                >
                                    아래 입력란에 적용
                                </button>
                            </div>
                        )}
                    </div>
                </ContentPanelInput>

                <ContentPanelInput title="Og image (URL)" text="로고가 URL 이라면 여기로 입력해주세요.">
                    <TextInput placeholder="ex. https://www.github.com/favicon.ico" {...form.register('ogImageUrl')} />
                </ContentPanelInput>

                {/*<ContentPanelInput title="Og image (File)" text="로고가 파일이라면 여기로 업로드 해주세요.">*/}
                {/*    <ProfileImageFileInput*/}
                {/*        imageUrl={ogImageUrl}*/}
                {/*        fallbackLetter={initial}*/}
                {/*        {...form.register('ogImageFile')}*/}
                {/*        onChange={(e) => {*/}
                {/*            const uploadedFiles = e.target.files as FileList;*/}
                {/*            form.setValue('ogImageFile', uploadedFiles[0]);*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</ContentPanelInput>*/}
            </ContentPanelList>
        </ContentPanel>
    );
});
