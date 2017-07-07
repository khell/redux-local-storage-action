import { Action, Dispatch, Store } from 'redux';
export declare const createSyncActionMiddleware: (key: string, id: number) => <S>(store: Store<S>) => (next: Dispatch<Store<S>>) => (action: Action) => void;
