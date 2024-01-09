import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {ToolType} from '^v3/V3OrgSettingsConnectsPage/type';
import {currentOrgAtom} from '^models/Organization/atom';
import {MoreDropdown} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown';
import {FiRefreshCw} from 'react-icons/fi';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {useToast} from '^hooks/useToast';

interface WorkspaceItemProps {
    tool: ToolType;
    logo: JSX.Element;
    button: JSX.Element;
}

export const WorkspaceItem = memo((props: WorkspaceItemProps) => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {toast} = useToast();
    const {tool, logo, button} = props;

    if (!currentOrg) return <></>;

    const onSync = () => {
        toast.info('준비중입니다.');
    };
    const onDelete = () => {
        toast.info('준비중입니다.');
    };

    return (
        <div className="flex justify-between px-5 border rounded-2xl mb-2 min-h-[74px] items-center">
            <p className="flex gap-3 self-center font-base">
                {logo} {tool}
            </p>
            <div className="flex gap-3">
                <button>{button}</button>
                <MoreDropdown isCurrent={false} option={0} destroyRequest={onDelete} className="!block">
                    <MoreDropdownListItem onClick={() => onSync()}>
                        <div className="flex items-center gap-3 w-full">
                            <FiRefreshCw />
                            <p>동기화</p>
                        </div>
                    </MoreDropdownListItem>
                </MoreDropdown>
            </div>
        </div>
    );
});
