/**
 * @file
 * @date 2023-07-21
 * @author Cunming Liu
 * @lastModify  2023-07-21
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from 'react';
import styles from './style.scss';
import { Typography } from 'antd';
import { CartItem } from '.';
import { OnCheckedChange } from './useChecked';
import { MinusCircleOutlined } from '@ant-design/icons';
interface Props {
    item: CartItem;
    checked: boolean;
    onCheckedChange: OnCheckedChange<CartItem>;
    onDeleteCommodity: (cartItem: CartItem) => void;
}

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ItemCard = (props: Props): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const { item, checked, onCheckedChange } = props;
    const { name, price } = item;
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        onCheckedChange(item, checked);
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles['item-card']}>
            <div className="check">
                <div className="checkbox-wrap">
                    <input type="checkbox" checked={checked} onChange={onWrapCheckedChange} />
                </div>
                <p className="item-info">
                    {name} <Typography.Text mark>${price}</Typography.Text>
                </p>
            </div>
            <div
                className={styles.deleteCommodity}
                onClick={() => props.onDeleteCommodity(props.item)}
            >
                <MinusCircleOutlined />
            </div>
        </div>
    );
};
export default ItemCard;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
