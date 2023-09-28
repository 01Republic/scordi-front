import {useModal} from '^v3/share/modals/useModal';
import {selectProductModalAtom} from './atom';

export const useSelectProductModal = () => {
    const {...res} = useModal(selectProductModalAtom);

    return {...res};
};
