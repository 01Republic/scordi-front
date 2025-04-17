import {ApiError, errorToast} from '^api/api';
import {teamMemberApi} from '^models/TeamMember/api';
import {useState} from 'react';
import {toast} from 'react-toastify';

export type ExcelUploadState = {
    isLoading: boolean;
    isComplete: boolean;
    errorMsg: string;
};

export const useExcelUpload = (orgId: number) => {
    const [state, setState] = useState<ExcelUploadState>({
        isLoading: false,
        isComplete: false,
        errorMsg: '',
    });

    const resetState = () => setState({isLoading: false, isComplete: false, errorMsg: ''});

    const uploadExcel = async (file: File) => {
        if (!file) return;

        setState((prev: ExcelUploadState) => ({...prev, isLoading: true}));

        try {
            await teamMemberApi.createByExcel(orgId, {file}, (progressEvent) => {
                console.log('progressEvent', progressEvent);
            });
            toast.success(`엑셀 양식에 작성된 구성원을 모두 추가했어요.`);
            setState((prev: ExcelUploadState) => ({...prev, errorMsg: ''}));
        } catch (e) {
            const error = e as ApiError;
            const msg = error.response?.data.message;
            if (msg) {
                setState((prev: ExcelUploadState) => ({...prev, errorMsg: msg}));
            } else {
                errorToast(error);
            }
        } finally {
            setState((prev: ExcelUploadState) => ({...prev, isLoading: false}));
        }
    };

    return {state, uploadExcel, resetState};
};
