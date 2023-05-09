import { atom } from 'recoil';

export const mainStore = atom({
    key: 'mainStorekey',
    default: {
        light: false,
        barScrollTop: 0,
    },
});
