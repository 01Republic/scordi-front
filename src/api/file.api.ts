import {api} from '^api/api';

export type UploadFileDto = {
    // 파일
    file: File | Blob;
};

export class FileDto {
    dir: string;
    filename: string;
    mimetype: string;
    size: number;
    url: string;
    key: string;
    bucket: string;
    etag: string;
}

export const fileApi = {
    upload(data: UploadFileDto) {
        const url = `/files`;
        const headers = {'Content-Type': 'multipart/form-data'};
        return api.post<FileDto>(url, data, {headers}).then((res) => res.data);
    },
};
