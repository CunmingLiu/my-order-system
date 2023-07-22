import { Dispatch, useReducer } from 'react';
import { IDataItem } from '~/Types';

export interface IState {
    curPage: number;
    noData: boolean;
    listData: Array<IDataItem>;
}
export interface AppendAction {
    type: 'APPEND';
    payload: {
        listData: Array<IDataItem>;
    };
}
export interface DefaultAction {
    type: 'DEFAULT';
    payload: {
        curPage: number;
        noData: boolean;
    };
}
export type ListAction = AppendAction | DefaultAction;
export const useList = (): [IState, Dispatch<ListAction>] => {
    const [state, dispatch] = useReducer(
        (state: IState, action: ListAction): IState => {
            switch (action.type) {
                case 'APPEND':
                    return {
                        ...state,
                        listData: [...state.listData, ...action.payload.listData],
                    };
                case 'DEFAULT':
                    return { ...state, ...action.payload };
            }
        },
        {
            curPage: 1,
            noData: false,
            listData: [],
        },
    );

    return [state, dispatch];
};
