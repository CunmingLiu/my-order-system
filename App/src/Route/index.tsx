/**
 * @file
 * @date 2023-07-21
 * @author Cunming Liu
 * @lastModify  2023-07-21
 */
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Row, Col } from 'antd';
import style from './style.scss';
/* <------------------------------------ **** Lazy Loading all the pages START **** ------------------------------------ */

const HomePage = React.lazy(() => import(/* webpackChunkName: 'HomePage' */ '../Pages/HomePage'));
const ShopPage = React.lazy(() => import(/* webpackChunkName: 'ShopPage' */ '../Pages/ShopPage'));
const OrderPage = React.lazy(() => import(/* webpackChunkName: 'ShopPage' */ '../Pages/OrderPage'));
const OrderDedtailPage = React.lazy(
    () => import(/* webpackChunkName: 'OrderDedtailPage' */ '../Pages/OrderDetailPage'),
);
/* <------------------------------------ **** Lazy Loading all the pages END **** ------------------------------------ */

const RootRouter = (): JSX.Element => {
    return (
        <Suspense
            fallback={
                /* <------------------------------------ **** Loading Animation START **** ------------------------------------ */
                <div>
                    <div>
                        <Row align="middle">
                            <Col className={style.loadingFormCol}>加载中。。。</Col>
                        </Row>
                    </div>
                </div>
                /* <------------------------------------ **** Loading Animation END **** ------------------------------------ */
            }
        >
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/myOrder" element={<OrderPage />} />
                    <Route path="/orderDetail/:id" element={<OrderDedtailPage />} />
                </Routes>
            </Router>
        </Suspense>
    );
};

export default RootRouter;
