import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
    CreateInvitedUserRequestDto,
    CreateUserDetailRequestDto,
    CreateUserRequestDto,
    CreateUserResponseDto,
    ErrorResponse,
    JwtContainer,
    PhoneAuthConfirmDto,
    SendPhoneAuthMessageDto,
    UserDto,
    UserGoogleSocialSignUpInvitedRequestDto,
    UserLoginRequestDto,
    UserSocialSignUpRequestDto,
} from '^models/User/types';
import {SignUserApi, userApi, userSessionApi} from '^models/User/api/session';
import {AxiosResponse} from 'axios';
import {useCurrentUser} from '^models/User/hook';
import {inviteMembershipApi} from '^models/Membership/api';

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

/* 초대 이메일,비밀번호 회원가입 */
export const useJoinInvitedCreateUserAuth = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateInvitedUserRequestDto) =>
            SignUserApi.createByLocalInvitation(data).then((response) => response.data),
        onSuccess: (response) => {
            queryClient.setQueryData(['JoinInvitedCreateUserAuth'], response);
        },
        onError: (error: any) => {
            throw error;
        },
    });
};

// 구글 로그인
export const useGoogleLogin = () => {
    return useMutation<JwtContainer, ErrorResponse, string>({
        mutationFn: (accessToken) => SignUserApi.login(accessToken).then((response) => response.data),
        onSuccess: (response) => {
            localStorage.setItem('accessToken', response.token);
        },
        onError: (error: any) => {
            throw error;
        },
    });
};

//이메일,패스워드 로그인
export const useLogin = () => {
    return useMutation({
        mutationFn: (data: UserLoginRequestDto) => userSessionApi.create(data).then((res) => res.data),
        onSuccess: (response) => {
            localStorage.setItem('accessToken', response.token);
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

// 유저 정보 조회
export const useUser = () => {
    const {setCurrentUser, loginRedirect} = useCurrentUser(null);
    return useMutation<UserDto, ErrorResponse, void>({
        mutationFn: () => userSessionApi.index().then((response) => response.data),
        onSuccess: (response) => {
            localStorage.setItem('locale', response?.locale ?? 'ko');
            setCurrentUser(response);
            loginRedirect(response);
        },
    });
};

// 초대된 유저가 맞는지 확인 요청
export const useCheckInvitedUser = (orgId: number, email: string) => {
    return useQuery({
        queryKey: ['invitedCreateUserAuth'],
        queryFn: () => inviteMembershipApi.validate(orgId, email).then((res) => res.data),
        enabled: !!email && !!orgId,
        retry: false,
    });
};
