import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useToast} from '^hooks/useToast';
import {orgIdParamState} from '^atoms/common';
import {teamApi} from '^models/Team/api';
import {useTeamsV2} from '^models/Team/hook';
import {Dropdown} from '^v3/share/Dropdown';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {Check, MoreHorizontal, Trash2} from 'lucide-react';

// 멤버 상세 모달 수정페이지
// 멤버 직접추가 모달의 팀 select 에서 사용됨

interface MoreDropdownInSelectTeamProps {
    isCurrent: boolean;
    data: {value: number; label: string};
}

export const MoreDropdownInSelectTeam = memo((props: MoreDropdownInSelectTeamProps) => {
    const {reload} = useTeamsV2();
    const orgId = useRecoilValue(orgIdParamState);
    const {toast} = useToast();
    const {isCurrent, data} = props;

    const onDelete = () => {
        if (!data || !orgId) return;

        const req = teamApi.destroy(orgId, data.value);
        req.then(() => {
            reload();
            toast.success('삭제되었습니다');
        });
        req.catch((err) => toast.error(err.message));
    };

    return (
        <Dropdown
            backdrop
            Trigger={({visible}) => (
                <>
                    {/* isCurrent: 드롭다운이 열려있다면 비활성화하고, 닫혀있다면 hover 되지 않을 때 활성화 합니다. */}
                    <div className={visible ? 'hidden' : `group-hover:hidden`}>{isCurrent && <Check />}</div>

                    {/* hover 되었을 때 활성화하고, 드롭다운이 열려있다면 활성화된 상태로 고정합니다. */}
                    <div className={visible ? 'flex' : 'hidden group-hover:flex'}>
                        <button className="btn btn-xs btn-square !border-none hover:bg-gray-200">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                </>
            )}
        >
            <ul
                tabIndex={0}
                className="dropdown-portal-content focus menu p-2 border shadow-lg bg-base-100 rounded-md w-40 z-10"
            >
                <MoreDropdownListItem onClick={() => onDelete()}>
                    <div className="flex items-center gap-3 w-full">
                        <Trash2 />
                        <p>삭제</p>
                    </div>
                </MoreDropdownListItem>
            </ul>
        </Dropdown>
    );
});
