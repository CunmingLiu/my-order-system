/**
 * @file
 * @date 2023-07-21
 * @author Cunming Liu
 * @lastModify  2023-07-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState } from 'react';
import styles from './style.scss';
import { List, Typography } from 'antd';
import { useChecked } from './useChecked';
import ItemCard from './ItemCard';
import { useEditCommodity } from './useEditCommodity';
import { PlusCircleOutlined } from '@ant-design/icons';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface CartItem {
    id: number;
    name: string;
    price: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Cart = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const [inputValue, setInputValue] = useState('');
    const { cartListState, deleteCartItem, addCartItem, searchCartItem } = useEditCommodity();
    const { checkedAll, checkedMap, onCheckedAllChange, onCheckedChange, filterChecked } =
        useChecked(cartListState);

    // cartItems的积分总和
    const sumPrice = (cartItems: CartItem[]) => {
        return cartItems && cartItems.reduce((sum, cur) => sum + cur.price, 0);
    };

    const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkAll = e.target.checked;
        onCheckedAllChange(checkAll);
    };

    const total = sumPrice(filterChecked() as CartItem[]);

    const Footer = (
        <div className={styles.footer}>
            <div className={styles['check-all']}>
                <input checked={checkedAll} onChange={onWrapCheckedAllChange} type="checkbox" />
                全选
            </div>
            <div>
                价格总计 <Typography.Text mark>${total}</Typography.Text>
            </div>
        </div>
    );
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const onSearchCD = () => {
        const value = inputValue.trim();
        value && searchCartItem(value);
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.cart}>
            <List
                header={
                    <div className={styles.headerContainer}>
                        <div className={styles.searchCommodity}>
                            <span>购物车</span>
                            <div className={styles.searchBtnContainer}>
                                <input
                                    value={inputValue}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setInputValue(value);
                                    }}
                                    className={styles.searchInput}
                                ></input>
                                <span className={styles.searchText} onClick={onSearchCD}>
                                    搜索
                                </span>
                            </div>
                        </div>
                        <div className={styles.addCommodity} onClick={addCartItem}>
                            <PlusCircleOutlined />
                        </div>
                    </div>
                }
                footer={Footer}
                bordered
                dataSource={cartListState}
                renderItem={(item) => {
                    const checked = checkedMap[item.id] || false;
                    return (
                        <List.Item>
                            <ItemCard
                                item={item}
                                checked={checked}
                                onCheckedChange={onCheckedChange}
                                onDeleteCommodity={deleteCartItem}
                            />
                        </List.Item>
                    );
                }}
            />
        </div>
    );
};
export default Cart;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
