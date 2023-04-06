import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { toProperCase } from '../helpers/globalHooks';
import Styles from '../Styles';

const ServiceLineItem = (props) => {

    const [lineItem, setLineItem] = useState({
        description: '',
        num: '',
        cost: '',
    })

    const handleInput = (key, text) => {
        let lineItemCopy = { ...lineItem };
        lineItemCopy[key] = text;
        setLineItem(lineItemCopy);
    }

    const style = (key) => {
        switch (key) {
            case "description":
                return { width: 200 }
                break;
            default:
                return { width: 50 }
                break;
        }
    }

    return (
        <View style={[Styles.row]}>
            {Object.keys(lineItem).map((key, index) => (
                <TextInput
                    style={[Styles.textInput, style(key)]}
                    placeholder={toProperCase(key)}
                    value={lineItem.key}
                    onChangeText={(text) => handleInput(key, text)}
                ></TextInput>
            ))}
        </View>

    )
}

export default ServiceLineItem

export const lineItem = {
    description: '',
    num: '',
    cost: '',
}