import store from "store";

export const userCxtStore = {
    set(user) {
        store.set('user', user);
    },
    get() {
        return store.get('user');
    }
}

export const isSheduledLogout = {
    set(val) {
        store.set('sheduledLogout', val);
    },
    get() {
        return store.get('sheduledLogout');
    }
}
