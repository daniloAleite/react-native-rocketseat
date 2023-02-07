import { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Partcipant } from '../../components/Participant';
import { styles } from './styles';
export function Home() {
  const [participantList, setParticipantList] = useState(['Danilo']);
  const [inputInfo, setInputInfo] = useState('');

  function handleParticipantAdd() {
    if (participantList.includes(inputInfo)) {
      return Alert.alert(
        'Participante existente',
        `${inputInfo} ja foi cadastrado na lista de participantes!`
      );
    }

    setParticipantList(() => [...participantList, inputInfo]);
    setInputInfo(() => '');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          let newList = participantList;
          const index = participantList.indexOf(name);
          if (index !== -1) {
            newList.splice(index, 1);
            setParticipantList(() => newList);
            Alert.alert('Deletado!');
          }
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
    console.log(participantList);
  }

  useEffect(() => {
    console.log(participantList);
  }, [participantList]);
  return (
    <View style={styles.container}>
      <Text style={styles.enventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Nome do evento teste</Text>
      <View style={styles.form}>
        <TextInput
          value={inputInfo}
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          keyboardType="ascii-capable"
          onChange={(e) => setInputInfo(e.nativeEvent.text.toString())}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd}
          disabled={inputInfo === ''}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={participantList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Partcipant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Não existe participantes cadastrados
          </Text>
        )}
      />
    </View>
  );
}
