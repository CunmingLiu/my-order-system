/**
 * @file project index file
 * @date 2020-09-22
 * @author Frank
 * @lastModify Frank 2020-09-22
 */
import React from 'react';
import RootRouter from './Route';
import { Provider } from 'react-redux';
import store from './Store/rootStore';
import { createRoot } from 'react-dom/client';
import './global.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = container && createRoot(container); // createRoot(container!) if you use TypeScript
root &&
    root.render(
        <Provider store={store}>
            <RootRouter />
        </Provider>,
    );
