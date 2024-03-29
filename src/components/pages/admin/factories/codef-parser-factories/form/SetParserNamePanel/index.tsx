import React, {memo, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {debounce} from 'lodash';
import {ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {LoadableBox} from '^components/util/loading';
import {TextInput} from '^components/TextInput';
import {codefParserFactoryApi} from '../../CodefParserFactory/api';
import {CreateCodefParserDto} from '../../CodefParserFactory/CreateCodefParserDto';
import {CodefParserFile} from '../../CodefParserFactory/CodefParserFile';
import {ValidateMessage} from './ValidateMessage';
import {SearchedParserItem} from './SearchedParserItem';

interface SetParserNamePanelProps {
    form: UseFormReturn<CreateCodefParserDto>;
}

export const SetParserNamePanel = memo((props: SetParserNamePanelProps) => {
    const {form} = props;
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

    const checkInvalidNameFormat = (name: string): string => {
        if (!name) return '이름을 입력해주세요.';
        if (name.includes(' ')) return '이름에 공백이 포함될 수 없습니다.';
        if (name.length <= 3) return '이름이 너무 짧습니다.';
        return '';
    };

    const invalidMsg = checkInvalidNameFormat(`${form.getValues('serviceName')}`);

    return (
        <ContentPanel title="[1단계] 파서의 제목을 입력합니다.">
            <ContentPanelList>
                <ContentPanelInput
                    title="서비스 영문 이름으로 입력해주세요"
                    required={true}
                    text="파스칼케이스 : 띄어쓰기 등 공백없이 + 어절 단위로 대문자 형식"
                >
                    <TextInput
                        required={true}
                        placeholder="ex. AmazonWebService"
                        onChange={(e) => onChange(e.target.value)}
                    />

                    <LoadableBox isLoading={isLoading}>
                        <ValidateMessage
                            value={form.getValues('serviceName')}
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
