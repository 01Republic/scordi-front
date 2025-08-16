import {EmailParserDto} from '^models/EmailParser/types';
import {memo, useState} from 'react';
import {useIdParam} from '^atoms/common';
import {useRouter} from 'next/router';
import {useEmailParserVersionsInFactory} from '^models/EmailParser/hooks';
import {EmailParserVersionListModal} from '../../EmailParserVersionListModal';
import {MoreDropdown} from '^_components/MoreDropdown';
import {ActivateButton} from './ActivateButton';
import {RemoveParserItem} from './RemoveParserItem';

interface EmailParserActionsProps {
    parser: EmailParserDto;
    refetch: () => any;
}

export const EmailParserActions = memo((props: EmailParserActionsProps) => {
    const {parser, refetch} = props;
    const id = useIdParam('id');
    const router = useRouter();
    const [isVersionListModalOpened, setIsVersionModalOpened] = useState(false);
    const parsersQuery = useEmailParserVersionsInFactory(parser?.productId);

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

            <EmailParserVersionListModal
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
EmailParserActions.displayName = 'EmailParserActions';
