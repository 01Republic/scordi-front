import {ForwardedRef, forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, memo, useCallback} from 'react';
import {ContentPanel} from '^layouts/ContentLayout';
import {useForm} from 'react-hook-form';
import {ApplyToAddDto, CreateProductRequestDto} from '^models/Product/type';
import {Input} from 'postcss';
import {FormControlInput} from '^layouts/ContentLayout/FormControlInput';

export const PrototypeAddFormPanel = memo(() => {
    const applyForm = useForm<ApplyToAddDto>();
    const createForm = useForm<CreateProductRequestDto>();

    const onCreateFormSubmit = useCallback((data: CreateProductRequestDto) => {
        console.log(data);
        // createProduct(data).then((res) => {
        //     res.data;
        // });
    }, []);

    return (
        <ContentPanel title={'직접추가'}>
            <form onSubmit={createForm.handleSubmit(onCreateFormSubmit)}>
                <FormControlInput
                    type="text"
                    labelTop="App Name"
                    placeholder="ex. Github"
                    {...createForm.register('nameEn')}
                    required
                />
                <FormControlInput
                    type="text"
                    labelTop="Tagline"
                    placeholder="ex. Github"
                    {...createForm.register('tagline')}
                />
                <FormControlInput
                    type="url"
                    labelTop="Website URL"
                    placeholder="ex. https://www.github.com"
                    {...createForm.register('homepageUrl')}
                />
                <FormControlInput
                    type="url"
                    labelTop="Logo image"
                    placeholder="ex. https://www.github.com/favicon.ico"
                    {...createForm.register('image')}
                />
                <FormControlInput
                    type="url"
                    labelTop="Pricing URL"
                    placeholder="ex. https://www.github.com"
                    {...createForm.register('pricingPageUrl')}
                />
                <div className="pt-4">
                    <button className="btn btn-primary">save</button>
                </div>
            </form>
        </ContentPanel>
    );
});
