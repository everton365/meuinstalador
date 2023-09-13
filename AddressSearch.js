import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolib from 'geolib';

const initialRegion = {
  latitude: -3.736630,
  longitude: -38.525586,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const AddressSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handlePlaceSelected = async (data, details = null) => {
    const selectedAddress = data.description;
    const selectedCoordinates = details.geometry.location;

    // Aqui, você pode chamar a função para encontrar o endereço cadastrado mais próximo.
    // Você precisa passar as coordenadas selecionadas para essa função.
    const closestAddress = await findClosestAddress(selectedCoordinates);

    // Atualize o estado de selectedLocation com o endereço mais próximo
    setSelectedLocation({
      address: selectedAddress,
      coordinates: selectedCoordinates,
      closestAddress: closestAddress.formatted_address,
      closestDistance: closestAddress.distance,
    });
  };

  const findClosestAddress = async (selectedCoordinates) => {
    // Aqui, você pode fazer a lógica para encontrar o endereço cadastrado mais próximo.
    // Por exemplo, você pode ter uma lista de endereços cadastrados e calcular a distância usando a biblioteca Geolib.
    // Para fins de demonstração, vamos criar uma lista fictícia de endereços e encontrar o mais próximo.

    const addresses = [
      { address: 'Endereço 1', latitude: -3.736600, longitude: -38.525600 },
      { address: 'Endereço 2', latitude: -3.736700, longitude: -38.525700 },
      { address: 'Endereço 3', latitude: -3.736800, longitude: -38.525800 },
      // Adicione mais endereços cadastrados aqui
    ];

    let closestAddress = null;
    let closestDistance = Number.MAX_VALUE;

    addresses.forEach((address) => {
      const distance = Geolib.getDistance(selectedCoordinates, {
        latitude: address.latitude,
        longitude: address.longitude,
      });

      if (distance < closestDistance) {
        closestDistance = distance;
        closestAddress = address;
      }
    });

    return {
      formatted_address: closestAddress.address,
      distance: closestDistance,
    };
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Digite seu endereço"
        onPress={handlePlaceSelected}
        query={{
          key: 'AIzaSyCsvZhoZo1j6iZyAoYjApKbkZbgC60Hxc4',
          language: 'pt',
        }}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            position: 'absolute',
            top: Dimensions.get('window').height - 150,
            left: 10,
            right: 10,
            backgroundColor: 'white',
            elevation: 3,
            zIndex: 1,
          },
        }}
      />
      {selectedLocation && (
        <View style={styles.closestAddressContainer}>
          <Text>Closest Address: {selectedLocation.closestAddress}</Text>
          <Text>Distance: {selectedLocation.closestDistance} meters</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closestAddressContainer: {
    marginTop: 16,
  },
});

export default AddressSearch;
