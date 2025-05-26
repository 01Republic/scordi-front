import React, {ChangeEvent, memo, useState} from 'react';
import {CodefCardParserDto, CodefCardParserDtoInFactory} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {StickyNote, X} from 'lucide-react';
import {ago} from '^utils/dateTime';
import {LinkTo} from '^components/util/LinkTo';
import {CodefCardParserEditPageRoute} from '^pages/admin/factories/codef-card-parsers/[id]/edit';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {LoadableBox} from '^components/util/loading';
import Tippy from '@tippyjs/react/headless';

interface CodefCardParserVersionListModalProps {
    isOpen: boolean;
    onClose: () => any;
    parsers?: CodefCardParserDtoInFactory[];
    reload?: () => any;
}

export const CodefCardParserVersionListModal = memo((props: CodefCardParserVersionListModalProps) => {
    const {isOpen, onClose, parsers = [], reload} = props;
    const [isLoading, setIsLoading] = useState(false);

    const parser = parsers[0];
    const productName = parser?.product?.name();
    const isActive = parsers.some((p) => p.isActive);

    const toggleActive = (e: ChangeEvent<HTMLInputElement>, parser: CodefCardParserDto) => {
        const checked = e.target.checked;
        const another = parsers.find((p) => p.isActive && p.id !== parser.id);

        const msg = checked
            ? `이 파서를 활성화 할까요?${another ? `\n\n다른 ${productName} 파서는 비활성화 처리합니다.` : ''}`
            : `이 파서를 비활성화 할까요?${
                  !another ? `\n\n마지막 남은 활성 파서에요!\n그래도 이 파서를 비활성화 할까요?` : ''
              }`;

        if (!confirm(msg)) {
            e.target.checked = !checked;
            return;
        }

        setIsLoading(true);
        adminCodefCardParserApi
            .toggleActive(parser.id)
            .then(() => toast.success('Success!'))
            .then(() => reload && reload())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    const remove = (parser: CodefCardParserDto) => {
        if (!confirm('Are you sure??')) return;

        setIsLoading(true);
        return adminCodefCardParserApi
            .destroy(parser.id)
            .then(() => toast.success('Success!'))
            .then(() => reload && reload())
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    };

    return (
        <AnimatedModal name="CodefCardParserVersionListModal" open={isOpen} onClose={onClose}>
            <div className="relative mx-auto max-w-xl w-full">
                <div className={'bg-white rounded-2xl p-6 pt-5 flex flex-col'}>
                    <header className={`flex justify-between items-start ${'mb-8'}`}>
                        <div>
                            <h3 className="text-xl mb-1.5">
                                {productName} <code className="code code-xl">카드</code> 파서 버전이{' '}
                                {parsers.length.toLocaleString()}개 있어요.
                            </h3>
                            <p className="text-[#999] font-medium text-16">
                                {isLoading
                                    ? '저장중...'
                                    : isActive
                                    ? '안쓰는 버전은 가급적 지워주세요.'
                                    : '활성화하면 그 버전의 파서가 적용됩니다.'}
                            </p>
                        </div>

                        <div>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-stroke-gray text-gray-500 hover:text-gray-900 transition-colors duration-200"
                            >
                                <X size={32} />
                            </button>
                        </div>
                    </header>

                    <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                        <div className="flex flex-col text-14">
                            <div className="grid grid-cols-10 items-center mb-1 bg-gray-100 text-12 text-gray-500">
                                <div className="p-1 py-2 pl-2.5">ID</div>
                                <div className="p-1 py-2 col-span-4">이름</div>
                                <div className="p-1 py-2 col-span-2 text-center">활성</div>
                                <div className="p-1 py-2 col-span-2">마지막 편집</div>
                                <div className="p-1 py-2"></div>
                            </div>
                            {parsers.map((parser) => (
                                <div
                                    key={`${parser.id}-${parser.isActive ? 'active' : 'inactive'}`}
                                    className="grid grid-cols-10 items-center"
                                >
                                    <div className="p-1 py-2 pl-2.5">
                                        <span className="text-12">#{parser.id}</span>
                                    </div>
                                    <div className="p-1 py-2 col-span-4">
                                        <div className="flex items-center gap-1.5">
                                            <LinkTo
                                                href={CodefCardParserEditPageRoute.path(parser.id)}
                                                className="text-blue-500 hover:underline hover:underline-offset-2 hover:underline-blue-500"
                                                displayLoading={false}
                                            >
                                                {parser.title}
                                            </LinkTo>

                                            {parser.memo && (
                                                <Tippy
                                                    render={() => (
                                                        <div>
                                                            <div className="text-12 min-w-[150px] h-[100px] overflow-scroll p-3 shadow-lg bg-yellow-300 text-black whitespace-pre-wrap">
                                                                {parser.memo}
                                                            </div>
                                                        </div>
                                                    )}
                                                    className="bg-transparent"
                                                    placement="right"
                                                    interactive={true}
                                                >
                                                    <div>
                                                        <StickyNote className="text-yellow-500 cursor-pointer" />
                                                    </div>
                                                </Tippy>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-1 py-2 col-span-2 text-center">
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-xs toggle-primary"
                                            defaultChecked={parser.isActive}
                                            onChange={(e) => toggleActive(e, parser)}
                                        />
                                    </div>
                                    <div className="p-1 py-2 col-span-2">{ago(parser.updatedAt)}</div>
                                    <div className="p-1 py-2">
                                        <button className="btn btn-xs btn-error" onClick={() => remove(parser)}>
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </LoadableBox>
                </div>
            </div>
        </AnimatedModal>
    );
});
CodefCardParserVersionListModal.displayName = 'CodefCardParserVersionListModal';
