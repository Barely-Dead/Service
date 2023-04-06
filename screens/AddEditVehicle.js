
import React, { useState, useEffect } from 'react';
import { Text, View, Stylesheet, TouchableOpacity, TextInput } from 'react-native';
import { toProperCase } from '../helpers/globalHooks';
import Styles from '../Styles';

const ignore = ['id', 'events', 'services'];
const autoCapitalize = ['vin', 'licencePlate'];
const keyboardType = (key) => {
    switch (key) {
        case 'year':
            return 'number-pad'
        default:
            return 'default'
    }
}

const AddEditVehicle = (props) => {

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
        events: [],
        services: []
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

    return (
        <View style={Styles.container}>

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

            <View style={[Styles.row, { width: '100%', justifyContent: 'space-evenly', padding: 10 }]}>
                {/* Cancel */}
                <TouchableOpacity style={[Styles.buttonOval]}
                    onPress={() => props.onClose()}>
                    <Text style={{ textAlign: 'center' }}>Cancel</Text>
                </TouchableOpacity>

                {/* Save */}
                <TouchableOpacity
                    disabled={saveButtonStatus()}
                    style={[Styles.buttonOval]}
                    onPress={() => props.onSave(vehicle, newVehicle)}>
                    <Text style={{ textAlign: 'center' }}>Save</Text>
                </TouchableOpacity>
            </View>

            {/* Delete */}
            <TouchableOpacity style={[Styles.buttonOval, { width: 200 }]}
                onPress={() => props.onDelete()}>
                <Text style={{ textAlign: 'center' }}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddEditVehicle

