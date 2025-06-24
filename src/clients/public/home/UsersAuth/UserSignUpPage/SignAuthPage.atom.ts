import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
    CreateUserDetailRequestDto,
    CreateUserRequestDto,
    CreateUserResponseDto,
    ErrorResponse,
    JwtContainer,
    PhoneAuthConfirmDto,
    SendPhoneAuthMessageDto,
    UserDto,
    UserGoogleSocialSignUpInvitedRequestDto,
} from '^models/User/types';
import {SignUserApi} from '^models/User/api/session';

// 인증번호 요청
export const useCodeSend = () => {
    const queryClient = useQueryClient();
    return useMutation<boolean, ErrorResponse, SendPhoneAuthMessageDto>({
        mutationFn: (data) => SignUserApi.postPhoneAuthSession(data).then((response) => response.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['sendCode']});
        },
    });
};

// 인증번호 확인
export const useCodeConfirm = () => {
    const queryClient = useQueryClient();
    return useMutation<boolean, ErrorResponse, PhoneAuthConfirmDto>({
        mutationFn: (data) => SignUserApi.patchPhoneAuthSession(data).then((response) => response.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['sendCode']});
        },
    });
};

// 회원가입
export const useCreateUserAuth = () => {
    const queryClient = useQueryClient();
    return useMutation<CreateUserResponseDto, ErrorResponse, {data: CreateUserRequestDto; accessToken?: string}>({
        mutationFn: ({data, accessToken}) =>
            SignUserApi.createUser(data, accessToken) //
                .then((response) => response.data),

        onSuccess: (response) => {
            queryClient.setQueryData(['createUserAuth'], response);
            queryClient.invalidateQueries({queryKey: ['createUserAuth']});
        },
    });
};

/* 초대 회원가입 */
export const useInvitedCreateUserAuth = () => {
    const queryClient = useQueryClient();
    return useMutation<UserDto, ErrorResponse, {data: UserGoogleSocialSignUpInvitedRequestDto; accessToken: string}>({
        mutationFn: ({data, accessToken}) =>
            SignUserApi.invitedCreateUser(data, accessToken) //
                .then((response) => response.data),

        onSuccess: (response) => {
            queryClient.setQueryData(['invitedCreateUserAuth'], response);
            queryClient.invalidateQueries({queryKey: ['invitedCreateUserAuth']});
        },
    });
};

// 로그인
export const useLogin = () => {
    return useMutation<JwtContainer, ErrorResponse, string>({
        mutationFn: (accessToken) => SignUserApi.login(accessToken).then((response) => response.data),
        onSuccess: (response) => {
            localStorage.setItem('token', response.token);
        },
    });
};

// 유저 상세 정보 생성
export const useCreateUserDetailAuth = () => {
    const queryClient = useQueryClient();
    return useMutation<string, ErrorResponse, {data: CreateUserDetailRequestDto; userId: number}>({
        mutationFn: ({data, userId}) =>
            SignUserApi.createUserDetail(data, userId) //
                .then((response) => response.data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['createUserDetail']});
        },
    });
};
