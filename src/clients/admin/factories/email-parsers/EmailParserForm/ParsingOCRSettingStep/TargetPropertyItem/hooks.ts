import {useMemo} from 'react';
import {DeepPartial, useForm} from 'react-hook-form';
import {ReactNodeElement} from '^types/global.type';
import {FetchedAttachmentFile, GmailItemDto} from '^models/InvoiceAccount/type';
import {
    BasePropertyFormData,
    getMatchResultForRegExp,
    SelectedPatternMethod,
    SelectedProperty,
    TextPropertyFormData,
} from '^models/EmailParser/types';
import {getMatchResultForHtml} from '^utils/dom-parser';

export interface TargetPropertyItemProps<V = TextPropertyFormData> {
    title: ReactNodeElement;
    emailItem?: GmailItemDto;
    content?: string;
    attachments?: FetchedAttachmentFile[];
    optional?: boolean;
    onChange?: (value?: V) => any;
    defaultValue?: V;
    question?: string;
    selectorEngine?: 'xpath' | 'css';
}

export interface TargetPropertyItemContentProps<V = TextPropertyFormData> {
    emailItem?: GmailItemDto;
    content?: string;
    attachments?: FetchedAttachmentFile[];
    defaultValue?: V;
    onChange?: (value?: V) => any;
    isExists?: boolean;
    isFinished?: boolean;
    question?: string;
    selectorEngine?: 'xpath' | 'css';
}

interface Props {
    emailItem?: GmailItemDto;
    content?: string;
}

export function getDataSource(
    emailItem?: GmailItemDto,
    content?: string,
    attachments: FetchedAttachmentFile[] = [],
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
            return attachments[0]?.data || '';
        case SelectedProperty.attachment_2:
            return attachments[1]?.data || '';
        default:
            return '';
    }
}

export function getResultValue(dataSource: string, regexResult: string | string[], captureIndex: number) {
    const extracted = typeof regexResult === 'string' ? regexResult : regexResult[captureIndex];
    return extracted || dataSource || '데이터 없음';
}

export function useTargetPropertyItem<PropertyFormData extends BasePropertyFormData>(props: {
    emailItem?: GmailItemDto;
    content?: string;
    attachments?: FetchedAttachmentFile[];
    defaultValue?: PropertyFormData;
}) {
    const {defaultValue, emailItem, content, attachments = []} = props;
    const form = useForm<PropertyFormData>({
        mode: 'onChange',
        defaultValues: defaultValue as DeepPartial<PropertyFormData>,
    });
    const value = form.watch();
    const selectedProperty = value?.selectedProperty || SelectedProperty.title;
    const selectedMethod = value?.pattern?.method || SelectedPatternMethod.REGEX;
    const inputValue = value?.pattern?.value || '';
    const captureIndex = value?.pattern?.captureIndex || 0;

    // selectedProperty 에 맞는 데이터를 가져옵니다.
    const dataSource = useMemo(
        () => getDataSource(emailItem, content, attachments, selectedProperty),
        [emailItem, content, attachments, selectedProperty],
    );

    // 입력한 정규식에 매칭된 값
    const regexResult = useMemo(() => {
        switch (selectedMethod) {
            case SelectedPatternMethod.XPATH:
                return getMatchResultForHtml(dataSource, inputValue);
            case SelectedPatternMethod.REGEX:
            case SelectedPatternMethod.CODE:
            default:
                return getMatchResultForRegExp(dataSource, inputValue);
        }
    }, [dataSource, selectedMethod, inputValue]);

    // 캡쳐까지 고려해 최종적으로 추출된 값
    const resultValue = useMemo(
        () => getResultValue(dataSource, regexResult, captureIndex),
        [dataSource, regexResult, captureIndex],
    );

    return {form, selectedProperty, dataSource, regexResult, resultValue};
}
