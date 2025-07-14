import React, {useEffect, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
    ProductDto,
    CreateProductRequestDto as CreateDto,
    UpdateProductRequestDto as UpdateDto,
    ProductConnectMethod,
} from '^models/Product/type';
import {ContentForm, ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {getOpenGraphData} from '^api/utils.api/open-graph.api';
import {TextInput} from '^components/TextInput';
import {ProductDeletePanel} from './panels/ProductDeletePanel';
import {ProductCyclePanel} from './panels/ProductCyclePanel';
import {OgImageFormPanel, ogImgUrlAtom} from './panels/ProductOgImageFormPanel';
import {faviconUrlAtom, LogoImageFormPanel, logoUrlAtom} from './panels/ProductLogoImageFormPanel';
import {ProductTagMultiSelect} from './ProductTagMultiSelect';
import {InputNameKo} from './InputNameKo';
import {InputNameEn} from './InputNameEn';
import {ProductSimilarNameFormPanel} from '^admin/products/form/panels/ProductSimilarNameFormPanel';

interface CreatePrototypeFormProps {
    form: UseFormReturn<CreateDto>;
    onSubmit: (data: CreateDto) => any;
}

interface UpdatePrototypeFormProps {
    form: UseFormReturn<UpdateDto>;
    onSubmit: (data: UpdateDto) => any;
    product: ProductDto | null;
}

export const ProductForm = (props: CreatePrototypeFormProps | UpdatePrototypeFormProps) => {
    const {form, onSubmit} = props;
    const product = 'product' in props ? props.product : null;
    const setFaviconUrl = useSetRecoilState(faviconUrlAtom);
    const setLogoUrl = useSetRecoilState(logoUrlAtom);
    const setOgImgUrl = useSetRecoilState(ogImgUrlAtom);

    // set loaded product data on form
    useEffect(() => {
        if (!product) {
            form.setValue('desc', '');
            return;
        }
        // 수정과 생성 모두에서 사용하는 인풋
        form.setValue('nameKo', product.nameKo); // 서비스명 (한글)
        form.setValue('nameEn', product.nameEn); // 서비스명 (영문)
        form.setValue('tagline', product.tagline); // Tagline
        form.setValue('homepageUrl', product.homepageUrl); // Homepage url
        form.setValue('image', product.image); // 이미지 url
        form.setValue('ogImageUrl', product.ogImageUrl ?? ''); // og image url
        form.setValue('pricingPageUrl', product.pricingPageUrl); // Pricing Page url
        form.setValue('companyName', product.companyName); // 운영사명
        form.setValue('saasCollectionExposePriority', product.saasCollectionExposePriority || 0);

        // 아래는 수정 폼에서만 노출되는 인풋
        form.setValue('searchText', product.searchText); // 검색키워드
        form.setValue('connectMethod', product.connectMethod as ProductConnectMethod); // 연동방법
        form.setValue('isAutoTrackable', product.isAutoTrackable); // API 지원 여부
        form.setValue('isFreeTierAvailable', product.isFreeTierAvailable); // 프리티어 지원 여부
        form.setValue('desc', product.desc); // 비고
    }, [product]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const formSubmit = form.handleSubmit(onSubmit);

    const onPrompt = async () => {
        const url = prompt('웹사이트 주소를 넣어주세요.');
        if (url) {
            const openGraphData = await getOpenGraphData(url);
            // console.log(openGraphData);
            form.setValue('nameEn', openGraphData.hybridGraph.site_name);
            form.setValue('tagline', openGraphData.htmlInferred.description);
            form.setValue('homepageUrl', openGraphData.htmlInferred.url);

            // favicon
            setFaviconUrl(openGraphData.htmlInferred.favicon);
            setLogoUrl(openGraphData.htmlInferred.favicon);
            form.setValue('image', openGraphData.htmlInferred.favicon);

            // thumbnail
            setOgImgUrl(openGraphData.htmlInferred.image);
            form.setValue('ogImageUrl', openGraphData.htmlInferred.image);
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button className="btn btn-scordi-light btn-sm" onClick={onPrompt}>
                    사이트에서 불러오기
                </button>
            </div>

            <ContentForm
                onSubmit={(e) => {
                    console.log('event', event);
                    console.log('e', e);
                    // if (isSubmitBlocked) return false;
                    return formSubmit(e);
                }}
            >
                <ContentPanel title="기본정보">
                    <ContentPanelList>
                        <ContentPanelInput title="App name (ko)" required={true}>
                            <InputNameKo form={form} product={product} />
                        </ContentPanelInput>

                        <ContentPanelInput title="App name (en)" required={true}>
                            <InputNameEn form={form} product={product} />
                        </ContentPanelInput>

                        <ProductTagMultiSelect tags={product?.tags ?? []} form={form} />

                        <ContentPanelInput title="Summary" required={true}>
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

                <LogoImageFormPanel form={form} product={product ?? null} />
                <OgImageFormPanel form={form} product={product ?? null} />

                <ContentPanel title="세부정보">
                    <ContentPanelList>
                        <ContentPanelInput
                            title="Keyword"
                            text="앱 이름과 함께 검색어로 등록할 키워드들을 쉼표(,) 로 구분하여 입력해주세요."
                        >
                            <TextInput placeholder="ex. Github,깃헙,깃허브,git" {...form.register('searchText')} />
                        </ContentPanelInput>

                        <ContentPanelInput title="Note" text="프로모션과 같이 메모할 정보들을 입력해주세요.">
                            <TextInput
                                placeholder="ex. 첫 6개월 구독 시 50% 할인 정보 공유할 것"
                                {...form.register('desc')}
                            />
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

                <ContentPanel title="설정">
                    <ContentPanelList>
                        <ContentPanelInput title="SaaS 컬렉션 노출 우선순위" text="높은 숫자일수록 상위노출 됩니다.">
                            <TextInput
                                type="number"
                                placeholder="0"
                                min={0}
                                {...form.register('saasCollectionExposePriority')}
                            />
                        </ContentPanelInput>
                    </ContentPanelList>
                </ContentPanel>
            </ContentForm>
            {product && <ProductSimilarNameFormPanel product={product} />}
            {product && <ProductCyclePanel product={product} />}
            {product && <ProductDeletePanel product={product} />}
        </div>
    );
};
