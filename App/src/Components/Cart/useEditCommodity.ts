import { useReducer } from 'react';
import { CartItem } from '.';
import { cartList } from '~/defaultData';
//enum
const DElETE_COMMODITY = 'DElETE_COMMODITy';
const ADD_COMMODITY = 'ADD_COMMODITY';
const SEARCH_COMMODITY = 'SEARCH_COMMODITY';

//action type
type DeleteCDAction = {
    type: typeof DElETE_COMMODITY;
    payload: CartItem;
};

type ADDCDAction = {
    type: typeof ADD_COMMODITY;
};

type SearchCDAction = {
    type: typeof SEARCH_COMMODITY;
    payload: string;
};

//联合action
type Action = DeleteCDAction | ADDCDAction | SearchCDAction;

//reducer
export const useEditCommodity = () => {
    const [cartListState, dispatch] = useReducer((cartList: CartItem[], action: Action) => {
        switch (action.type) {
            case DElETE_COMMODITY: {
                const id = action.payload.id;
                const arr: CartItem[] = cartList?.filter((item) => item.id !== id);
                return [...arr];
            }
            case ADD_COMMODITY: {
                const lastId = cartList[cartList.length - 1].id + 1;
                const arr = cartList;
                arr.push({
                    id: lastId,
                    name: `商品${lastId}`,
                    price: lastId,
                });
                return [...arr];
            }
            case SEARCH_COMMODITY: {
                const reg = new RegExp(action.payload, 'i');
                const arr = cartList.filter((item) => reg.test(item.name));
                return [...arr];
            }
            default: {
                return cartList;
            }
        }
    }, cartList);
    const deleteCartItem = (cartItem: CartItem) => {
        dispatch({
            type: DElETE_COMMODITY,
            payload: cartItem,
        });
    };
    const addCartItem = () => {
        dispatch({
            type: ADD_COMMODITY,
        });
    };
    const searchCartItem = (keyword: string) => {
        dispatch({
            type: 'SEARCH_COMMODITY',
            payload: keyword,
        });
    };
    return {
        deleteCartItem,
        cartListState,
        addCartItem,
        searchCartItem,
    };
};
