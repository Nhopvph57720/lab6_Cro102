// app/(tabs)/Bai2Pokemon.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useLazyGetPokemonByNameQuery } from '../services/pokemonApi';

const Bai2Pokemon = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [trigger, { data, isFetching, error }] = useLazyGetPokemonByNameQuery();

  const handleSearch = () => {
    if (pokemonName.trim() !== '') {
      trigger(pokemonName.toLowerCase());
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thông tin pokemon {pokemonName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên pokemon"
        value={pokemonName}
        onChangeText={setPokemonName}
      />
      <Button title="Tìm kiếm pokemon" onPress={handleSearch} color="#f4a020" />

      {isFetching && <Text>Đang tải dữ liệu...</Text>}
      {error && <Text style={styles.error}>Không tìm thấy pokemon</Text>}
      {data && (
  <View style={styles.result}>
    <Text style={styles.subtitle}>Abilities:</Text>
    {data.abilities.map((item: any, index: number) => (
      <Text key={index}>- {item.ability.name}</Text>
    ))}
  </View>
)}

    </ScrollView>
  );
};

export default Bai2Pokemon;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  result: {
    marginTop: 20,
  },
  subtitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
  }
  
});
