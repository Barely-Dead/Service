import React, { useState, useEffect } from 'react';
import { FlatList, Modal, TouchableOpacity, StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { getData, getDataObject, storeDate, storeDataObject, removeItem } from '../helpers/database';
import { dimensions, getLargestId } from '../helpers/globalHooks';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Styles from '../Styles';
import AddEditVehicle from './AddEditVehicle';
import AddEditService from './AddEditService';


const HomeScreen = (props) => {

    const [vehicles, setVehicles] = useState([]);
    const [modalVisibleVehicle, setModalVisibleVehicle] = useState(false);
    const [modalVisibleService, setModalVisibleService] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(0);
    const [disableInteractions, setDisableInteractions] = useState(false);

    useEffect(() => {
        loadVehicles();
        //removeItem('vehicles');
    }, [])

    const loadVehicles = async () => {
        let vs = await getDataObject('vehicles');
        if (vs == null) {
            vs = [] // set new blank array
        } else {
            vs = JSON.parse(vs); // convert from json to obj
        }
        setVehicles(vs);
    }

    const saveVehicle = async (v, newVehicle) => {
        let vs = [...vehicles]; // copy current array
        if (newVehicle) { // new vehicle
            let id = getLargestId(vs); // find largest id
            v.id = id + 1; //set id to largest + 1
            vs = [...vs, v]; // add new record to current array
        }
        if (!newVehicle) { //existing vehicle
            vs[currentVehicle] = v;
        }
        setVehicles([...vs]) // set state
        storeDataObject('vehicles', vs) // save to db
        toggleVehicleModal(); // toggle modal
    }

    const deleteVehicle = () => {
        let vs = [...vehicles];
        try {
            vs.splice(currentVehicle, 1);
        } catch (error) {
            console.error(error);
        } finally {
            console.log("done");
        }
        setVehicles([...vs])
        storeDataObject('vehicles', vs);
        toggleVehicleModal();
    }

    const toggleVehicleModal = () => {
        setModalVisibleVehicle(!modalVisibleVehicle);
    }

    const saveService = async (service) => {
        console.log(service);
        // todo: save
        toggleServiceModal();
    }

    const toggleServiceModal = () => {
        setModalVisibleService(!modalVisibleService);
    }

    const ListHeaderComponent = (item) => (
        <View style={{ width: dimensions.windowWidth, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text style={[Styles.h1]}>{item.year} &bull; {item.make} &bull; {item.model}</Text>
            <Text style={[Styles.h2]}>{item.color} &bull; {item.type}</Text>
            <Text style={[Styles.h2]}>{item.licensePlate} &bull; {item.vin}</Text>
            <Text style={[Styles.h2]}>{item.miles}mi &bull; {item.kilometers}</Text>
        </View>
    )

    const ListEmptyComponent = () => (
        <View style={[{ width: dimensions.windowWidth }]}>
            <Text>no items</Text>
        </View>
    )

    const RenderItem = (item) => (
        <View style={{ flex: 1, width: '100%' }}>
            <Text>test</Text>
        </View>
    )

    const scrollVehicleStart = () => {
        setDisableInteractions(true);
    }

    const scrollVehicleEnd = (offsetX) => {
        setCurrentVehicle(offsetX / dimensions.windowWidth);
        if (offsetX == vehicles.length) {
            setDisableInteractions(true);
            return
        }
        setDisableInteractions(false);

    }



    return (

        <View style={Styles.container}>
            <Modal
                visible={modalVisibleVehicle}
                animationType="slide"
            >
                <AddEditVehicle onClose={toggleVehicleModal} onSave={saveVehicle} onDelete={deleteVehicle} currentVehicle={vehicles[currentVehicle]} />
            </Modal>
            <Modal
                visible={modalVisibleService}
                animationType='slide'
            >
                <AddEditService onClose={toggleServiceModal} onSave={saveService} currentVehicle={vehicles[currentVehicle]} />
            </Modal>
            <View style={{ flex: 1, width: '100%' }}>
                <ScrollView
                    style={[{ flex: 1, width: '100%' }]}
                    contentContainerStyle={[{}]}
                    horizontal={true}
                    pagingEnabled={true}
                    onScrollBeginDrag={(e) => scrollVehicleStart()}
                    onMomentumScrollEnd={(e) => scrollVehicleEnd(e.nativeEvent.contentOffset.x)}
                >
                    {/* <View style={{width: dimensions.windowWidth}}><Text>test</Text></View>
                <View style={{width: dimensions.windowWidth}}><Text>test2</Text></View> */}

                    {vehicles.length > 0 ? vehicles.map((item, index) => {
                        return (
                            // <View key={index.toString()} 
                            // style={{flex: 1, width: '100%'}}>
                            <FlatList
                                key={index.toString()}
                                style={[{}]}
                                contentContainerStyle={[{ flex: 1, width: '100%' }]}
                                Data={item.services}
                                keyExtractor={(item) => item.id.toString()}
                                ListHeaderComponent={ListHeaderComponent(item)}
                                StickyHeaderComponent={true}
                                renderItem={RenderItem}
                                ListEmptyComponent={ListEmptyComponent}
                            />
                            //</View>
                        )
                    }) : null}

                    <View style={[Styles.container, { width: dimensions.windowWidth }]}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => toggleVehicleModal()}>
                            <FontAwesome5 name="plus" size={30} style={{ color: 'coral', padding: 10 }} />
                            
                            <Text style={Styles.h1}>Add Vehicle</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>

            <TouchableOpacity style={[Styles.buttonCircle, Styles.coreShadow, { bottom: 100 }]}
                disabled={disableInteractions}
                onPress={() => toggleServiceModal()}>
                <FontAwesome5 name="wrench" size={22} style={{ color: disableInteractions ? '#ccc' : 'tomato' }} />
            </TouchableOpacity>
            <TouchableOpacity style={[Styles.buttonCircle, Styles.coreShadow]}
                disabled={disableInteractions}
                onPress={() => toggleVehicleModal()}>
                <FontAwesome5 name="car" size={22} style={{ color: disableInteractions ? '#ccc' : 'tomato' }} />
            </TouchableOpacity>
        </View>

    )
}

export default HomeScreen






