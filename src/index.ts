import { Action, Dispatch, Store } from 'redux';

interface ISyncable {
    id: number;
    action: Action;
    time: number;
}

export const createSyncActionMiddleware = (key: string, id: number) => <S>(store: Store<S>) => (next: Dispatch<Store<S>>) => (action: Action) => {
    window.localStorage.setItem(key, JSON.stringify({
        id,
        action,
        time: Date.now()
    } as ISyncable));

    let originId = id;
    window.addEventListener('storage', (event: StorageEvent) => {
        if (event.key === key && event.newValue) {
            const { action, id } = JSON.parse(event.newValue) as ISyncable;
            if (originId !== id) {
                store.dispatch(action);
            }
        }
    });

    next(action);
}
