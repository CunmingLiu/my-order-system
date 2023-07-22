/**
 * @file 懒加载列表(无限滚动列表)
 * @date 2023-07-22
 * @author Cunming Liu
 * @lastModify  2023-07-22
 */
import React, { useCallback, useEffect, useRef } from 'react';
import { getPageData } from '~/defaultData';
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import styles from './style.scss';
import { useList } from './useList';
import { useNavigate } from 'react-router-dom';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

export interface IProps {
    curPageSize?: number;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
const LazyList: React.FC = ({ curPageSize = 10 }: IProps) => {
    /* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const clientRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLUListElement | null>(null);
    const [state, dispatch] = useList();
    const navigate = useNavigate();
    /**
     * @method handleScroll
     * @description: 滚动事件监听
     */
    const handleScroll = useCallback(() => {
        if (!scrollRef.current || !clientRef.current) {
            return;
        }
        const { clientHeight: wrapperHeight } = scrollRef.current;
        const { scrollTop, clientHeight } = clientRef.current;
        // 当临界元素进入可视范围时,加载下一页数据
        if (!state.noData && wrapperHeight - scrollTop <= clientHeight) {
            const newData = getPageData(state.curPage, curPageSize);
            dispatch({
                type: 'APPEND',
                payload: { listData: newData },
            });
            dispatch({
                type: 'DEFAULT',
                payload: {
                    curPage: state.curPage + 1,
                    noData: !(newData.length > 0),
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.curPage, state.noData]);

    useEffect(() => {
        const newData = getPageData(1, curPageSize);
        dispatch({
            type: 'APPEND',
            payload: { listData: newData },
        });
        dispatch({
            type: 'DEFAULT',
            payload: {
                curPage: 2,
                noData: !(newData.length > 0),
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const handleEnterDetail = (orderName: string) => {
        navigate(`/orderDetail/${orderName}`);
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.wrapper} ref={clientRef} onScroll={handleScroll}>
            <ul className={`${styles.container} list-group`} ref={scrollRef}>
                {state.listData.map(({ number, name }) => (
                    <li
                        key={number}
                        className={`${
                            number % 2 === 0 ? styles['green-item'] : styles['red-item']
                        } list-group-item`}
                        onClick={() => handleEnterDetail(name)}
                    >
                        {number}-{name}
                    </li>
                ))}
                {<li>{state.noData ? 'no more' : 'scroll'}</li>}
            </ul>
        </div>
    );
};
export default LazyList;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
