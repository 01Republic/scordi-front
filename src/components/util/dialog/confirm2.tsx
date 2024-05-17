import withReact, {ReactSweetAlertOptions} from 'sweetalert2-react-content';
import Swal, {SweetAlertIcon, SweetAlertOptions, SweetAlertResult} from 'sweetalert2';

const confirmBase = withReact(Swal).mixin({
    title: 'Are you sure?',
    // text: 'If you disconnect, It will be difficult to manage the app.',
    // icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    reverseButtons: false,
    customClass: {
        actions: '!mx-0 !px-5 !grid grid-cols-2 gap-2',
        confirmButton: 'btn !btn-scordi !rounded-btn !m-0',
        cancelButton: 'btn !bg-gray-200 !text-gray-500 !rounded-btn !m-0',
    },
});

export function confirm2(
    title?: ReactSweetAlertOptions['title'],
    html?: ReactSweetAlertOptions['html'],
    icon?: SweetAlertIcon,
    options: SweetAlertOptions = {},
) {
    return styled(title, html, icon, options);
}

function basic(
    title?: ReactSweetAlertOptions['title'],
    html?: ReactSweetAlertOptions['html'],
    icon?: SweetAlertIcon,
    options: SweetAlertOptions = {},
) {
    return confirmBase.fire({title, html, icon, ...options});
}

function fire<T = any>(options: ReactSweetAlertOptions) {
    return confirmBase.fire<T>(options as SweetAlertOptions);
}

function styled(
    title?: ReactSweetAlertOptions['title'],
    html?: ReactSweetAlertOptions['html'],
    icon?: SweetAlertIcon,
    options: SweetAlertOptions = {},
) {
    options.customClass ||= {};
    return confirmBase.fire({
        // @ts-ignore
        title: title && <h4 className="text-2xl text-left">🙏&nbsp; {title}</h4>,
        // @ts-ignore
        html: html && <div className="mt-4 mb-2 px-2 text-16 text-left whitespace-pre-wrap">{html}</div>,
        icon,
        ...options,
        customClass: {
            actions: '!mx-0 !px-5 !grid grid-cols-2 gap-2 direction-rtl',
            htmlContainer: '!m-0 !px-5',
            confirmButton: 'btn !btn-scordi !rounded-btn !m-0',
            cancelButton: 'btn !bg-gray-200 !text-gray-500 !rounded-btn !m-0',
            icon: '!absolute !right-0 !top-0 !m-0 !transform !scale-50',
            ...(options.customClass as object),
        },
    });
}

function notionStyled(title?: ReactSweetAlertOptions['title'], icon?: SweetAlertIcon, options: SweetAlertOptions = {}) {
    options.customClass ||= {};
    return confirmBase.fire({
        // @ts-ignore
        title: title && <h4 className="text-xl sm:text-lg text-left">🙏&nbsp; {title}</h4>,
        icon,
        reverseButtons: true,
        ...options,
        customClass: {
            popup: '!p-4 !rounded-xl',
            actions: '!mx-0 !px-0 !flex !justify-end !gap-1.5',
            htmlContainer: '!m-0',
            title: '!p-0',
            confirmButton: 'btn sm:!btn-sm !btn-scordi !rounded-btn !m-0',
            cancelButton: 'btn sm:!btn-sm !bg-gray-200 !text-gray-500 !rounded-btn !m-0',
            icon: '!absolute !right-0 !top-0 !m-0 !transform !scale-50',
            ...(options.customClass as object),
        },
    });
}

function type2(html?: ReactSweetAlertOptions['html'], icon?: SweetAlertIcon, options: SweetAlertOptions = {}) {
    return confirmBase.fire({title: '', html, icon: icon || 'warning', ...options});
}

confirm2.fire = fire;
confirm2.basic = basic;
confirm2.styled = styled;
confirm2.notionStyled = notionStyled;
confirm2.type2 = type2;

export const runIfSwalConfirmed = (cb: () => any) => (res: SweetAlertResult<any>) => res.isConfirmed && cb();
