import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { toProperCase } from '../helpers/globalHooks';
import Styles from '../Styles';

const ServiceLineItem = (props) => {



    const handleInput = (key, value) => {
        props._handleLineItem(props.index, key, value);
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
            {Object.keys(props.lineItem).map((key, index) => (
                <TextInput
                    key={index}
                    style={[Styles.textInput, style(key)]}
                    placeholder={toProperCase(key)}
                    value={props.lineItem[key]}
                    onChangeText={(text) => handleInput(key, text)}
                ></TextInput>
            ))}
        </View>

    )
}

export default ServiceLineItem
