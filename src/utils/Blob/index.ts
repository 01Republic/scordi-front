import {AxiosResponse} from 'axios';

export function downloadBlobFile(filename: string, blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

export function downloadBlobFromAxios(filename: string) {
    return (res: AxiosResponse<any, any>) => {
        const blob = new Blob([res.data]);
        downloadBlobFile(filename, blob);
    };
}
