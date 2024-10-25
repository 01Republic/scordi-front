import withReact, {ReactSweetAlertOptions} from 'sweetalert2-react-content';
import Swal, {SweetAlertOptions} from 'sweetalert2';

const promptHTMLBase = withReact(Swal).mixin({
    title: 'Are you sure?',
    // text: 'If you disconnect, It will be difficult to manage the app.',
    // icon: 'warning',
    showCancelButton: false,
    showConfirmButton: false,
    preConfirm: async (inputValue: any) => {
        console.log('inputValue', inputValue);
    },
    customClass: {
        popup: '!p-0 !rounded-xl',
        actions: '!mx-0 !px-8 !justify-end gap-2',
        htmlContainer: '!m-0 !px-0',
        confirmButton: 'btn sm:!btn-sm btn-scordi !rounded-btn !m-0',
        cancelButton: 'btn sm:!btn-sm !bg-gray-200 !text-gray-500 !rounded-btn !m-0',
        icon: '!absolute !right-0 !top-0 !m-0 !transform !scale-50',
    },
});

export function swalHTML<PreConfirmCallbackValue, PreConfirmResult = any>(
    html?: ReactSweetAlertOptions['html'],
    preConfirm?: (inputValue: PreConfirmCallbackValue) => PreConfirmResult,
    options: SweetAlertOptions = {},
) {
    return promptHTMLBase.fire({
        title: '',
        html,
        preConfirm,
        ...options,
    });
}
