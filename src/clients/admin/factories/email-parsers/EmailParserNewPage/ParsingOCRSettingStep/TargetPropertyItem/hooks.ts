import {useMemo, useState} from 'react';
import {ReactNodeElement} from '^types/global.type';
import {GmailItemDto} from '^models/InvoiceAccount/type';

export interface TargetPropertyItemProps {
    title: ReactNodeElement;
    emailItem?: GmailItemDto;
    content?: string;
    optional?: boolean;
}

export enum SelectedProperty {
    title = 'title',
    snippet = 'snippet',
    content = 'content',
    attachment_1 = 'attachment_1',
    attachment_2 = 'attachment_2',
}

interface Props {
    emailItem?: GmailItemDto;
    content?: string;
}

export function useTargetProperty(props: Props) {
    const {emailItem, content} = props;

    const [selectedProperty, setSelectedProperty] = useState<SelectedProperty>(SelectedProperty.title);
    const [inputValue, setInputValue] = useState('');
    const [captureIndex, setCaptureIndex] = useState(0);

    const dataSource = useMemo(() => {
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
    }, [emailItem, content, selectedProperty]);

    const regexResult = useMemo(() => {
        if (!inputValue) return '';

        try {
            const regex = new RegExp(inputValue, 'g');
            return [...(regex.exec(dataSource) || [])];
        } catch (e: any) {
            return e.message as string;
        }
    }, [dataSource, inputValue, captureIndex]);

    const resultValue = useMemo(() => {
        const extracted = typeof regexResult === 'string' ? regexResult : regexResult[captureIndex];
        return extracted || dataSource || '데이터 없음';
    }, [dataSource, regexResult, captureIndex]);

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
