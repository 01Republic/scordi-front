import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {plainToast as toast} from '^hooks/useToast';
import {CodefAccountDto} from '../type/CodefAccountDto';
import {CreateAccountRequestDto, encryptCodefAccountPassword} from '../type/create-account.request.dto';
import {CodefCardCompanyCode, CodefCustomerType, CodefRequestBusinessType} from '../type/enums';
import {useCodefAccountsAlreadyIs} from '../hook';
import {codefAccountApi} from '^models/CodefAccount/api';
import {ApiErrorResponse} from '^api/api';
import {codefErrorCodeToMsg, CodefResponse} from '^models/CodefAccount/codef-common';
import {AccountCreatedResponseDto} from '^models/CodefAccount/type/create-account.response.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {debounce} from 'lodash';
import {lastOf} from '^utils/array';

interface CreateCodefAccountOption {
    redirectTo?: (codefAccount: CodefAccountDto) => any;
}

export function useCreateCodefAccount(option?: CreateCodefAccountOption) {
    const {redirectTo = (codefAccount: CodefAccountDto) => codefAccount} = option || {};
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<CreateAccountRequestDto>();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const {search: checkCodefAccounts} = useCodefAccountsAlreadyIs();

    const checkExists = debounce(
        (
            organization: CodefCardCompanyCode,
            clientType: CodefCustomerType,
            callbackFn?: (codefAccount?: CodefAccountDto) => any,
        ) => {
            return checkCodefAccounts({where: {organization, clientType}}, false, true).then((result) => {
                if (!result) {
                    setTimeout(() => checkExists(organization, clientType, callbackFn), 1000);
                    return;
                }
                const [accountExisted] = result.items;
                callbackFn ? callbackFn(accountExisted) : redirectTo(accountExisted);
                // if (accountExisted) {
                //     // toast.error('기존에 등록된 계정으로 이동합니다', {duration: 3000});
                //     // setTimeout(() => {
                //     // }, 3000);
                // }
            });
        },
        500,
    );

    const createAccount = (
        orgId: number,
        connectMethod: CardAccountsStaticData,
        dto: CreateAccountRequestDto,
        callbackFn?: (codefAccount: CodefAccountDto) => any,
    ) => {
        setIsLoading(true);
        setErrorMessages([]);

        return codefAccountApi
            .create(orgId, {
                ...dto,
                businessType: CodefRequestBusinessType.Card,
                organization: connectMethod.param,
                clientType: connectMethod.clientType,
                loginType: connectMethod.loginType,
                id: dto.id,
                password: encryptCodefAccountPassword(dto.password, dto.id),
            })
            .then((res) => {
                const [account] = lastOf(res.data.accessList, 1);
                return callbackFn ? callbackFn(account) : redirectTo(account);
            })
            .catch((err: ApiErrorResponse<CodefResponse<AccountCreatedResponseDto>>) => {
                const apiError = err.response?.data;
                if (!apiError) return console.error('[codef] apiError is not defined.', err);

                /**
                 * 비즈니스로직 상의 에러인지 확인
                 * - 비즈니스로직의 에러가 아닌 것들을 걸러냅니다.
                 * - 비즈니스로직이 아닌 경우: 네트워크 에러 등
                 */
                const codefError = apiError.data;
                console.log('codefError', codefError);
                if (!codefError) return console.error('[codef] codefError is not defined.', err);

                if (!codefError.result) {
                    /**
                     * 이 곳에서는 순수하게 스코디 비즈니스로직에 의해 발생된 예외만 다룹니다.
                     * 코드에프에서 전달받은 예외는 else 범위 내에서 분기하여 처리됩니다.
                     */
                    if (codefError.data.connectedId && codefError.data.accessList.length) {
                        // 이미 등록된 계정인 경우.
                        redirectTo(codefError.data.accessList[0]);
                        return;
                    }

                    // at least, Unhandled
                    const msg = `[codef] Scordi service exception erupted.\nIt must be handled by catch scope`;
                    console.warn(msg, codefError);
                    return;
                } else {
                    /**
                     * 이 곳에서는 순수하게 코드에프로부터 전달받은 예외에 대해서만 다룹니다.
                     */
                    console.warn(`[codef] ${codefError.result.message}`, codefError);
                    toast.error(codefError.result.message);
                    setErrorMessages(() => {
                        return (codefError.data.errorList || []).map((errorObj) => {
                            return codefErrorCodeToMsg(errorObj.code) || errorObj.message;
                        });
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        isLoading,
        checkExists,
        form,
        createAccount,
        errorMessages,
    };
}
