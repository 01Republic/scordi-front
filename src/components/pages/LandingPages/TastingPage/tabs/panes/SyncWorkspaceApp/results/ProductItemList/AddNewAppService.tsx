import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {isAddingModeState} from './atom';
import {NewAppInput} from './NewAppInput';
import {AddNewAppButton} from './AddNewAppButton';

export const AddNewAppService = memo(function AddNewAppService() {
    const isAddingMode = useRecoilValue(isAddingModeState);

    return isAddingMode ? <NewAppInput /> : <AddNewAppButton />;
});
