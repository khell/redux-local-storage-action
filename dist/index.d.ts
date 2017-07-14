import { Action, Dispatch, Store } from 'redux';
export declare const createSyncActionMiddleware: <T>(key: string, originId: number, actionTypeWhitelist?: T[] | undefined) => <S>(store: Store<S>) => (next: Dispatch<Store<S>>) => (reduxAction: Action) => void;
export default createSyncActionMiddleware;
