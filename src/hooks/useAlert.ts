import {AxiosResponse} from 'axios';
import Swal, {SweetAlertOptions} from 'sweetalert2';

interface DestroyAlertProps<T> {
    title: string;
    onConfirm: () => Promise<AxiosResponse<T>>;
    showSuccessAlertOnFinal?: boolean;
}

export function useAlert() {
    // 성공 alert
    const success = (props: SweetAlertOptions) => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: props.title,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    // 삭제 alert
    const destroy = <T>(props: DestroyAlertProps<T>) => {
        const {title, onConfirm, showSuccessAlertOnFinal = true} = props;
        return Swal.fire({
            title: title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '',
            cancelButtonColor: 'error',
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await onConfirm();
                if (response && showSuccessAlertOnFinal) {
                    await Swal.fire({
                        icon: 'success',
                        title: '완료되었습니다.',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                return response;
            }
        });
    };

    const error = (title: string, text: string, props?: SweetAlertOptions) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            ...props,
        });
    };

    return {alert: {success, destroy, error}};
}
