import { Action, Dispatch, Store } from 'redux';

interface Syncable {
    id: number;
    action: Action;
    time: number;
}

let listening = false;

export const createSyncActionMiddleware = <T>(key: string, originId: number, actionTypeWhitelist?: T[]) =>
    <S>(store: Store<S>) => (next: Dispatch<Store<S>>) => (reduxAction: Action) => {
        if (!actionTypeWhitelist || actionTypeWhitelist.find(type => type === reduxAction.type)) {
            window.localStorage.setItem(key, JSON.stringify({
                id: originId,
                action: reduxAction,
                time: Date.now()
            } as Syncable));
        }

        if (!listening) {
            window.addEventListener('storage', (event: StorageEvent) => {
                if (event.key === key && event.newValue) {
                    const { action, id } = JSON.parse(event.newValue) as Syncable;
                    if (originId !== id) {
                        store.dispatch(action);
                    }
                }
            });
            listening = true;
        }

        next(reduxAction);
    };
