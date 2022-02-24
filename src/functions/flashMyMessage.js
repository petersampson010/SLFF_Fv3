import { showMessage } from "react-native-flash-message"

export const flashMyMessage = (errorObj, type) => {
    console.log('*** ERROR BEING RECEIVED ***');
    console.log(errorObj);
    if (typeof errorObj === 'string') {
        showMessage({
            type,
            message: errorObj
        });
    } else if (typeof errorObj.Error === 'string') {
        showMessage({
            type,
            message: errorObj.Error
        });
    } else {
        showMessage({
            type,
            message: "Sorry, we are currently facing some technical issues.",
            description: "Please try again later."
        })
    }
}