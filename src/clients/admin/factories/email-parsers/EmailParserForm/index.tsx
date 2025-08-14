import {FormEventHandler, useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {ContentForm} from '^layouts/ContentLayout';
import {SetParserNamePanel} from '^admin/factories/_common/form/SetParserNamePanel';
import {SearchProductPanel} from '^admin/factories/_common/form/SearchProductPanel';
import {useCurrentEmailParser} from '../hooks';
import {ServiceDetectStep} from './ServiceDetectStep';
import {ParsingOCRSettingStep} from './ParsingOCRSettingStep';
import {ProductDto} from '^models/Product/type';
import {EmailParserDto, EmailParserFormData} from '^models/EmailParser/types';

interface EmailParserFormProps {
    parser?: EmailParserDto;
    isLoading?: boolean;
    onSubmit: FormEventHandler;
}

export function EmailParserForm(props: EmailParserFormProps) {
    const {parser, isLoading, onSubmit} = props;
    const form = useFormContext<{
        title: string;
        productId: number;
        filterQuery: string;
        memo?: string;
        isActive: boolean;
        parserData: EmailParserFormData;
    }>();
    const [_, setParser] = useCurrentEmailParser();
    const [selectedProduct, setSelectedProduct] = useState<ProductDto>();
    const [isOCRStepOpened, setIsOCRStepOpened] = useState(false);

    useEffect(() => {
        if (parser) {
            setParser(parser);
            setSelectedProduct(parser.product);

            form.reset({
                title: parser.title,
                productId: parser.productId,
                filterQuery: parser.filterQuery.toUrlParams(),
                parserData: parser.propertyParsers,
                isActive: parser.isActive,
                memo: parser.memo,
            });
        } else {
            setParser(null);
            form.reset({isActive: false});
        }
    }, [parser?.id]);

    return (
        <ContentForm onSubmit={onSubmit}>
            {/* 1단계 */}
            <SetParserNamePanel readOnly={isLoading} />

            {/* 2단계 */}
            <SearchProductPanel
                defaultValue={selectedProduct}
                onChange={(product) => {
                    setSelectedProduct(product);
                    product ? form.setValue('productId', product.id) : form.resetField('productId');
                }}
            />

            {/* 3단계 */}
            <ServiceDetectStep
                defaultValue={parser?.filterQuery?.toUrlParams()}
                onChange={(value) => form.setValue('filterQuery', value)}
            />

            {/* 4단계 */}
            <ParsingOCRSettingStep />
            {/*{isOCRStepOpened && <ParsingOCRSettingStep />}*/}
        </ContentForm>
    );
}
