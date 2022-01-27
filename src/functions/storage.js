import EncryptedStorage from "react-native-encrypted-storage";

export const setStorage = async(key, value) => {
    try {
        await EncryptedStorage.setItem(
            key, 
            value
        )
        return true;
    } catch(e) {
     console.warn(e)
     return false;
}}

export const getStorage = async(key) => {
    try {
        let res = await EncryptedStorage.getItem(key);
        return res ? JSON.parse(res) : res;
    } catch(e) {
        console.log('hitting get storage error');
        console.warn(e);
        return false;
    }
}

export const removeStorage = async(key)  => {
    try {
        await EncryptedStorage.removeItem(key)
    } catch(e) {
        console.warn(e)
    }
}

export const clearStorage = async() => {
    try {
        await EncryptedStorage.clear();
    } catch(e) {
        console.warn(e)
    }
}