import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location  from 'expo-location';
import Constants from 'expo-constants';
import axios from 'axios'; // Importe a biblioteca axios
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import emailjs from '@emailjs/browser';
import Modal from 'react-native-modal';
import MapScreen from './assets/components/Map';
const Stack = createStackNavigator();
import geolib from 'geolib';
import * as SQLite from 'expo-sqlite';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



const db = SQLite.openDatabase('mydb.db');

const MapButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.mapgridbutton} onPress={onPress}>
      <Text style={styles.smallbuttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const SmallButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.gridbutton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const RoundedButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const TextButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.smallbutton} onPress={onPress}>
      <Text style={styles.smallbuttonText1}>{title}</Text>
    </TouchableOpacity>
  );
};

const Tela1 = ({ navigation }) => {
  return (
    
    <View style={styles.container}>
      <Image
      source={require('./assets/image4.jpg')}
      style={styles.image1}
      />
      <Text style={styles.title}>Monitore seu veiculo ou sua frota em tempo Real!</Text>
     
      <Text style={styles.text}>
      <Icon name="arrow-right" size={20} />LOCALIZAÇÃO DOS VEÍCULOS!</Text>
      <Text style={styles.text}>
      <Icon name="arrow-right" size={20} />STATUS DA IGNIÇÃO!</Text>
      <Text style={styles.text}>
      <Icon name="arrow-right" size={20} />VELOCIDADE DOS VEÍCULOS!</Text>
      <Text style={styles.text}></Text>
      
      <ScrollView>
      <View style={styles.containerForm}>
      <RoundedButton title="Pedir instalação" onPress={() => navigation.navigate('Tela7')} />
      <RoundedButton title="Ser instalador parceiro" onPress={() => navigation.navigate('Tela4')} />
      <RoundedButton title="Fazer um orçamento" onPress={() => navigation.navigate('Tela5')} />
      <RoundedButton title="Ponto de instalação mais proximo" onPress={() => navigation.navigate('Maps')} />
      <RoundedButton title="Estabelecimento" onPress={() => navigation.navigate('Tela10')} />
      <RoundedButton title="Mais informação" onPress={() => navigation.navigate('Tela9')} />
      
      {/* Adicione os outros botões aqui */}
      </View>
      </ScrollView>
    </View>
    
  );
};


// Tela de login
const Tela2 = ({ navigation }) =>  {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');



  async function sendForm() {
    try {
      const response = await fetch('http://192.168.0.165:3000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email, // Supondo que 'nome' e 'senha' contêm os valores corretos
          senha: senha
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        // Acesso autorizado, você pode lidar com a resposta e o usuário autenticado aqui
        navigation.navigate('Tela2');
      } else {
        // Acesso negado, você pode lidar com a resposta de erro aqui
        Alert.alert('Email ou senha incorretos.', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  return (
    
      <View style={styles.container}>
         <ScrollView>
    <Image
    source={require('./assets/image3.jpg')}
    style={styles.image}
    />
      <Text style={styles.title}>Seu veiculo na palma da sua mão!</Text>
    
      <View style={styles.containerForm1}>
      
      <Text style={styles.title}>Fazer Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        />
        <TextInput
        style={styles.input}
        placeholder="senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}      
      />
      <SmallButton title="entra" onPress={()=>sendForm()}/>
      
       <Text style={styles.smalltext}>Não tem uma conta?</Text>
      <TextButton title="Click aqui!" onPress={() => navigation.navigate('Tela3')} />
      </View>
      
      </ScrollView>
      
      
    </View>
    
  );
}
// Tela cadastro
const Tela3 = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  

  async function sendCadastro() {
    // Check if any of the mandatory fields are empty
    if (!nome || !estado || !cidade || !email || !senha) {
      Alert.alert('Campos obrigatórios não preenchidos', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    try {
      const response = await fetch('http://192.168.0.165:3000/cadastrar-usuario', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome,
          estado: estado,
          cidade: cidade,
          email: email,
          senha: senha
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        // Cadastro bem-sucedido, você pode lidar com a resposta aqui, se necessário
        navigation.navigate('Tela1'); // Navegue para a próxima tela após o cadastro
      } else {
        // Erro no cadastro, você pode lidar com a resposta de erro aqui
        console.error('Erro ao cadastrar:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    }
  }
  
  return (
    <View style={styles.gridcontainer}>
      <ScrollView>
       <Text style={styles.title}>Criar uma conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
      <SmallButton title="Cadastrar" onPress={sendCadastro} />
      </ScrollView>
    </View>
  );
};
// instalador parceiro
const Tela4 = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [estado, setEstado] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [telefone, setTelefone] = useState(null);
  
  async function sendCadastrotecnico() {
    // Check if any of the mandatory fields are empty
    if (!nome || !cpf || !endereco || !cidade || !empresa || !telefone) {
      Alert.alert('Campos obrigatórios não preenchidos', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    try {
      const response = await fetch('http://192.168.0.165:3000/cadastro-tecnico', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          endereco: endereco,
          estado: estado,
          cidade: cidade,
          empresa: empresa,
          telefone: telefone
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        // Cadastro bem-sucedido, você pode lidar com a resposta aqui, se necessário
        navigation.navigate('Tela1'); // Navegue para a próxima tela após o cadastro
      } else {
        // Erro no cadastro, você pode lidar com a resposta de erro aqui
        console.error('Erro ao cadastrar:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    }
  }
  return (
    <View style={styles.gridcontainer}>
      <ScrollView>
       <Text style={styles.title}>Cadastro Instalador parceiro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Empresa"
        value={empresa}
        onChangeText={setEmpresa}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      
      <SmallButton title="Cadastrar" onPress={sendCadastrotecnico} />
      </ScrollView>
    </View>
  );
};

//Orçamento
const Tela5 = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  async function sendOrcamento() {
    // Check if any of the mandatory fields are empty
    if (!nome || !estado || !cidade || !telefone || !email || !modelo || !ano  ) {
      Alert.alert('Campos obrigatórios não preenchidos', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    try {
      const response = await fetch('http://192.168.0.165:3000/orcamento', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome,
          estado: estado,
          cidade: cidade,
          telefone: telefone,          
          email: email,
          modelo: modelo,
          ano: ano
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        // Cadastro bem-sucedido, você pode lidar com a resposta aqui, se necessário
        navigation.navigate('Tela2'); // Navegue para a próxima tela após o cadastro
      } else {
        // Erro no cadastro, você pode lidar com a resposta de erro aqui
        console.error('Erro ao cadastrar:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    }
  }

  return (
    <View style={styles.gridcontainer}>
      <Text style={styles.title}>Orçamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo do veiculo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano de frabicação do veiculo"
        value={ano}
        onChangeText={setAno}
      />
      <SmallButton title="Enviar" onPress={sendOrcamento} />
    </View>
  );
};

const Tela6 = () => {
  return (
    <View style={styles.container}>
      {/* Conteúdo da Tela 4 */}
    </View>
  );
};

  //Pedir instalação em Domicilio
const Tela7 = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  
  

  async function sendDomicilio() {
    // Check if any of the mandatory fields are empty
    if (!nome || !cpf || !endereco || !cidade|| !estado || !telefone || !email ) {
      Alert.alert('Campos obrigatórios não preenchidos', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    try {
      const response = await fetch('http://192.168.0.165:3000/Domicilio', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          endereco: endereco,
          estado: estado,
          cidade: cidade,
          telefone: telefone,
          email: email
          
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        // Cadastro bem-sucedido, você pode lidar com a resposta aqui, se necessário
        navigation.navigate('Tela2'); // Navegue para a próxima tela após o cadastro
      } else {
        // Erro no cadastro, você pode lidar com a resposta de erro aqui
        console.error('Pedido ja enviado:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    }
  }
 
  return (
    <View style={styles.gridcontainer}>
      <ScrollView>
       <Text style={styles.title}>Enviar pedido</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        />
        <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
       <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
     
      <TextInput
        style={styles.input}
        placeholder="Número de telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <SmallButton title="Enviar" onPress={sendDomicilio} />
      </ScrollView>
    </View>
  );
};

// cadastro de tecnicos e pontos de instalação
const Tela8 = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [estado, setEstado] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [telefone, setTelefone] = useState(null);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    // Função para obter a localização do usuário
    const obterLocalizacaoUsuario = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão de localização não concedida');
          return;
        }

        let localizacao = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = localizacao.coords;

        // Preencha automaticamente os campos de latitude e longitude
        setLatitude(latitude);
        setLongitude(longitude);
      } catch (error) {
        console.log('Erro ao obter localização', error);
      }
    };

    // Chame a função para obter a localização do usuário quando a tela for montada
    obterLocalizacaoUsuario();
  }, []);

  async function sendCadastrotecnico() {
    // Verifique se algum dos campos obrigatórios está vazio
    if (!nome || !cpf || !endereco || !cidade || !empresa || !telefone) {
      Alert.alert('Campos obrigatórios não preenchidos', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.165:3000/cadastro-tecnico', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          endereco: endereco,
          estado: estado,
          cidade: cidade,
          empresa: empresa,
          telefone: telefone,
          latitude: latitude,
          longitude: longitude,
          
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Cadastro bem-sucedido, você pode lidar com a resposta aqui, se necessário
        navigation.navigate('Tela2'); // Navegue para a próxima tela após o cadastro
      } else {
        // Erro no cadastro, você pode lidar com a resposta de erro aqui
        console.error('empresa ja cadastrada:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    }
  }

  return (
    <View style={styles.gridcontainer}>
      <ScrollView>
        <Text style={styles.title}>Cadastro Instalador parceiro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={estado}
          onChangeText={setEstado}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          style={styles.input}
          placeholder="Empresa"
          value={empresa}
          onChangeText={setEmpresa}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de telefone"
          value={telefone}
          onChangeText={setTelefone}
        />

        {/* Campos para informações do marcador */}
        <TextInput
          style={styles.input}
          placeholder="Latitude do Marcador"
          value={latitude.toString()}
          editable={false}
          onChangeText={(text) => setLatitude(parseFloat(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude do Marcador"
          value={longitude.toString()}
          editable={false}
          onChangeText={(text) => setLongitude(parseFloat(text))}
        />

        <SmallButton title="Cadastrar" onPress={sendCadastrotecnico} />
      </ScrollView>
    </View>
  );
};
  
//Mais Informações
const Tela9 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>informações sobre o Rastreamento veicular</Text>
      <Text style={styles.text}>
 O rastreador veicular funciona através de tecnologia de geolocalização, 
assim como o rastreador para moto, no qual é permitido que uma central de monitoramento, ou ao 
próprio dono do veículo, saiba onde o veículo está.
</Text>
<Text style={styles.text}>
°Para isso,  é necessário alguns passos;</Text>
<Text style={styles.text}>
°Um pequeno equipamento é instalado no veículo;</Text>
<Text style={styles.text}>
°Este equipamento emite um sinal via satélite, transmitindo-o via internet;</Text>
<Text style={styles.text}>
°O sinal envia as coordenadas geográficas à central ou ao celular;</Text>

<Text style={styles.text}>
Essas informações são mostradas em um mapa, para que seja possível localizar o veículo.
Além de uma localização mais rápida e mais precisa do veículo, o rastreador veicular traz mais 
segurança para a vida dos pilotos e motoristas, afinal, é possível localizar o veículo até em casos de
 sequestros.</Text>
 
      </ScrollView>
    </View>
  );
};
// Tela do Maps
function Tela10() {
  const [marcadores, setMarcadores] = useState([]);
  const [localizacao, setLocalizacao] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obterLocalizacao = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão de localização não concedida');
          return;
        }
  
        // Iniciar a atualização contínua da localização do usuário
        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 5000 }, // Configuração de precisão e intervalo de atualização (5 segundos neste exemplo)
          localizacao => {
            setLocalizacao(localizacao.coords);
          }
        );

        setIsLoading(false); // Informamos que as informações de localização estão disponíveis
      } catch (error) {
        console.log('Erro ao obter localização', error);
        setIsLoading(false); // Mesmo em caso de erro, informamos que as informações de localização estão disponíveis
      }
    };

    // Chame a função para obter a localização do usuário quando a tela for montada
    obterLocalizacao();

    // Fazer a requisição para a rota /marcadores e atualizar o estado com os dados
    fetch('http://192.168.0.165:3000/marcadores')
      .then(response => response.json())
      .then(data => {
        setMarcadores(data);
      })
      .catch(error => {
        console.error('Erro ao buscar marcadores:', error);
      });
  }, []);

  // Renderizar um indicador de carregamento enquanto as informações de localização são obtidas
  if (isLoading || localizacao === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Obtendo localização...</Text>
      </View>
    );
  }

  // Após as informações de localização estarem disponíveis, renderizar o mapa
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        initialRegion={{
          latitude: localizacao.latitude,
          longitude: localizacao.longitude,
          latitudeDelta: 0.09922,
          longitudeDelta: 0.09421,
        }}
      >
        {marcadores.map(marcador => (
          <Marker
            key={marcador.id}
            coordinate={{
              latitude: marcador.latitude,
              longitude: marcador.longitude,
            }}
            title={marcador.empresa}
          />
        ))}
      </MapView>
    </View>
  );
}



const Meuapp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela1" component={Tela2} options={{ title: 'Bem-vindo ao app meu intalador' }} />
        <Stack.Screen name="Tela2" component={Tela1} options={{ title: 'Tela 2' }} />
        <Stack.Screen name="Tela3" component={Tela3} options={{ title: 'Tela 3' }} />
        <Stack.Screen name="Tela4" component={Tela4} options={{ title: 'Tela4' }} />
        <Stack.Screen name="Tela5" component={Tela5} options={{ title: 'Tela5' }} />
        <Stack.Screen name="Tela6" component={Tela6} options={{ title: 'Tela 6' }} />
        <Stack.Screen name="Tela7" component={Tela7} options={{ title: 'Pedir instalação em domicílio' }} />
        <Stack.Screen name="Tela10" component={Tela8} options={{ title: 'Tela 8' }} />
        <Stack.Screen name="Tela9" component={Tela9} options={{ title: 'Tela 9' }} />
        <Stack.Screen name="Maps" component={Tela10} options={{ title: 'MAPS' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    flexWrap: 'wrap',
    
  },
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    flexWrap: 'wrap',
    
  },
  gridcontainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    
},
 smallcontainer:{
    flex: 1,
     justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    paddingStart: 10,
    paddingEnd: 20,
    padding: 60,
    widthStart: 10,
    height: 50, 
    backgroundColor: '#FFFFFF',
    
},

text: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#000000', // Corrigido para 'color'
},
  button: {
    backgroundColor: '#030091',
    margin: 8,
    width: '44%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  smallbutton: {
    backgroundColor: '#FFFFFF',
    margin: 1,
    width: '40%',
    height: 25,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
  },
  gridbutton: {
    backgroundColor: '#6007BA',
    margin: 8,
    width: '40%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
   smallbuttonText1: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FF0C00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    color: '#000000',
    justifyContent: 'flex-start',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    justifyContent: 'flex-start',
    position: 'absolute',
    width: '100%', // Defina a largura desejada da imagem
    height: 250,
  },
  image1: {
    justifyContent: 'flex-start',
    position: 'absolute',
    width: '100%', // Defina a largura desejada da imagem
    height: 250, // Defina a altura desejada da imagem
    // Você pode ajustar isso para se adequar ao layout desejado
   
    marginTop: 0,
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
   searchContainer: {
    position: 'absolute',
    top: Constants.statusBarHeight + 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
   map: {
    width: 400,
    height:300,
  },
  containerForm: {
    
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderToprRightRadius: 40,
    paddingStart: 10,
    paddingEnd: 10,
    padding: 30,
    widthStart: 30,
     height: 600, 
   },
   containerForm1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    
    borderTopLeftRadius: 50,
    borderToprRightRadius: 40,
    paddingStart: 10,
    paddingEnd: 10,
    padding: 30,
    widthStart: 30,
     height: 600, 
   },
   controls: {
    padding: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '34%',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  locationInfo: {
    padding: 10,
    alignItems: 'center',
  },
  label: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mapgridbutton: {
    backgroundColor: '#2200FF',
    margin: 8,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  smallbuttonText: {
    color: '#FFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  smalltext: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  Button: {
    backgroundColor: '#FFFFF',
    margin: 8,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

});


export default Meuapp;
