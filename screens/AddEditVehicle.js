
import React, { useState, useEffect } from 'react';
import { Text, View, Stylesheet, TouchableOpacity, TextInput } from 'react-native';
import { toProperCase } from '../helpers/globalHooks';
import Styles, { colors } from '../Styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ignore = ['id', 'services', 'events'];
const autoCapitalize = ['vin', 'licensePlate'];
const keyboardType = (key) => {
    switch (key) {
        case 'year':
            return 'number-pad'
        default:
            return 'default'
    }
}

const AddEditVehicle = (props) => {

    const insets = useSafeAreaInsets();

    const [newVehicle, setNewVehicle] = useState(true);
    const [vehicle, setVehicle] = useState({
        id: 0,
        make: '',
        model: '',
        year: '',
        type: '',
        color: '',
        vin: '',
        licensePlate: '',
        miles: '',
        kilometers: '',
        services: [],
    })

    useEffect(() => {
        if (props.currentVehicle?.make != undefined) {
            setVehicle({ ...props.currentVehicle });
            setNewVehicle(false);
        }
    }, [])

    const handleInput = (key, text) => {
        let vehicleCopy = { ...vehicle };
        vehicleCopy[key] = text;
        setVehicle(vehicleCopy);
    }

    const saveButtonStatus = () => {
        if (vehicle.make == '' || vehicle.model == '') { return true }
        return false
    }

    const pageTitle = () => {
        if (props.currentVehicle?.make != undefined) {
            return "Edit Vehicle"
        }
        return "Add Vehicle"
    }

    return (
        <View style={[Styles.container, { justifyContent: 'space-between', paddingTop: insets.top, paddingBottom: insets.bottom }]}>

            <Text style={Styles.h1}>{pageTitle()}1</Text>

            <View style={[{alignItems: 'center'}]}>
                {Object.keys(vehicle).map((key, index) => {
                    if (ignore.includes(key)) return
                    return <TextInput
                        style={[Styles.textInput, {

                        }]}
                        key={index}
                        keyboardType={keyboardType(key)}
                        autoCapitalize={autoCapitalize.includes(key) ? 'characters' : 'none'}
                        placeholder={toProperCase(key)}
                        placeholderTextColor="#ccc"
                        onChangeText={(text) => handleInput(key, text)}
                        value={vehicle[key]}
                    >
                    </TextInput>


                })}
                {/* Delete */}
                { props.currentVehicle?.make != undefined ?
                <TouchableOpacity style={[Styles.buttonOval, { width: 300, backgroundColor: '#9999CC', marginTop: 20 }]}
                    onPress={() => props.onDelete()}>
                    <Text style={[Styles.h1, { textAlign: 'center', color: colors.barracudaGreenDarkGrey}]}>Delete_</Text>
                </TouchableOpacity> : null }
            </View>



            <View style={[Styles.row, { width: '100%', justifyContent: 'center', padding: 10 }]}>
                {/* Cancel */}
                <TouchableOpacity style={[Styles.buttonOval, Styles.buttonCancel]}
                    onPress={() => props.onClose()}>
                    <Text style={[Styles.h1, { textAlign: 'center', color: '#fff' }]}>Cancel_</Text>
                </TouchableOpacity>

                {/* Save */}
                <TouchableOpacity style={[Styles.buttonOval, Styles.buttonSave]}
                    disabled={saveButtonStatus()}
                    onPress={() => props.onSave(vehicle, newVehicle)}>
                    <Text style={[Styles.h1, { textAlign: 'center', color: '#fff'}]}>Save_</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default AddEditVehicle

