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
  const participants = [
    'Danilo',
    'Rodrigo',
    'Vini',
    'Biro',
    'Rodrigo1',
    'Vini1',
    'Biro1',
    'Rodrigo2',
    'Vini2',
    'Biro2',
  ];
  function handleParticipantAdd() {
    if (participants.includes('Rodrigo')) {
      return Alert.alert(
        'Participante existente',
        'Ja exite um participante na lista com este nome!'
      );
    }
    console.log('Você clicou no botão adicionar!');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert('Deletado!'),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
    console.log(`Você clicou no botão remover o participante ${name}!`);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.enventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Nome do evento teste</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={participants}
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
