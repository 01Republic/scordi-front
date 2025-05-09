import React, {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {WorkspaceConnectButton} from '^v3/share/GoogleLoginButtons/WorkspaceConnectButton';
import {isWorkspaceConnectLoadingAtom} from '^v3/V3OrgConnectsPage/atom';
import {Plus} from 'lucide-react';

export const ConnectWorkspaceButtonInConnectsPage = memo(() => {
    const setIsLoading = useSetRecoilState(isWorkspaceConnectLoadingAtom);

    return <WorkspaceConnectButton ButtonComponent={() => <AddButton />} setIsLoading={setIsLoading} />;
});

const AddButton = () => {
    return (
        <button className="btn btn-block bg-gray-100 flex justify-start items-center gap-2 border border-gray-300 text-sm text-gray-500 font-normal mb-3">
            <Plus size={18} /> 추가
        </button>
    );
};
