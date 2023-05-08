import { atom } from 'recoil';

export const mainStore = atom({
    key: 'mainStore',
    default: {
        light: false,
        barScrollTop: 0,
    },
});
