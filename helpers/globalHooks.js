
import { Dimensions } from 'react-native';

// screen info
export const dimensions = {
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height
}

// Get largest number in array
export const getLargestId = (array) => {
    if (array.length == 0) {
        return -1;
    }
   return Math.max(...array.map(item => item.id));
}

// to camel case
export const toCamelCase = (str) => {

}

// to proper case
export const toProperCase = (str) => {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}