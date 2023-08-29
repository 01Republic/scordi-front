import React, {memo, useEffect} from 'react';
import {ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';
import {ProfileImageFileInput} from '^components/ProfileImageFileInput';
import {
    ProductDto,
    CreateProductRequestDto as CreateDto,
    UpdateProductRequestDto as UpdateDto,
} from '^types/product.type';
import {UseFormReturn} from 'react-hook-form';
import {getOgImageUrl} from '^api/utils.api/open-graph.api';
import {atom, useRecoilState} from 'recoil';

export const ogImgUrlAtom = atom({
    key: 'ogImgUrlAtom',
    default: '',
});

interface OgImageFormPanelProps {
    proto: ProductDto | null;
    form: UseFormReturn<CreateDto> | UseFormReturn<UpdateDto>;
}

export const OgImageFormPanel = memo((props: OgImageFormPanelProps) => {
    const {proto, form} = props;
    const [result, setResult] = useRecoilState(ogImgUrlAtom);

    useEffect(() => {
        const ogImageUrl = proto?.ogImageUrl ?? undefined;
        form.setValue('ogImageUrl', ogImageUrl);
        if (ogImageUrl) setResult(ogImageUrl);
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
                                <img src={result} className="w-48 border rounded" />
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
