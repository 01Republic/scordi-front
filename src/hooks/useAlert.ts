import {AxiosResponse} from 'axios';
import Swal, {SweetAlertOptions} from 'sweetalert2';

interface DestroyAlertProps {
    title: string;
    confirmFn: () => Promise<AxiosResponse<any>>;
    routerFn: () => void;
}

export function useAlert() {
    // 성공 alert
    const success = (props: SweetAlertOptions) => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: props.title,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    // 삭제 alert
    const destroy = (props: DestroyAlertProps) => {
        const {title, confirmFn, routerFn} = props;
        Swal.fire({
            title: title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '',
            cancelButtonColor: 'error',
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await confirmFn();
                if (response) {
                    Swal.fire({
                        icon: 'success',
                        title: '완료되었습니다.',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setTimeout(() => {
                        routerFn();
                    }, 1500);
                }
            }
        });
    };

    const error = (title: string, text: string) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
        });
    };
    return {alert: {success, destroy, error}};
}
