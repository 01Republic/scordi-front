import React, {memo, useState} from 'react';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {useRouter} from 'next/router';
import {CodefCardParserListPageRoute} from '^pages/admin/factories/codef-card-parsers';
import {CodefCardParserVersionListModal} from '^admin/factories/codef-card-parsers/CodefCardParserVersionListModal';
import {CodefCardParserEditPageRoute} from '^pages/admin/factories/codef-card-parsers/[id]/edit';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {RemoveParserItem} from './RemoveParserItem';
import {MakeBankAccountParserItem} from './MakeBankAccountParserItem';
import {useCodefCardParserVersionsInFactory} from '^models/_codef/CodefCardParser/hooks/useCodefCardParserVersionsInFactory';
import {ActivateButton} from '^admin/factories/codef-card-parsers/CodefCardParserEditPage/ActivateButton';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {confirm2, confirmed} from '^components/util/dialog';
import {codefCardAdminApi} from '^models/CodefCard/api';

interface CodefCardParserActionsProps {
    parser: CodefCardParserDto;
    refetch: () => any;
}

export const CodefCardParserActions = memo((props: CodefCardParserActionsProps) => {
    const {parser, refetch} = props;
    const id = useIdParam('id');
    const router = useRouter();
    const [isVersionListModalOpened, setIsVersionModalOpened] = useState(false);
    const {isSyncRunning, setIsSyncRunning} = useCodefCardSync();
    const parsersQuery = useCodefCardParserVersionsInFactory(parser?.productId);

    const onClick = (slackMute = false) => {
        if (isSyncRunning) return;

        const check = () => {
            return confirm2(
                '이 파서를 수동 실행할까요?',
                <div className="text-14">
                    이 작업은 도중에 중단 할 수 없습니다.
                    <br />
                    지금 시작할까요? (슬랙실행: {slackMute ? 'Off' : 'On'})
                </div>,
            );
        };

        return confirmed(check())
            .then(() => setIsSyncRunning(true))
            .then(() => adminCodefCardParserApi.run(parser.id, {slackMute}))
            .then(() => toast('파서 실행 완료'))
            .catch(errorToast)
            .finally(() => setIsSyncRunning(false));
    };

    return (
        <div className={'flex gap-2 items-center'}>
            <ActivateButton parser={parser} reload={refetch} />

            <button
                type="button"
                className="btn bg-cyan-200 hover:bg-cyan-400 text-cyan-600 hover:text-cyan-900 transition-all rounded-[14px] border-none no-animation btn-animation"
                onClick={() => setIsVersionModalOpened(true)}
            >
                모든 버전 조회
            </button>

            <button
                type="button"
                className="btn btn-white rounded-[14px] border-none no-animation btn-animation"
                onClick={() => {
                    if (
                        !confirm(
                            '수정한 내용이 있다면 저장 먼저 해주세요.\n변경사항을 잃어버릴 수 있습니다.\n\n수정한 내용이 없다면 이 메세지를 무시해도 됩니다.\n\n지금 바로 버전을 복제할까요?',
                        )
                    )
                        return;
                    adminCodefCardParserApi
                        .clone(id)
                        .then((res) => res.data)
                        .then((createdParser) => {
                            toast.success('버전 복제완료');
                            return router.push(CodefCardParserEditPageRoute.path(createdParser.id));
                        })
                        .catch(errorToast);
                }}
            >
                이 버전 복제하기
            </button>
            <button
                className={`btn bg-yellow-200 hover:bg-yellow-400 text-yellow-600 hover:text-yellow-900 transition-all rounded-[14px] border-none no-animation btn-animation ${
                    isSyncRunning ? 'loading pointer-events-none opacity-30' : ''
                }`}
                onClick={() => onClick()}
                onContextMenu={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    return onClick(true);
                }}
            >
                파서 수동 실행
            </button>

            <div className="ml-auto flex items-center justify-end">
                <MoreDropdown
                    Trigger={() => (
                        <button type="button" className="btn btn-gray">
                            더 보기
                        </button>
                    )}
                >
                    {({hide}) => (
                        <MoreDropdown.Content className="!min-w-[8rem]">
                            <RemoveParserItem parser={parser} hide={hide} />
                            <MakeBankAccountParserItem parser={parser} hide={hide} />
                        </MoreDropdown.Content>
                    )}
                </MoreDropdown>
            </div>

            <CodefCardParserVersionListModal
                isOpen={isVersionListModalOpened}
                onClose={() => setIsVersionModalOpened(false)}
                parsers={parsersQuery.data.items}
                reload={() => {
                    refetch();
                    parsersQuery.refetch();
                }}
            />
        </div>
    );
});
CodefCardParserActions.displayName = 'CodefCardParserActions';
