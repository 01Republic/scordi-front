import {NextFetchEvent, NextRequest} from 'next/server';
import {accessLog} from '^utils/log';

export function middleware(request: NextRequest, event: NextFetchEvent) {
    accessLog(request, event);
}
