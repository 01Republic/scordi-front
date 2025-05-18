import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {LoadableBox} from '^components/util/loading';
import {TextInput} from '^components/TextInput';
import {ValidateMessage} from './ValidateMessage';
import {SearchedParserItem} from './SearchedParserItem';
import {pascalCase, snakeCase} from '^components/util/string';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {useFormContext} from 'react-hook-form';
import {UpdateCodefCardParserRequestDto} from '^models/_codef/CodefCardParser/type/UpdateCodefCardParser.request.dto';

interface SetParserNamePanelProps {
    readOnly?: boolean;
}

export const SetParserNamePanel = memo((props: SetParserNamePanelProps) => {
    // const {readOnly = false} = props;
    const form = useFormContext<UpdateCodefCardParserRequestDto>();
    const [isLoading, setIsLoading] = useState(false);
    const [similarParsers, setSimilarParsers] = useState<CodefCardParserDto[]>([]);
    const [matchedParsers, setMatchedParsers] = useState<CodefCardParserDto[]>([]);
    console.log('SetParserNamePanel');

    // const search = (text: string) => {
    //     setIsLoading(true);
    //     return adminCodefCardParserApi
    //         .index({
    //             where: {
    //                 title: {op: 'like', val: encodeURI(`%${text}%`)},
    //             },
    //         })
    //         .then((res) => {
    //             const {items} = res.data;
    //             const similarList: CodefCardParserDto[] = [];
    //             const matchedList: CodefCardParserDto[] = [];
    //             items.forEach((parser) => {
    //                 const serviceName = parser.title.toLowerCase();
    //                 const givenName = text.toLowerCase();
    //                 if (serviceName === givenName) {
    //                     matchedList.push(parser);
    //                 } else if (serviceName.includes(givenName)) {
    //                     similarList.push(parser);
    //                 }
    //             });
    //             return [similarList, matchedList];
    //         })
    //         .finally(() => setIsLoading(false));
    // };

    // const onChange = debounce((value: string) => {
    //     form.setValue('title', value);
    //
    //     if (checkInvalidNameFormat(value)) {
    //         setSimilarParsers([]);
    //         setMatchedParsers([]);
    //         return;
    //     }
    //     // valid name
    //     search(value).then(([similarList, matchedList]) => {
    //         setSimilarParsers(similarList);
    //         setMatchedParsers(matchedList);
    //     });
    // }, 500);

    // const onInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    //     let value = `${e.target.value}`;
    //     if (value.endsWith(' ')) return; // 입력이 스페이스로 끝나면 전처리/검색 모든 과정을 생략.
    //     value = value.replace(/\./g, 'Dot'); // 마침표(.) 는 'Dot' 으로 변경.
    //     value = value.replace(/^\d+/, ''); // 숫자로 시작하면 안됨. 이름 시작에 붙어있는 숫자는 삭제.
    //     value = pascalCase(snakeCase(value));
    //     e.target.value = value;
    //     onChange(value);
    // }, 500);

    const checkInvalidNameFormat = (name: string): string => {
        if (!name) return '이름을 입력해주세요.';
        if (name.includes(' ')) return '이름에 공백이 포함될 수 없습니다.';
        if (name.length <= 3) return '이름이 너무 짧습니다.';
        return '';
    };

    // const title = form.getValues('title');
    // const invalidMsg = checkInvalidNameFormat(`${title}`);
    // console.log('title', title);

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
                        {...form.register('title')}
                        // readOnly={readOnly}
                        // onChange={onInputChange}
                    />

                    <LoadableBox isLoading={isLoading}>
                        {/*<ValidateMessage*/}
                        {/*    value={invalidMsg}*/}
                        {/*    invalidMsg={invalidMsg}*/}
                        {/*    similarLength={similarParsers.length}*/}
                        {/*    matchedLength={matchedParsers.length}*/}
                        {/*/>*/}

                        {similarParsers.map((parser) => (
                            <SearchedParserItem key={parser.id} parser={parser} />
                        ))}
                    </LoadableBox>
                </ContentPanelInput>
            </ContentPanelList>
        </ContentPanel>
    );
});
SetParserNamePanel.displayName = 'SetParserNamePanel';
