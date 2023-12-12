import React, {memo, useEffect, useState} from 'react';
import {useProduct} from '^models/Product/hook';
import {useForm, UseFormReturn} from 'react-hook-form';
import {ProductDto, ProductConnectMethod, UpdateProductRequestDto as UpdateDto} from '^models/Product/type';
import {
    ContentForm,
    ContentPanel,
    ContentPanelInput,
    ContentPanelItem,
    ContentPanelItemText,
    ContentPanelItemTitle,
    ContentPanelList,
} from '^layouts/ContentLayout';
import {TextInput} from '^components/TextInput';
import {ProfileImageFileInput} from '^components/ProfileImageFileInput';
import {toast} from 'react-toastify';
import {WysiwygEditor} from '^components/WysiwygEditor';
import {productApi} from '^models/Product/api';

export const MenuContentForEditPrototype = memo(() => {
    const [proto, mutation] = useProduct();
    const form = useForm<UpdateDto>();

    useEffect(() => {
        if (!proto) return;
        // 수정과 생성 모두에서 사용하는 인풋
        form.setValue('nameEn', proto.nameEn); // 서비스명
        form.setValue('tagline', proto.tagline); // Tagline
        form.setValue('homepageUrl', proto.homepageUrl); // Homepage url
        form.setValue('image', proto.image); // 이미지 url
        form.setValue('pricingPageUrl', proto.pricingPageUrl); // Pricing Page url
        form.setValue('companyName', proto.companyName); // 운영사명

        // 아래는 수정 폼에서만 노출되는 인풋
        form.setValue('searchText', proto.searchText); // 검색키워드
        form.setValue('connectMethod', proto.connectMethod as ProductConnectMethod); // 연동방법
        form.setValue('isAutoTrackable', proto.isAutoTrackable); // API 지원 여부
        form.setValue('isFreeTierAvailable', proto.isFreeTierAvailable); // 프리티어 지원 여부
        form.setValue('desc', proto.desc); // 설명
    }, [proto]);

    const onSubmit = (data: UpdateDto) => {
        if (!proto) return;
        productApi.update(proto.id, data).then((res) => {
            if (res.status === 200) {
                mutation(undefined);
                toast.success('Successfully Updated.');
            }
        });
    };

    return (
        <div>
            <ContentForm onSubmit={form.handleSubmit(onSubmit)}>
                <ContentPanel title="기본정보">
                    <ContentPanelList>
                        <ContentPanelInput title="App name" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. Github"
                                {...form.register('nameEn', {required: true})}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Tagline (Summary)" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. Github"
                                {...form.register('tagline', {required: true})}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Website URL" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. https://www.github.com"
                                {...form.register('homepageUrl', {required: true})}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Pricing URL" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. https://www.github.com"
                                {...form.register('pricingPageUrl', {required: true})}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Company Name" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. Github, Inc"
                                {...form.register('companyName', {required: true})}
                            />
                        </ContentPanelInput>
                    </ContentPanelList>
                </ContentPanel>

                <LogoImageFormPanel form={form} proto={proto} />

                <ContentPanel title="세부정보">
                    <ContentPanelList>
                        <ContentPanelInput
                            title="Keyword"
                            text="앱 이름과 함께 검색어로 등록할 키워드들을 쉼표(,) 로 구분하여 입력해주세요."
                        >
                            <TextInput placeholder="ex. Github,깃헙,깃허브,git" {...form.register('searchText')} />
                        </ContentPanelInput>

                        <ContentPanelInput title="API Supported?" text="API 지원 여부">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                {...form.register('isAutoTrackable')}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Free-Tier Included?" text="프리티어 지원 여부">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                {...form.register('isFreeTierAvailable')}
                            />
                        </ContentPanelInput>
                    </ContentPanelList>
                </ContentPanel>
            </ContentForm>

            <ContentPanel title="위험 구역!">
                <ContentPanelList>
                    <ContentPanelItem>
                        <div className="flex-1">
                            <ContentPanelItemTitle text="이 앱을 스코디 전체에서 제거합니다." />
                            <ContentPanelItemText
                                text={`
                            <ul>
                              <li>앱을 삭제하면 스코디를 사용하는 <b>모든 조직의 구독이 삭제됩니다.</b></li>
                              <li><b>이 작업은 돌이킬 수 없습니다.</b> 신중하게 검토 후 삭제하세요!</li>
                            </ul>
                            `}
                            />
                        </div>
                        <div className="flex-1 text-end">
                            <button type="button" className="btn btn-error text-white">
                                관리자 권한으로 이 앱 삭제하기
                            </button>
                        </div>
                    </ContentPanelItem>
                </ContentPanelList>
            </ContentPanel>
        </div>
    );
});

interface LogoImageFormPanelProps {
    proto: ProductDto | undefined;
    form: UseFormReturn<UpdateDto, any>;
}

export const LogoImageFormPanel = memo((props: LogoImageFormPanelProps) => {
    const {form} = props;
    const [faviconUrl, setFaviconUrl] = useState('');
    const [initial, setInitial] = useState('');
    const [logoUrl, setLogoUrl] = useState(form.getValues('image'));
    const base = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=128&url=`;

    useEffect(() => {
        setInitial((form.getValues('nameEn') ?? '')[0]);
        setLogoUrl(form.getValues('image'));
        form.setValue('imageFile', undefined);
    }, []);

    return (
        <ContentPanel title="로고 이미지">
            <ContentPanelList>
                <ContentPanelInput title="<도구> Favicon 추출기" text="웹사이트 주소를 넣으면 favicon 을 추출해줍니다.">
                    <input
                        type="text"
                        className="input input-sm input-bordered w-full"
                        onChange={(e) => {
                            const url = e.target.value;
                            setFaviconUrl(base + url);
                        }}
                    />
                    <div className="pt-3">
                        <p className="text-sm mb-2">Result:</p>
                        {faviconUrl && (
                            <div className="flex gap-4 items-end">
                                <img src={faviconUrl} className="w-24 border rounded" />
                                <button
                                    type="button"
                                    className="btn btn-sm btn-accent text-white"
                                    onClick={() => {
                                        form.setValue('image', faviconUrl);
                                        setLogoUrl(faviconUrl);
                                    }}
                                >
                                    아래 입력란에 적용
                                </button>
                            </div>
                        )}
                    </div>
                </ContentPanelInput>

                <ContentPanelInput title="Logo image (URL)" text="로고가 URL 이라면 여기로 입력해주세요.">
                    <TextInput placeholder="ex. https://www.github.com/favicon.ico" {...form.register('image')} />
                </ContentPanelInput>

                <ContentPanelInput title="Logo image (File)" text="로고가 파일이라면 여기로 업로드 해주세요.">
                    <ProfileImageFileInput
                        imageUrl={logoUrl}
                        fallbackLetter={initial}
                        {...form.register('imageFile')}
                        onChange={(e) => {
                            const uploadedFiles = e.target.files as FileList;
                            form.setValue('imageFile', uploadedFiles[0]);
                        }}
                    />
                </ContentPanelInput>
            </ContentPanelList>
        </ContentPanel>
    );
});
