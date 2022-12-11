import React, {FC, FormEventHandler} from 'react';
import {WithChildren} from '^types/global.type';

interface ContentFormProps {
    onSubmit: FormEventHandler;
    submitBtnHidden?: boolean;
}

export const ContentForm: FC<WithChildren & ContentFormProps> = ({onSubmit, submitBtnHidden = false, children}) => {
    return (
        <div>
            <form
                onSubmit={(e) => {
                    onSubmit(e);
                }}
            >
                {children}

                {!submitBtnHidden && (
                    <div className="w-full mb-10 text-right">
                        <button className="btn btn-primary">저장하기</button>
                    </div>
                )}
            </form>
        </div>
    );
};
