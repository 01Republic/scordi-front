import {Button} from '^public/components/ui/button';
import {Card} from '^public/components/ui/card';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {InputSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {requestAddStepAtom} from '^clients/private/orgs/requests/OrgRequestAddPage';
import {useTeamMembers} from '^models/TeamMember';
import {debounce} from 'lodash';
import {AddTeamMemberModal} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/AddTeamMemberModal';
import {ListTable, ListTableContainer, ListTablePaginator} from '^clients/private/_components/table/ListTable';
import {TeamMemberTableHeader} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/TeamMemberTableHeader';
import {TeamMemberTableRow} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/TeamMemberTableRow';
import {orgIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';
import {TeamMemberForRequestTableHeader} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep2/TeamMemberForRequestTableHeader';
import {TeamMemberForRequestTableRow} from '^clients/private/orgs/requests/OrgRequestAddPage/RequestAddStep2/TeamMemberForRequestTableRow';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {Plus, RefreshCcw, RefreshCw} from 'lucide-react';
import SlackIcon from '^public/logo/icons/ic_slack.png';
import GoogleIcon from '^public/logo/icons/ic_google.png';
import Image from 'next/image';

export const RequestAddStep2 = () => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [step, setStep] = useRecoilState(requestAddStepAtom);
    const [toAllMembers, setToAllMembers] = React.useState(true);
    const {
        search,
        result,
        isLoading,
        isEmptyResult,
        isNotLoaded,
        query,
        searchAndUpdateCounter,
        movePage,
        changePageSize,
        reload,
        resetPage,
        orderBy,
    } = useTeamMembers();
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
    const teamMembers = result.items;

    const onReady = () => {
        searchAndUpdateCounter({
            relations: ['teams'],
            order: {id: 'DESC'},
            updateCounterCacheColumn: 'subscriptionCount',
        });
    };

    const onSearch = debounce((keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    }, 500);

    const refresh = () => {
        search({...query, keyword: undefined, page: 1, itemsPerPage: 30}, false, true);
    };

    const onPrevious = () => {
        setStep(step - 1);
    };

    const onNext = () => {
        setStep(step + 1);
    };

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!router.isReady) return;
        onReady && onReady();
    }, [orgId, router.isReady]);

    return (
        <Card className={'bg-white p-10 space-y-10'}>
            <div className={'text-xl font-bold text-gray-900'}>요청의 제목과 내용을 입력해 주세요</div>
            <div>
                기본적으론 이메일과 슬랙 중에 연동된 플랫폼으로 요청이 전송돼요.
                <br />
                이메일과 슬랙 둘 다 연동되어 있지 않다면, 해당 구성원에게는 요청을 전송할 수 없어요.
            </div>
            <InputSection>
                <ButtonGroupRadio
                    onChange={(option) => {
                        setToAllMembers(option.value);
                    }}
                    defaultValue={toAllMembers}
                    options={[
                        {label: '모든 구성원 선택', value: true},
                        {label: '직접 선택', value: false},
                    ]}
                />
            </InputSection>
            {!toAllMembers && (
                <div className={'overflow-x-scroll'}>
                    <div className={'flex justify-between items-center mb-4'}>
                        <div className={'flex space-x-2 items-center'}>
                            <ListPageSearchInput onSearch={onSearch} placeholder={'구성원 검색'} />
                            <span className={'text-sm text-gray800'}>n명 선택됨</span>
                        </div>
                        <div className={'flex space-x-2'}>
                            <Button size={'sm'} variant={'grayOutline'} onClick={onPrevious}>
                                <Image src={SlackIcon} alt={'google'} width={20} height={20} />
                                <RefreshCcw size={30} />
                            </Button>
                            <Button size={'sm'} variant={'grayOutline'} onClick={onPrevious}>
                                <Image src={GoogleIcon} alt={'google'} width={20} height={20} />
                                <RefreshCcw size={20} />
                            </Button>
                            <Button size={'sm'} variant={'scordi'} onClick={onPrevious}>
                                <Plus /> 구성원 추가
                            </Button>
                        </div>
                    </div>
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => (
                            <TeamMemberForRequestTableHeader
                                orderBy={orderBy}
                                allSelected={
                                    selectedMembers.length > 0 && selectedMembers.length === teamMembers.length
                                }
                                onAllSelect={() =>
                                    setSelectedMembers((prev) =>
                                        prev.length === teamMembers.length ? [] : teamMembers.map((item) => item.id),
                                    )
                                }
                            />
                        )}
                        Row={({item}) => (
                            <TeamMemberForRequestTableRow
                                teamMember={item}
                                reload={reload}
                                selected={selectedMembers.includes(item.id)}
                                onSelect={(value: boolean) =>
                                    setSelectedMembers((prev) =>
                                        value ? [...prev, item.id] : prev.filter((v) => v !== item.id),
                                    )
                                }
                            />
                        )}
                    />
                    <div className="flex justify-end my-4">
                        <ListTablePaginator
                            pagination={result.pagination}
                            movePage={movePage}
                            onChangePerPage={changePageSize}
                            unit="개"
                        />
                    </div>
                </div>
            )}
            <div className={'flex justify-end space-x-4'}>
                <Button size={'xl'} variant={'gray'} onClick={onPrevious}>
                    뒤로
                </Button>
                <Button size={'xl'} variant={'scordi'} onClick={onNext}>
                    다음
                </Button>
            </div>
        </Card>
    );
};
