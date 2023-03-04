import React, {memo, MouseEventHandler, useCallback, useEffect} from 'react';
import {atom, useRecoilState} from 'recoil';
import {
    ApplicationPrototypeDto,
    PrototypeConnectMethod,
    UpdateApplicationPrototypeRequestDto as UpdateDto,
} from '^types/applicationPrototype.type';
import {useForm} from 'react-hook-form';
import {FormControlInput} from '^layouts/ContentLayout/FormControlInput';
import {updateApplicationPrototype} from '^api/applicationPrototype.api';
import {usePrototypeSearch} from '^hooks/useApplicationPrototypes';
import {FormControlCheckbox} from '^layouts/ContentLayout/FormControlCheckbox';
import {FormControlSelect} from '^layouts/ContentLayout/FormControlSelect';

export const editingProtoTargetState = atom<ApplicationPrototypeDto | null>({
    key: 'editingProtoTargetState',
    default: null,
});

interface PrototypeEditModalProps {
    searchMutationAfterSave?: boolean;
}

export const PrototypeEditModal = memo((props: PrototypeEditModalProps) => {
    const {searchMutationAfterSave = false} = props;
    const [protoTarget, setEditingProtoTarget] = useRecoilState(editingProtoTargetState);
    const form = useForm<UpdateDto>();
    const {mutation} = usePrototypeSearch();

    const onClose = useCallback(() => {
        setEditingProtoTarget(null);
        document.getElementById('proto-edit-modal--dismiss-button')?.click();
    }, []);

    const onBackdropClick = useCallback((e: MouseEvent) => {
        const target = e.target as Element;
        if (target?.id === 'proto-edit-modal') onClose();
    }, []) as any;

    const onSubmit = useCallback(
        (data: UpdateDto) => {
            if (!protoTarget) return;
            updateApplicationPrototype(protoTarget.id, data).then((res) => {
                if (res.status === 200) {
                    if (searchMutationAfterSave) mutation();
                    onClose();
                }
            });
        },
        [protoTarget],
    );

    useEffect(() => {
        if (!protoTarget) return;
        // 수정과 생성 모두에서 사용하는 인풋
        form.setValue('name', protoTarget.name); // 서비스명
        form.setValue('tagline', protoTarget.tagline); // Tagline
        form.setValue('homepageUrl', protoTarget.homepageUrl); // Homepage url
        form.setValue('image', protoTarget.image); // 이미지 url
        form.setValue('pricingPageUrl', protoTarget.pricingPageUrl); // Pricing Page url
        form.setValue('companyName', protoTarget.companyName); // 운영사명

        // 아래는 수정 폼에서만 노출되는 인풋
        form.setValue('connectMethod', protoTarget.connectMethod as PrototypeConnectMethod); // 연동방법
        form.setValue('isAutoTrackable', protoTarget.isAutoTrackable); // API 지원 여부
        form.setValue('isFreeTierAvailable', protoTarget.isFreeTierAvailable); // 프리티어 지원 여부
        form.setValue('desc', protoTarget.desc); // 설명
    }, [protoTarget]);

    return (
        <div className="modal" id="proto-edit-modal" onClick={onBackdropClick}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit App</h3>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="py-4">
                        <FormControlInput
                            type="text"
                            labelTop="App Name"
                            placeholder="ex. Github"
                            {...form.register('name')}
                            required
                        />
                        <FormControlInput
                            type="text"
                            labelTop="Tagline (Summary)"
                            placeholder="ex. Github"
                            {...form.register('tagline')}
                        />
                        <FormControlInput
                            type="url"
                            labelTop="Logo image"
                            placeholder="ex. https://www.github.com/favicon.ico"
                            {...form.register('image')}
                        />
                        <FormControlInput
                            type="url"
                            labelTop="Website URL"
                            placeholder="ex. https://www.github.com"
                            {...form.register('homepageUrl')}
                        />
                        <FormControlInput
                            type="url"
                            labelTop="Pricing URL"
                            placeholder="ex. https://www.github.com"
                            {...form.register('pricingPageUrl')}
                        />
                        <FormControlInput
                            type="text"
                            labelTop="Company Name"
                            placeholder="ex. Github, Inc"
                            {...form.register('companyName')}
                        />

                        <hr className="py-3" />

                        <FormControlCheckbox
                            label="API Supported?"
                            inputColor="primary"
                            {...form.register('isAutoTrackable')}
                        />
                        <FormControlCheckbox
                            label="Free-Tier Included?"
                            inputColor="primary"
                            {...form.register('isFreeTierAvailable')}
                        />
                        <FormControlInput
                            type="text"
                            labelTop="Description (Search line)"
                            placeholder="ex. Github"
                            {...form.register('desc')}
                        />
                        <FormControlSelect
                            labelTop="Connect Method"
                            options={Object.entries(PrototypeConnectMethod)}
                            {...form.register('connectMethod')}
                        />
                    </div>

                    <div className="modal-action">
                        <a id="proto-edit-modal--dismiss-button" href="#" className="btn">
                            cancel
                        </a>
                        <button className="btn btn-primary">save</button>
                    </div>
                </form>
            </div>
        </div>
    );
});
