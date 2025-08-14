import {useMemo, useState} from 'react';
import {DeepPartial, useForm} from 'react-hook-form';
import {ReactNodeElement} from '^types/global.type';
import {GmailItemDto} from '^models/InvoiceAccount/type';
import {SelectedProperty, TextPropertyFormData} from '^models/EmailParser/types';
import {BasePropertyFormData} from '^models/EmailParser/types/EmailParserFormData/base.property.form-data';

export interface TargetPropertyItemProps<V = TextPropertyFormData> {
    title: ReactNodeElement;
    emailItem?: GmailItemDto;
    content?: string;
    optional?: boolean;
    onChange?: (value: V) => any;
    defaultValue?: V;
}

export interface TargetPropertyItemContentProps<V = TextPropertyFormData> {
    emailItem?: GmailItemDto;
    content?: string;
    defaultValue?: V;
    onChange?: (value: V) => any;
    isExists?: boolean;
    isFinished?: boolean;
}

interface Props {
    emailItem?: GmailItemDto;
    content?: string;
}

export function getDataSource(
    emailItem?: GmailItemDto,
    content?: string,
    selectedProperty: SelectedProperty = SelectedProperty.title,
) {
    if (!emailItem) return '';

    switch (selectedProperty) {
        case SelectedProperty.title:
            return emailItem.title;
        case SelectedProperty.snippet:
            return emailItem.snippet;
        case SelectedProperty.content:
            return content || '';
        case SelectedProperty.attachment_1:
        case SelectedProperty.attachment_2:
        default:
            return '';
    }
}

export function getRegexResult(dataSource: string, inputValue: string) {
    if (!inputValue) return '';

    try {
        const regex = new RegExp(inputValue, 'g');
        return [...(regex.exec(dataSource) || [])];
    } catch (e: any) {
        return e.message as string;
    }
}

export function getResultValue(dataSource: string, regexResult: string | string[], captureIndex: number) {
    const extracted = typeof regexResult === 'string' ? regexResult : regexResult[captureIndex];
    return extracted || dataSource || '데이터 없음';
}

export function useTargetPropertyItem<PropertyFormData extends BasePropertyFormData>(props: {
    emailItem?: GmailItemDto;
    content?: string;
    defaultValue?: PropertyFormData;
}) {
    const {defaultValue, emailItem, content} = props;
    const form = useForm<PropertyFormData>({
        mode: 'onChange',
        defaultValues: defaultValue as DeepPartial<PropertyFormData>,
    });
    const value = form.watch();
    const selectedProperty = value?.selectedProperty || SelectedProperty.title;
    const inputValue = value?.pattern?.value || '';
    const captureIndex = value?.pattern?.captureIndex || 0;

    const dataSource = useMemo(
        () => getDataSource(emailItem, content, selectedProperty),
        [emailItem, content, selectedProperty],
    );
    const regexResult = useMemo(() => getRegexResult(dataSource, inputValue), [dataSource, inputValue]);
    const resultValue = useMemo(
        () => getResultValue(dataSource, regexResult, captureIndex),
        [dataSource, regexResult, captureIndex],
    );

    return {form, dataSource, regexResult, resultValue};
}

export function useTargetProperty(props: Props) {
    const {emailItem, content} = props;

    const [selectedProperty, setSelectedProperty] = useState<SelectedProperty>(SelectedProperty.title);
    const [inputValue, setInputValue] = useState('');
    const [captureIndex, setCaptureIndex] = useState(0);

    const dataSource = useMemo(
        () => getDataSource(emailItem, content, selectedProperty),
        [emailItem, content, selectedProperty],
    );
    const regexResult = useMemo(() => getRegexResult(dataSource, inputValue), [dataSource, inputValue]);
    const resultValue = useMemo(
        () => getResultValue(dataSource, regexResult, captureIndex),
        [dataSource, regexResult, captureIndex],
    );

    return {
        selectedProperty,
        inputValue,
        captureIndex,
        setCaptureIndex,
        dataSource,
        regexResult,
        resultValue,
        setSelectedProperty,
        setInputValue,
    };
}
