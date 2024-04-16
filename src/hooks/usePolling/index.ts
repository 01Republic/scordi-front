import {delay} from '^components/util/delay';

interface PollingOption<R = any> {
    request: () => Promise<R>;
    requestContinue: (res: R) => boolean;
    requestInterval?: number; // ms
}

export function polling<R = any>(option: PollingOption<R>) {
    const {request, requestInterval = 1000, requestContinue} = option;

    const recursive = async (): Promise<any> => {
        return request().then(async (res) => {
            await delay(requestInterval);
            return requestContinue(res) ? recursive() : res;
        });
    };

    return recursive();
}
