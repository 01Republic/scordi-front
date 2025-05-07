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
        confirmButton: 'btn btn-scordi !rounded-btn !m-0',
        cancelButton: 'btn !bg-gray-200 !text-gray-500 !rounded-btn !m-0',
    },
});

export function confirm3(
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
        title: title && <h4 className="text-20 font-bold text-gray-900 text-left">{title}</h4>,
        // @ts-ignore
        html: html && <div className="text-left whitespace-pre-wrap mb-3">{html}</div>,
        icon,
        ...options,
        customClass: {
            popup: '!p-8 !rounded-2xl !w-auto !max-w-md',
            actions: '!m-0 !p-0 !grid grid-cols-2 gap-2 direction-rtl',
            title: '!mx-0 !mt-0 !mb-4 !p-0',
            htmlContainer: '!mx-0 !mt-0 !mb-5 !p-0',
            confirmButton: 'btn btn-scordi !rounded-btn !m-0 ',
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
        title: title && <h4 className="text-xl sm:text-lg text-left">{title}</h4>,
        icon,
        reverseButtons: true,
        ...options,
        customClass: {
            popup: '!p-4 !rounded-xl',
            actions: '!mx-0 !px-0 !flex !justify-end !gap-1.5',
            htmlContainer: '!m-0',
            title: '!p-0',
            confirmButton: 'btn sm:!btn-sm btn-scordi !rounded-btn !m-0',
            cancelButton: 'btn sm:!btn-sm !bg-gray-200 !text-gray-500 !rounded-btn !m-0',
            icon: '!absolute !right-0 !top-0 !m-0 !transform !scale-50',
            ...(options.customClass as object),
        },
    });
}

function type2(html?: ReactSweetAlertOptions['html'], icon?: SweetAlertIcon, options: SweetAlertOptions = {}) {
    return confirmBase.fire({title: '', html, icon: icon || 'warning', ...options});
}

confirm3.fire = fire;
confirm3.basic = basic;
confirm3.styled = styled;
confirm3.notionStyled = notionStyled;
confirm3.type2 = type2;

export const runIfSwalConfirmed = (cb: () => any) => (res: SweetAlertResult<any>) => res.isConfirmed && cb();
export const runIfSwalCancelled = (cb: () => any) => (res: SweetAlertResult<any>) => !res.isConfirmed && cb();
export const throwIfSwalCancelled = (errMsg?: string) => (res: SweetAlertResult<any>) => {
    if (!res.isConfirmed) throw new Error(errMsg);
};

/**
 * ## confirmed(swalResult: Promise<SweetAlertResult>, canceledToastMsg?: string)
 *
 * @description isConfirmed 를 체크하는 반복성 보일러플레이트 코드를 제거합니다.
 * - 두 번째 인자로 토스트 메세지를 넘길 수 있고, 비워두면 토스트 동작은 생략됩니다.
 *
 * @example
 *
 * 이렇게 써야 하는 걸:
 *
 *         confirm2(
 *             '결제카드를 삭제할까요?',
 *             <>
 *                 ...
 *             </>,
 *         ).then((res) => {
 *             if (!res.isConfirmed) return throw new Error('취소했어요');
 *          })
 *
 * 이렇게 바꿔줍니다:
 *
 *         const someConfirmDialog = () => { // 컨펌창만 함수로 한 번 감싸주고,
 *             return confirm2(
 *                 '결제카드를 삭제할까요?',
 *                  <>
 *                      ...
 *                  </>,
 *              )
 *         };
 *
 *         confirmed(someConfirmDialog(), '취소했어요'); // 이렇게 축약합니다.
 */
export function confirmed(swalResult: Promise<SweetAlertResult>, canceledToastMsg?: string) {
    return swalResult.then(throwIfSwalCancelled(canceledToastMsg));
}
