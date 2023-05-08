import { atom } from 'recoil';

export const mainStore = atom({
    key: 'mainStore',
    default: {
        light: true,
        barScrollTop: 0,
    },
});
