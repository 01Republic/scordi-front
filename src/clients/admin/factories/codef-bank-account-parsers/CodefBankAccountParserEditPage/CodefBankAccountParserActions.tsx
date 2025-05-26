import {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {CodefBankAccountParserEditPageRoute} from '^pages/admin/factories/codef-bank-account-parsers/[id]/edit';
import {adminCodefBankAccountParserApi} from '^models/_codef/CodefBankAccountParser/api';
import {useCodefBankAccountParserVersionsInFactory} from '^models/_codef/CodefBankAccountParser/hooks';
import {CodefBankAccountParserDto} from '^models/_codef/CodefBankAccountParser/type';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {CodefBankAccountParserVersionListModal} from '../CodefBankAccountParserVersionListModal';
import {ActivateButton} from './ActivateButton';
import {RemoveParserItem} from './RemoveParserItem';

interface CodefCardParserActionsProps {
    parser: CodefBankAccountParserDto;
    refetch: () => any;
}

export const CodefBankAccountParserActions = memo((props: CodefCardParserActionsProps) => {
    const {parser, refetch} = props;
    const id = useIdParam('id');
    const router = useRouter();
    const [isVersionListModalOpened, setIsVersionModalOpened] = useState(false);
    const parsersQuery = useCodefBankAccountParserVersionsInFactory(parser?.productId);

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
                    adminCodefBankAccountParserApi
                        .clone(id)
                        .then((res) => res.data)
                        .then((createdParser) => {
                            toast.success('버전 복제완료');
                            return router.push(CodefBankAccountParserEditPageRoute.path(createdParser.id));
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
                        </MoreDropdown.Content>
                    )}
                </MoreDropdown>
            </div>

            <CodefBankAccountParserVersionListModal
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
CodefBankAccountParserActions.displayName = 'CodefCardParserActions';
