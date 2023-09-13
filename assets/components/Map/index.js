import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';

export default function MapScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [newMarker, setNewMarker] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleMapPress = (e) => {
    setNewMarker(e.nativeEvent.coordinate);
    toggleModal();
  };

  const handleAddMarker = () => {
    setMarkers([...markers, newMarker]);
    toggleModal();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker} title={`Marker ${index + 1}`} />
        ))}
      </MapView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text>Adicionar Marcador</Text>
          <Button title="Cancelar" onPress={toggleModal} />
          <Button title="Adicionar" onPress={handleAddMarker} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});