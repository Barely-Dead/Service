
import React, { useState, useEffect } from 'react';
import { Text, View, Stylesheet, Switch, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { toProperCase } from '../helpers/globalHooks';
import Styles, { colors } from '../Styles';
import { FontAwesome5 } from '@expo/vector-icons';
import ServiceLineItem from '../components/ServiceLineItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ignore = ['id', 'lineItems'];
const type = ['Service', 'Event'];
const lineItem = {
    description: '',
    num: '',
    cost: '',
}

const AddEditService = (props) => {

    const insets = useSafeAreaInsets();

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
        if (service.details == '') { return true }
        return false
    }

    const toggleType = (value) => {
        let s = { ...service };
        if (value == 'Service') { s.type = type[0] }
        if (value == 'Event') { s.type = type[1] }
        setService(s);
    }

    const addLineItem = () => {
        let serviceCopy = { ...service };
        serviceCopy.lineItems.push({...lineItem});
        setService(serviceCopy);
    }

    const _handleLineItem = (index, key, value) => {
        console.log("index:", index, key, value);
        let serviceCopy = {...service};
        serviceCopy.lineItems[index][key] = value;
        console.log(serviceCopy.lineItems[index]);
        setService(serviceCopy);
    }

    return (
        <View style={[Styles.container, { justifyContent: 'space-between', paddingTop: insets.top, paddingBottom: insets.bottom }]}>

            <Text style={Styles.h1}>Add Service</Text>

            <View style={[{ justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={[Styles.h1]}>{props.currentVehicle?.year} &bull; {props.currentVehicle?.make} &bull; {props.currentVehicle?.model}</Text>
                <Text style={[Styles.h2]}>{props.currentVehicle?.licencePlate}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView
                    style={[{}]}
                    contentContainerStyle={[{ flex: 1, justifyContent: 'center' }]}>
                    {Object.keys(service).map((key, index) => {

                        if (ignore.includes(key)) return

                        if (key == 'type') return <View key={index}
                            style={[Styles.row]}>{type.map((item, index) => (
                                <TouchableOpacity key={index}
                                    style={[Styles.textInput, Styles.buttonSelect]} onPress={() => toggleType(item)}>
                                    <Text style={[Styles.buttonSelectText, { color: service.type == item ? colors.barracudaGreenMedium : '#ccc' }]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}</View>


                        return <TextInput
                            style={[Styles.textInput, {

                            }]}
                            key={index}
                            keyboardType={key == 'cost' ? 'number-pad' : 'default'}

                            placeholder={toProperCase(key)}
                            placeholderTextColor="#cccd"
                            onChangeText={(text) => handleInput(key, text)}
                            value={service[key]}
                        >
                        </TextInput>
                    })}

                    {service.lineItems.map((item, index) => (
                        
                            
                                <ServiceLineItem key={index} lineItem={item} index={index} _handleLineItem={_handleLineItem} />
                            
                        
                    ))}

                    <View>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => addLineItem()}>
                            <FontAwesome5 name="plus" size={30} style={{ color: '#9999CC', padding: 10 }} />
                            <Text style={{ textAlign: 'center' }}>Add line item</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <View style={[Styles.row, { width: '100%', justifyContent: 'center' }]}>
                <TouchableOpacity style={[Styles.buttonOval, Styles.buttonCancel]}
                    onPress={() => props.onClose()}>
                    <Text style={[Styles.h1, { textAlign: 'center', color: '#fff' }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.buttonOval, Styles.buttonSave]}
                    disabled={saveButtonStatus()}
                    onPress={() => props._onSave(service)}>
                    <Text style={[Styles.h1, { textAlign: 'center', color: '#fff' }]}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddEditService

