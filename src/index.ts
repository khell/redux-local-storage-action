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

            // If there is an action already here from before launch, force a new storage event
            let existingAction = window.localStorage.getItem(key);
            if (existingAction) {
                window.localStorage.setItem(key, existingAction);
            }
            
            listening = true;
        }

        next(reduxAction);
    };
