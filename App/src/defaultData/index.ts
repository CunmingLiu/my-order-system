import { IDataItem } from '~/Types';

const nameArr = ['Alice', 'July', 'Roman', 'David', 'Sara', 'Lisa', 'Mike'];

export const cartList = [
    {
        id: 0,
        name: '商品0',
        price: 0,
    },
    {
        id: 1,
        name: '商品1',
        price: 1,
    },
    {
        id: 2,
        name: '商品2',
        price: 2,
    },
    {
        id: 3,
        name: '商品3',
        price: 3,
    },
    {
        id: 4,
        name: '商品4',
        price: 4,
    },
];

export const getPageData = (page = 1, pageSize = 10): Array<IDataItem> => {
    if (page > 5) return [];
    const arr: Array<IDataItem> = [];
    for (let i = 0; i < pageSize; i++) {
        arr.push({
            number: i + (page - 1) * pageSize,
            name: `${nameArr[i % nameArr.length]}`,
        });
    }
    return arr;
};
