/**
 * @file
 * @date 2023-07-22
 * @author Cunming Liu
 * @lastModify  2023-07-22
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const OrderDetailPage = (): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const { pathname } = useLocation();
    const pathnameValue = String(pathname?.slice(pathname?.lastIndexOf('/') + 1));
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.orderDetailConatiner}>
            <label htmlFor="">订单详情:</label>
            <div>{pathnameValue}</div>
        </div>
    );
};
export default OrderDetailPage;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
