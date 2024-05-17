import Swal, {SweetAlertIcon, SweetAlertOptions} from 'sweetalert2';
import withReact, {ReactSweetAlertOptions} from 'sweetalert2-react-content';

const alertBase = withReact(Swal).mixin({
    // title: 'Are you sure?',
    // text: 'If you disconnect, It will be difficult to manage the app.',
    // icon: 'warning',
    showCancelButton: false,
    confirmButtonText: '확인',
    allowOutsideClick: false,
    allowEscapeKey: false,
});

export function alert2(
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
    return alertBase.fire({title, html, icon, ...options});
}

function fire<T = any>(options: ReactSweetAlertOptions) {
    return alertBase.fire<T>(options as SweetAlertOptions);
}

function styled(
    title?: ReactSweetAlertOptions['title'],
    html?: ReactSweetAlertOptions['html'],
    icon?: SweetAlertIcon,
    options: SweetAlertOptions = {},
) {
    options.customClass ||= {};
    return alertBase.fire({
        // @ts-ignore
        title: title && <h4 className="text-2xl text-left">💡&nbsp; {title}</h4>,
        // @ts-ignore
        html: html && <div className="text-16 text-left whitespace-pre-wrap">{html}</div>,
        icon,
        ...options,
        customClass: {
            actions: '!mx-0 !px-5 gap-2',
            confirmButton: 'btn !btn-scordi !btn-block !rounded-btn !m-0',
            icon: '!absolute !right-0 !top-0 !m-0 !transform !scale-50',
            ...(options.customClass as object),
        },
    });
}

function type2(html?: ReactSweetAlertOptions['html'], icon?: SweetAlertIcon, options: SweetAlertOptions = {}) {
    return alertBase.fire({title: '', html, icon: icon || 'warning', ...options});
}

alert2.fire = fire;
alert2.basic = basic;
alert2.styled = styled;
alert2.type2 = type2;
