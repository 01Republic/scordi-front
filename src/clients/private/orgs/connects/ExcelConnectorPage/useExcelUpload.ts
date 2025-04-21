import {ApiError, errorToast} from '^api/api';
import {teamMemberApi} from '^models/TeamMember/api';
import {useState} from 'react';
import {toast} from 'react-toastify';

interface NewMember {
    name: string;
    email: string;
}

export type ExcelUploadState = {
    isLoading: boolean;
    isComplete: boolean;
    errorMsg: string;
    data?: NewMember[];
};

export const useExcelUpload = (orgId: number) => {
    const [state, setState] = useState<ExcelUploadState>({
        isLoading: false,
        isComplete: false,
        errorMsg: '',
        data: undefined,
    });

    const resetState = () => setState({isLoading: false, isComplete: false, errorMsg: '', data: undefined});

    const uploadExcel = async (file: File): Promise<NewMember[]> => {
        if (!file) return [];

        setState((prev: ExcelUploadState) => ({...prev, isLoading: true}));

        return teamMemberApi
            .createByExcel(orgId, {file}, (progressEvent) => {
                console.log('progressEvent', progressEvent);
            })
            .then((response) => {
                toast.success(`엑셀 양식에 작성된 구성원을 모두 추가했어요.`);
                const newMembers = response.data.map((member) => ({
                    name: member.name,
                    email: member.email || '',
                }));
                setState((prev: ExcelUploadState) => ({...prev, errorMsg: '', data: newMembers, isComplete: true}));
                return newMembers;
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
