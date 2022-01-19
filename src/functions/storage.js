import EncryptedStorage from "react-native-encrypted-storage";

export const setStorage = async(key, value) => {
    try {
        await EncryptedStorage.setItem(
            key, 
            JSON.stringify(value)
        )
    } catch(e) {
     console.warn(e)
}}

export const getStorage = async(key) => {
    try {
        await EncryptedStorage.getItem(key)
    } catch(e) {
        console.warn(e)
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