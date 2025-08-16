import {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {useIdParam} from '^atoms/common';
import {errorToast} from '^api/api';
import {CodefCardParserEditPageRoute} from '^pages/admin/factories/codef-card-parsers/[id]/edit';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {useCodefCardParserVersionsInFactory} from '^models/_codef/CodefCardParser/hooks';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {CodefCardParserVersionListModal} from '../CodefCardParserVersionListModal';
import {ActivateButton} from './ActivateButton';
import {RemoveParserItem} from './RemoveParserItem';
import {MakeBankAccountParserItem} from './MakeBankAccountParserItem';

interface CodefCardParserActionsProps {
    parser: CodefCardParserDto;
    refetch: () => any;
}

export const CodefCardParserActions = memo((props: CodefCardParserActionsProps) => {
    const {parser, refetch} = props;
    const id = useIdParam('id');
    const router = useRouter();
    const [isVersionListModalOpened, setIsVersionModalOpened] = useState(false);
    const parsersQuery = useCodefCardParserVersionsInFactory(parser?.productId);

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
