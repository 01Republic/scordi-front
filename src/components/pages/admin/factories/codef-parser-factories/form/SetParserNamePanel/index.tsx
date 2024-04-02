import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {LoadableBox} from '^components/util/loading';
import {TextInput} from '^components/TextInput';
import {codefParserFactoryApi} from '../../CodefParserFactory/api';
import {CodefParserFile} from '../../CodefParserFactory/CodefParserFile';
import {CodefParserFormReturn} from '../CodefParserForm';
import {ValidateMessage} from './ValidateMessage';
import {SearchedParserItem} from './SearchedParserItem';
import {pascalCase, snakeCase} from '^components/util/string';

interface SetParserNamePanelProps {
    form: CodefParserFormReturn;
    readOnly?: boolean;
}

export const SetParserNamePanel = memo((props: SetParserNamePanelProps) => {
    const {form, readOnly = false} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [similarParsers, setSimilarParsers] = useState<CodefParserFile[]>([]);
    const [matchedParsers, setMatchedParsers] = useState<CodefParserFile[]>([]);

    const search = (text: string) => {
        setIsLoading(true);
        return codefParserFactoryApi
            .index()
            .then((res) => {
                const similarList: CodefParserFile[] = [];
                const matchedList: CodefParserFile[] = [];
                (res.data || []).forEach((parser) => {
                    const serviceName = parser.serviceName.toLowerCase();
                    const givenName = text.toLowerCase();
                    if (serviceName === givenName) {
                        matchedList.push(parser);
                    } else if (serviceName.includes(givenName)) {
                        similarList.push(parser);
                    }
                });
                return [similarList, matchedList];
            })
            .finally(() => setIsLoading(false));
    };

    const onChange = debounce((value: string) => {
        form.setValue('serviceName', value);
        if (checkInvalidNameFormat(value)) {
            setSimilarParsers([]);
            setMatchedParsers([]);
            return;
        }
        // valid name
        search(value).then(([similarList, matchedList]) => {
            setSimilarParsers(similarList);
            setMatchedParsers(matchedList);
        });
    }, 500);

    const onInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
        let value = `${e.target.value}`;
        if (value.endsWith(' ')) return; // 입력이 스페이스로 끝나면 전처리/검색 모든 과정을 생략.
        value = value.replace(/\./g, 'Dot'); // 마침표(.) 는 'Dot' 으로 변경.
        value = value.replace(/^\d+/, ''); // 숫자로 시작하면 안됨. 이름 시작에 붙어있는 숫자는 삭제.
        value = pascalCase(snakeCase(value));
        e.target.value = value;
        onChange(value);
    }, 500);

    const checkInvalidNameFormat = (name: string): string => {
        if (!name) return '이름을 입력해주세요.';
        if (name.includes(' ')) return '이름에 공백이 포함될 수 없습니다.';
        if (name.length <= 3) return '이름이 너무 짧습니다.';
        return '';
    };

    const {serviceName = ''} = form.getValues();

    const invalidMsg = checkInvalidNameFormat(`${serviceName}`);

    return (
        <ContentPanel title="[1단계] 파서의 제목을 입력합니다." stickyHeader>
            <ContentPanelList>
                <ContentPanelInput
                    title="서비스 영문 이름으로 입력해주세요"
                    required={true}
                    text="파스칼케이스 : 띄어쓰기 등 공백없이 + 어절 단위로 대문자 형식"
                >
                    <TextInput
                        required={true}
                        placeholder="ex. AmazonWebService"
                        defaultValue={serviceName}
                        // readOnly={readOnly}
                        onChange={onInputChange}
                    />

                    <LoadableBox isLoading={isLoading}>
                        <ValidateMessage
                            value={serviceName}
                            invalidMsg={invalidMsg}
                            similarLength={similarParsers.length}
                            matchedLength={matchedParsers.length}
                        />

                        {similarParsers.map((parser, i) => (
                            <SearchedParserItem key={i} parser={parser} />
                        ))}
                    </LoadableBox>
                </ContentPanelInput>
            </ContentPanelList>
        </ContentPanel>
    );
});
SetParserNamePanel.displayName = 'SetParserNamePanel';
