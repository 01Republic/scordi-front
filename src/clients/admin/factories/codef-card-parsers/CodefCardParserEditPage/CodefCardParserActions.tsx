import {memo, useState} from 'react';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {useRouter} from 'next/router';
import {CodefCardParserListPageRoute} from '^pages/admin/factories/codef-card-parsers';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {ProductDto} from '^models/Product/type';
import {CodefCardParserVersionListModal} from '^admin/factories/codef-card-parsers/CodefCardParserVersionListModal';
import {CodefCardParserEditPageRoute} from '^pages/admin/factories/codef-card-parsers/[id]/edit';

interface CodefCardParserActionsProps {
    parser: CodefCardParserDto;
    refetch: () => any;
}

export const CodefCardParserActions = memo((props: CodefCardParserActionsProps) => {
    const {parser, refetch} = props;
    const id = useIdParam('id');
    const router = useRouter();
    const [isVersionListModalOpened, setIsVersionModalOpened] = useState(false);
    const parsersQuery = useQuery({
        queryFn: () =>
            adminCodefCardParserApi
                .index({
                    relations: ['product'],
                    where: {productId: parser?.productId},
                    order: {productId: 'DESC', id: 'DESC'},
                    itemsPerPage: 0,
                })
                .then((res) => {
                    return res.data as Paginated<CodefCardParserDto & {product: ProductDto}>;
                }),
        queryKey: ['CodefCardParserListPage.parsers', parser?.productId],
        initialData: Paginated.init(),
        enabled: !!parser?.productId,
    });

    const activate = () => {
        const msg = '이 파서를 활성화 할까요?\n같은 Product 에 대한 다른 파서는 비활성화 처리합니다.';
        if (!confirm(msg)) return;

        adminCodefCardParserApi
            .toggleActive(id)
            .then(() => toast.success('Success!'))
            .then(() => refetch())
            .catch(errorToast);
    };

    return (
        <div className={'flex gap-2 items-center'}>
            {parser.isActive ? (
                <button
                    type="button"
                    className="btn bg-green-200 hover:bg-green-400 text-green-600 hover:text-green-900 transition-all rounded-[14px] border-none no-animation btn-animation"
                    onClick={() => {
                        alert('이 파서를 비활성화 하려면\n다른 파서를 활성화 하는 방법으로만 할 수 있어요.');
                    }}
                >
                    활성 상태입니다.
                </button>
            ) : (
                <button
                    type="button"
                    className="btn bg-sky-200 hover:bg-sky-400 text-sky-600 hover:text-sky-900 transition-all rounded-[14px] border-none no-animation btn-animation"
                    onClick={() => {
                        const msg =
                            '작업한 내용이 있다면 취소를 클릭후 먼저 저장한 뒤 진행해주세요.\n확인을 누르면 기존 파서를 기준으로 이관합니다.\n\n계속 진행할까요?';
                        if (!confirm(msg)) return;

                        activate();
                    }}
                >
                    활성화 하기
                </button>
            )}

            {!parser.isActive && (
                <button
                    type="button"
                    className="btn bg-red-200 hover:bg-red-400 text-red-600 hover:text-red-900 transition-all rounded-[14px] border-none no-animation btn-animation"
                    onClick={() => {
                        if (!confirm('Are you sure?')) return;
                        adminCodefCardParserApi
                            .destroy(id)
                            .then(() => toast.success('Success!'))
                            .then(() => router.push(CodefCardParserListPageRoute.path()))
                            .catch(errorToast);
                    }}
                >
                    파서 삭제
                </button>
            )}

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
