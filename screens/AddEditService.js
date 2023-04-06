
import React, { useState, useEffect } from 'react';
import { Text, View, Stylesheet, Switch, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { toProperCase } from '../helpers/globalHooks';
import Styles from '../Styles';
import { FontAwesome5 } from '@expo/vector-icons';
import ServiceLineItem, { lineItem } from '../components/ServiceLineItem';

const ignore = ['id', 'lineItems'];
const type = ['Service', 'Event'];

const AddEditService = (props) => {

    const [service, setService] = useState({
        type: 'Service',
        date: '',
        details: '',
        totalCost: '',
        lineItems: [],
    })

    const handleInput = (key, text) => {
        let serviceCopy = { ...service };
        serviceCopy[key] = text;
        setService(serviceCopy);
    }

    const saveButtonStatus = () => {
        if (service.name == '') { return true }
        return false
    }

    const toggleType = (value) => {
        let s = { ...service };
        if (value == 'Service') { s.type = type[0] }
        if (value == 'Event') { s.type = type[1] }
        setService(s);
    }

    const addLineItem = () => {
        let serviceCopy = {...service };
        serviceCopy.lineItems.push(lineItem);
        setService(serviceCopy);
    }

    return (
        <View style={[Styles.container, {justifyContent: 'space-between'}]}>

            <View style={[{ justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={[Styles.h1]}>{props.currentVehicle.year} &bull; {props.currentVehicle.make} &bull; {props.currentVehicle.model}</Text>
                <Text style={[Styles.h2]}>{props.currentVehicle.licencePlate}</Text>
            </View>

            <View style={{flex: 1}}>
                <ScrollView>
                {Object.keys(service).map((key, index) => {

                    if (ignore.includes(key)) return

                    if (key == 'type') return <View key={index + '-' + key}
                        style={[Styles.row]}>{type.map((item, index) => (
                            <TouchableOpacity style={[Styles.textInput, Styles.buttonSelect]} onPress={() => toggleType(item)}>
                                <Text style={[Styles.buttonSelectText, { color: service.type == item ? 'coral' : '#ccc' }]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}</View>


                    return <TextInput
                        style={[Styles.textInput, {

                        }]}
                        key={index + '-' + key + '-input'}
                        keyboardType={key == 'cost' ? 'number-pad' : 'default'}

                        placeholder={toProperCase(key)}
                        placeholderTextColor="#777"
                        onChangeText={(text) => handleInput(key, text)}
                        value={service[key]}
                    >
                    </TextInput>
                })}

                {Object.keys(service.lineItems).map((item, index) => (
                    <ServiceLineItem details={item} />
                ))}

                <View>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => addLineItem()}>
                        <FontAwesome5 name="plus" size={30} style={{ color: 'coral', padding: 10 }} />
                        <Text style={{ textAlign: 'center' }}>Add line item</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>

            <View style={[Styles.row, { width: '100%', justifyContent: 'space-evenly' }]}>
                <TouchableOpacity style={[Styles.buttonOval]}
                    onPress={() => props.onClose()}>
                    <Text style={{ textAlign: 'center' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={saveButtonStatus()}
                    style={[Styles.buttonOval]}
                    onPress={() => props.onSave(service)}>
                    <Text style={{ textAlign: 'center' }}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddEditService

