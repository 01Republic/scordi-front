import React, {memo, useEffect, useState} from 'react';
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
import {fileApi} from '^api/file.api';

export const ogImgUrlDraftAtom = atom({
    key: 'ogImgUrlDraftAtom',
    default: '',
});

export const ogImgUrlAtom = atom({
    key: 'ogImgUrlAtom',
    default: '',
});

interface OgImageFormPanelProps {
    product: ProductDto | null;
    form: UseFormReturn<CreateDto> | UseFormReturn<UpdateDto>;
}

export const OgImageFormPanel = memo((props: OgImageFormPanelProps) => {
    const {product, form} = props;
    const [ogImgUrlDraft, setOgImgUrlDraft] = useRecoilState(ogImgUrlDraftAtom);
    const [ogImgUrl, setOgImgUrl] = useRecoilState(ogImgUrlAtom);
    const [initial, setInitial] = useState('');

    useEffect(() => {
        if (product) {
            setInitial(product.nameEn);
            product.ogImageUrl && setOgImgUrl(product.ogImageUrl);
        }
    }, [product]);

    useEffect(() => {
        form.setValue('ogImageUrl', ogImgUrl);
    }, [ogImgUrl]);

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
                            getOgImageUrl(url).then((url) => setOgImgUrlDraft(url));
                        }}
                    />
                    <div className="pt-3">
                        <p className="text-sm mb-2">Result:</p>
                        {ogImgUrlDraft && (
                            <div className="flex gap-4 items-end">
                                <img src={ogImgUrlDraft} className="w-48 border rounded" />
                                <button
                                    type="button"
                                    className="btn btn-sm btn-accent text-white"
                                    onClick={() => setOgImgUrl(ogImgUrlDraft)}
                                >
                                    아래 입력란에 적용
                                </button>
                            </div>
                        )}
                    </div>
                </ContentPanelInput>

                <ContentPanelInput title="Og image (URL)" text="공유 썸네일 이미지가 URL 이라면 여기로 입력해주세요.">
                    <TextInput placeholder="ex. https://www.github.com/favicon.ico" {...form.register('ogImageUrl')} />
                </ContentPanelInput>

                <ContentPanelInput
                    title="Og image (File)"
                    text="공유 썸네일 이미지가 파일이라면 여기로 업로드 해주세요."
                >
                    <ProfileImageFileInput
                        imageUrl={ogImgUrl}
                        fallbackLetter={initial}
                        className="h-[140px]"
                        style={{aspectRatio: 'auto'}}
                        onChange={(e) => {
                            const uploadedFiles = e.target.files as FileList;
                            const file = uploadedFiles[0];
                            fileApi.upload({file}).then((res) => {
                                setOgImgUrl(res.url);
                                setOgImgUrlDraft('');
                            });
                        }}
                    />
                </ContentPanelInput>
            </ContentPanelList>
        </ContentPanel>
    );
});
