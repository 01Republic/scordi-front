import {api} from '^api/api';

export default {
    collectionPath: () => `/biz-ops/progress`,
    memberPath: (key: string) => `/biz-ops/progress/${key}`,

    check(key: string) {
        const url = `${this.memberPath(key)}`;
        return api.get<TaskFileDto>(url, {});
    },
};

export type TaskDto = {
    total: number;
    current: number;
    text: string;
    progress: number;
};

export type TaskFileDto = {
    key: string;
    data: TaskDto;
};

export type ProgressType = {
    inProgress: boolean;
    taskFile: TaskFileDto | null;
};

export const getProgressPercentage = (taskFile: TaskFileDto) => {
    const taskDto = taskFile.data;
    const total = taskDto.total;
    const current = taskDto.current;
    return Math.round((current / total) * 100);
};
