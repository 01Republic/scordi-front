import {memo} from 'react';
import {useConnectPrototypeModalState} from '^atoms/connectPrototypes.atom';

export const SuccessfullySubmitted = memo(() => {
    const {closeModal} = useConnectPrototypeModalState();

    return (
        <div className="flex flex-col mb-4 gap-y-4">
            <h4>Successfully Submitted!</h4>
            <p>Please wait untill connected.</p>
            <button className="btn btn-primary" onClick={closeModal}>
                ok
            </button>
        </div>
    );
});
