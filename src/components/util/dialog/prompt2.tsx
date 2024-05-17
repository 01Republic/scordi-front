import withReact, {ReactSweetAlertOptions} from 'sweetalert2-react-content';
import Swal, {SweetAlertIcon, SweetAlertOptions, SweetAlertResult} from 'sweetalert2';

const promptBase = withReact(Swal).mixin({
    title: 'Are you sure?',
    // text: 'If you disconnect, It will be difficult to manage the app.',
    // icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    reverseButtons: true,
    input: 'text',
    preConfirm: async (inputValue: any) => {
        console.log('inputValue', inputValue);
    },
    customClass: {
        actions: '!mx-0 !px-8 !justify-end gap-2',
        htmlContainer: '!m-0 !px-5',
        input: '!mx-8 !input sm:!input-sm !input-bordered',
        confirmButton: 'btn sm:!btn-sm !btn-scordi !rounded-btn !m-0',
        cancelButton: 'btn sm:!btn-sm !bg-gray-200 !text-gray-500 !rounded-btn !m-0',
        icon: '!absolute !right-0 !top-0 !m-0 !transform !scale-50',
    },
});

export function prompt2<PreConfirmCallbackValue, PreConfirmResult = any>(
    title?: ReactSweetAlertOptions['title'],
    preConfirm?: (inputValue: PreConfirmCallbackValue) => PreConfirmResult,
    options: SweetAlertOptions = {},
) {
    return styled(title, preConfirm, options);
}

function basic(
    title?: ReactSweetAlertOptions['title'],
    html?: ReactSweetAlertOptions['html'],
    icon?: SweetAlertIcon,
    options: SweetAlertOptions = {},
) {
    return promptBase.fire({title, html, icon, ...options});
}

function fire<T = any>(options: ReactSweetAlertOptions) {
    return promptBase.fire<T>(options as SweetAlertOptions);
}

function styled<PreConfirmCallbackValue, PreConfirmResult = any>(
    title?: ReactSweetAlertOptions['title'],
    preConfirm?: (inputValue: PreConfirmCallbackValue) => PreConfirmResult,
    options: SweetAlertOptions = {},
) {
    options.customClass ||= {};
    return promptBase.fire({
        // @ts-ignore
        title: <h4 className="text-xl sm:text-lg text-left">{title}</h4>,
        html: '',
        ...options,
        customClass: {
            actions: '!mx-0 !px-8 !justify-end gap-2',
            htmlContainer: '!m-0 !px-5',
            input: '!mx-8 !input sm:!input-sm !input-bordered',
            confirmButton: 'btn sm:!btn-sm !btn-scordi !rounded-btn !m-0',
            cancelButton: 'btn sm:!btn-sm !bg-gray-200 !text-gray-500 !rounded-btn !m-0',
            icon: '!absolute !right-0 !top-0 !m-0 !transform !scale-50',
            ...(options.customClass as object),
        },
    });
}

function type2(html?: ReactSweetAlertOptions['html'], icon?: SweetAlertIcon, options: SweetAlertOptions = {}) {
    return promptBase.fire({title: '', html, icon: icon || 'warning', ...options});
}

prompt2.fire = fire;
prompt2.basic = basic;
prompt2.styled = styled;
prompt2.type2 = type2;
