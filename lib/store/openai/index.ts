import { atom } from 'recoil';
export const openaiStore = atom({
    key: 'openaiStorekey'+Date.now(),
    default: {
        apikey: '',
    },
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newValue /*, oldValue, isReset*/) => {
                localStorage.setItem('openaikey', newValue.apikey);
            });
        },
    ],
});
