import React, {memo, useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {CreateProductRequestDto as CreateDto} from '^models/Product/type';
import {FormControlInput} from '^layouts/ContentLayout/FormControlInput';
import {useProductSearch} from '^models/Product/hook';
import {errorNotify} from '^utils/toast-notify';
import {productApi} from '^models/Product/api';

export const PrototypeCreateModal = memo(() => {
    const form = useForm<CreateDto>();
    const {mutation} = useProductSearch();

    const onClose = useCallback(() => {
        document.getElementById('proto-create-modal--dismiss-button')?.click();
    }, []);

    const onBackdropClick = useCallback((e: MouseEvent) => {
        const target = e.target as Element;
        if (target?.id === 'proto-create-modal') onClose();
    }, []) as any;

    const onSubmit = useCallback((data: CreateDto) => {
        productApi
            .create(data)
            .then((res) => {
                if (res.status === 201) {
                    mutation();
                    onClose();
                }
            })
            .catch(errorNotify);
    }, []);

    useEffect(() => {
        form.setValue('desc', '');
        form.setValue('isAutoTrackable', false);
        form.setValue('isFreeTierAvailable', false);
    }, []);

    return (
        <div className="modal" id="proto-create-modal" onClick={onBackdropClick}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">New App</h3>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="py-4">
                        <FormControlInput
                            autoFocus={true}
                            type="text"
                            labelTop="App Name *"
                            placeholder="ex. Github"
                            {...form.register('nameEn', {required: true})}
                            required
                        />
                        <FormControlInput
                            type="text"
                            labelTop="Tagline (Summary) *"
                            placeholder="ex. Source code version control system"
                            {...form.register('tagline', {required: true})}
                            required
                        />
                        <FormControlInput
                            type="text"
                            labelTop="Keywords"
                            placeholder="ex. Github,깃헙,깃허브,git"
                            {...form.register('searchText')}
                        />
                        <FormControlInput
                            type="url"
                            labelTop="Logo image"
                            placeholder="ex. https://www.github.com/favicon.ico"
                            {...form.register('image')}
                        />
                        <FormControlInput
                            type="url"
                            labelTop="Website URL *"
                            placeholder="ex. https://www.github.com"
                            {...form.register('homepageUrl', {required: true})}
                            required
                        />
                        <FormControlInput
                            type="url"
                            labelTop="Pricing URL *"
                            placeholder="ex. https://www.github.com"
                            {...form.register('pricingPageUrl', {required: true})}
                            required
                        />
                        <FormControlInput
                            type="text"
                            labelTop="Company Name *"
                            placeholder="ex. Github, Inc"
                            {...form.register('companyName', {required: true})}
                            required
                        />
                    </div>
                    <div className="modal-action">
                        <a id="proto-create-modal--dismiss-button" href="#" className="btn">
                            cancel
                        </a>
                        <button className="btn btn-primary">save</button>
                    </div>
                </form>
            </div>
        </div>
    );
});
