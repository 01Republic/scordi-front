import React, {BaseSyntheticEvent, FormEvent, FormEventHandler, memo} from 'react';
import Swal from 'sweetalert2';
import {WithChildren} from '^types/global.type';

interface SwalFormProps extends WithChildren {
    onSubmit?: (e: BaseSyntheticEvent<object, any, any>) => Promise<any>;
}

export const SwalForm = memo((props: SwalFormProps) => {
    const {onSubmit, children} = props;

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     try {
    //         await (onSubmit && onSubmit(e));
    //         Swal.close();
    //     } catch (e) {
    //         console.warn('SwalForm.handleSubmit.catch');
    //         console.error(e);
    //     }
    // };

    return (
        <form onSubmit={onSubmit} className="px-4 py-4 flex flex-col gap-3">
            {children}

            <section className="flex items-center justify-end gap-1.5">
                <button
                    type="button"
                    className="btn sm:btn-sm bg-gray-200 text-gray-500 rounded-btn"
                    onClick={() => Swal.close()}
                >
                    취소
                </button>
                <button type="submit" className="btn sm:btn-sm btn-scordi rounded-btn">
                    업데이트
                </button>
            </section>
        </form>
    );
});
SwalForm.displayName = 'SwalForm';
