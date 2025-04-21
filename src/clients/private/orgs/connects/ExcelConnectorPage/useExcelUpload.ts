import {ApiError, errorToast} from '^api/api';
import {teamMemberApi} from '^models/TeamMember/api';
import {TeamMemberDto} from '^models/TeamMember/type';
import {useState} from 'react';
import {toast} from 'react-toastify';

export type ExcelUploadState = {
    isLoading: boolean;
    isComplete: boolean;
    errorMsg: string;
    data?: TeamMemberDto[];
};

export const useExcelUpload = (orgId: number) => {
    const [state, setState] = useState<ExcelUploadState>({
        isLoading: false,
        isComplete: false,
        errorMsg: '',
        data: undefined,
    });

    const resetState = () => setState({isLoading: false, isComplete: false, errorMsg: '', data: undefined});

    const uploadExcel = async (file: File): Promise<TeamMemberDto[]> => {
        if (!file) return [];

        setState((prev: ExcelUploadState) => ({...prev, isLoading: true}));

        return teamMemberApi
            .createByExcel(orgId, {file}, (progressEvent) => {
                console.log('progressEvent', progressEvent);
            })
            .then((response) => {
                toast.success(`엑셀 양식에 작성된 구성원을 모두 추가했어요.`);
                setState((prev: ExcelUploadState) => ({...prev, errorMsg: '', data: response.data, isComplete: true}));
                return response.data;
            })
            .catch((e) => {
                const error = e as ApiError;
                const msg = error.response?.data.message;
                if (msg) {
                    setState((prev: ExcelUploadState) => ({...prev, errorMsg: msg}));
                } else {
                    errorToast(error);
                }
                throw e;
            })
            .finally(() => {
                setState((prev: ExcelUploadState) => ({...prev, isLoading: false}));
            });
    };

    return {state, uploadExcel, resetState};
};
