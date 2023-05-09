import { atom } from 'recoil';
export const authStore = atom({
    key: 'authStorekey',
    default: {
        token: '',
        userInfo: {},
    },
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newValue /*, oldValue, isReset*/) => {
                localStorage.setItem('token', newValue.token);
            });
        },
    ],
});
