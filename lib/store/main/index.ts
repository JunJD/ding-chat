import { atom } from 'recoil';

export const mainStore = atom({
    key: 'mainStorekey'+Date.now(),
    default: {
        light: false,
        barScrollTop: 0,
    },
});
