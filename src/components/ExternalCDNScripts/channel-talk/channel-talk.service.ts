import {Appearance, BootOption, Callback, EventProperty, FollowUpProfile, UpdateUserInfo} from './channel-talk.type';

const DO_NOT_RUN_IF_URL_INCLUDE_THIS = ['/admin'];

class ChannelService {
    public isBooted = false;

    loadScript() {
        if (typeof window === 'undefined') return;
        if (DO_NOT_RUN_IF_URL_INCLUDE_THIS.some((blocker) => window.location.href.includes(blocker))) return;
        (function () {
            const w = window;
            if (w.ChannelIO) {
                return w.console.error('ChannelIO script included twice.');
            }
            const ch = function () {
                ch.c(arguments);
            };
            ch.q = [] as any[];
            ch.c = function (args: any) {
                ch.q.push(args);
            };
            w.ChannelIO = ch;
            function l() {
                if (w.ChannelIOInitialized) {
                    return;
                }
                w.ChannelIOInitialized = true;
                const s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
                const x = document.getElementsByTagName('script')[0];
                if (x.parentNode) {
                    x.parentNode.insertBefore(s, x);
                }
            }
            if (document.readyState === 'complete') {
                l();
            } else {
                w.addEventListener('DOMContentLoaded', l);
                w.addEventListener('load', l);
            }
        })();
    }

    boot(option: BootOption, callback?: Callback) {
        if (this.isBooted) return;
        window.ChannelIO?.('boot', option, callback);
        this.isBooted = true;
    }

    shutdown() {
        window.ChannelIO?.('shutdown');
    }

    showMessenger() {
        window.ChannelIO?.('showMessenger');
    }

    hideMessenger() {
        window.ChannelIO?.('hideMessenger');
    }

    openChat(chatId?: string | number, message?: string) {
        window.ChannelIO?.('openChat', chatId, message);
    }

    track(eventName: string, eventProperty?: EventProperty) {
        window.ChannelIO?.('track', eventName, eventProperty);
    }

    onShowMessenger(callback: () => void) {
        window.ChannelIO?.('onShowMessenger', callback);
    }

    onHideMessenger(callback: () => void) {
        window.ChannelIO?.('onHideMessenger', callback);
    }

    onBadgeChanged(callback: (alert: number) => void) {
        window.ChannelIO?.('onBadgeChanged', callback);
    }

    onChatCreated(callback: () => void) {
        window.ChannelIO?.('onChatCreated', callback);
    }

    onFollowUpChanged(callback: (profile: FollowUpProfile) => void) {
        window.ChannelIO?.('onFollowUpChanged', callback);
    }

    onUrlClicked(callback: (url: string) => void) {
        window.ChannelIO?.('onUrlClicked', callback);
    }

    clearCallbacks() {
        window.ChannelIO?.('clearCallbacks');
    }

    updateUser(userInfo: UpdateUserInfo, callback?: Callback) {
        window.ChannelIO?.('updateUser', userInfo, callback);
    }

    addTags(tags: string[], callback?: Callback) {
        window.ChannelIO?.('addTags', tags, callback);
    }

    removeTags(tags: string[], callback?: Callback) {
        window.ChannelIO?.('removeTags', tags, callback);
    }

    setPage(page: string) {
        window.ChannelIO?.('setPage', page);
    }

    resetPage() {
        window.ChannelIO?.('resetPage');
    }

    showChannelButton() {
        window.ChannelIO?.('showChannelButton');
    }

    hideChannelButton() {
        window.ChannelIO?.('hideChannelButton');
    }

    setAppearance(appearance: Appearance) {
        window.ChannelIO?.('setAppearance', appearance);
    }
}

export default new ChannelService();
