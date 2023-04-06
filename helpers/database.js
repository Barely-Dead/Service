import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value != null ? value : null
    } catch (e) {
        console.log("error getting value:", e);
    }
}

export const getDataObject = async (key) => {
    try {
        const json = await AsyncStorage.getItem(key)
        return json
    } catch (e) {
        console.log("error getting object:", e);
    }
}

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
        return 200
    } catch (e) {
        console.log("error saving value:", e);
    }
}


export const storeDataObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        return 200
    } catch (e) {
        console.log("error saving object:", e);
    }
}

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    } finally  {
        console.log("deleted")
    }
}

export const defaultEvents = [
    {
        name: 'Puchase',
        purchaseDate: '',
        purchaseAmount: '',
        miles: '',
        km: '',
    },
    {
        name: 'Sold',
        soldDate: '',
        soldmount: '',
        miles: '',
        km: '',
    },
    {
        name: 'Finance Started',
        amountTotal: '',
        amountMonthly: '',
        date: '',
    },
    {
        name: 'Finance Ended',
        amount: '',
        date: '',
    },
    {
        name: 'Lease Started',
        amount: '',
    }
]

export const defaultServices = [
    {
        name: 'Mount and balance tires',
        details: '',
        date: '',
        totalCost: '',
        items: [
            {
                name: 'Mount and Balance',
                details: '',
                number: '1',
                cost: '199.95',
                type: 'labor'
            },
            {
                name: 'Tires',
                details: 'Continental Cross',
                number: '4',
                cost: '279.00',
                type: 'part'
            }

        ]
    }
]