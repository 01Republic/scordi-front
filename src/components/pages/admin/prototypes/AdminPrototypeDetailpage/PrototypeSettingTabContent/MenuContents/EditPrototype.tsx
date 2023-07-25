import React, {memo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ApplicationPrototypeDto, PrototypeConnectMethod} from '^types/applicationPrototype.type';
import {UpdateApplicationPrototypeRequestDto as UpdateDto} from '^types/applicationPrototype.type';
import {applicationPrototypeApi} from '^api/applicationPrototype.api';
import {useRecoilState} from 'recoil';
import {adminPrototypeDetail} from '^components/pages/admin/prototypes/AdminPrototypeDetailpage';
import {toast} from 'react-toastify';
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
import {LogoImageFormPanel} from '^components/pages/OrgProtoDetailPage/TabContents/Setting';

export const EditPrototypeMenuContent = memo(() => {
    const [prototype, setPrototype] = useRecoilState(adminPrototypeDetail);
    const form = useForm<UpdateDto>();

    useEffect(() => {
        if (!prototype) return;
        // 수정과 생성 모두에서 사용하는
        form.setValue('name', prototype.name); // 서비스명
        form.setValue('tagline', prototype.tagline); // Tagline
        form.setValue('homepageUrl', prototype.homepageUrl); // Homepage url
        form.setValue('image', prototype.image); // 이미지 url
        form.setValue('pricingPageUrl', prototype.pricingPageUrl); // Pricing Page url
        form.setValue('companyName', prototype.companyName); // 운영사명

        // 아래는 수정 폼에서만 노출되는 인풋
        form.setValue('searchText', prototype.searchText); // 검색키워드
        form.setValue('connectMethod', prototype.connectMethod as PrototypeConnectMethod); // 연동방법
        form.setValue('isAutoTrackable', prototype.isAutoTrackable); // API 지원 여부
        form.setValue('isFreeTierAvailable', prototype.isFreeTierAvailable); // 프리티어 지원 여부
        form.setValue('desc', prototype.desc); // 설명
    }, [prototype]);

    const onSubmit = (data: UpdateDto) => {
        if (!prototype) return;
        applicationPrototypeApi.update(prototype.id, data).then((res) => {
            if (res.status === 200) {
                setPrototype(prototype);
                toast.success('Successfully Updated.');
            }
        });
    };

    if (!prototype) return <></>;
    return (
        <div>
            <ContentForm onSubmit={form.handleSubmit(onSubmit)}>
                <ContentPanel title="기본정보">
                    <ContentPanelList>
                        <ContentPanelInput title="App name" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. Github"
                                {...form.register('name', {required: true})}
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

                <LogoImageFormPanel form={form} proto={prototype} />

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
