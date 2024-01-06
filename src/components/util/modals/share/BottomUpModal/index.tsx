import Swal, {SweetAlertOptions} from 'sweetalert2';
import withReact from 'sweetalert2-react-content';
import React, {memo} from 'react';

export * from './BottomUpModalHeader';

export const BottomUpModalSwal = withReact(Swal).mixin({
    title: 'title',
    html: 'content',
    backdrop: true,
    position: 'bottom',
    confirmButtonText: '완료',
    customClass: {
        container: '!p-0 bg-transparent animate__animated animate__faster',
        popup: '!p-0 !rounded-b-none !rounded-t-box shadow-lg',
        title: '!rounded-t-box bg-scordi !py-0 !px-5 !text-left !text-white !text-lg',
        htmlContainer: '!m-0 !pt-4',
        actions: '!m-0 !p-5',
        confirmButton: 'btn btn-block btn-lg !text-xl !rounded-btn !m-0',
    },
    showClass: {backdrop: 'animate__slideInUp'},
    hideClass: {backdrop: 'animate__slideOutDown'},
});
