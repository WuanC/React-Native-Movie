import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const mockMovies = [
  { id: "1", title: "Moana 2", poster: "https://image.tmdb.org/t/p/w500/2.jpg" },
  { id: "2", title: "Thor", poster: "https://image.tmdb.org/t/p/w500/3.jpg" },
  { id: "3", title: "Avatar", poster: "https://image.tmdb.org/t/p/w500/4.jpg" },
];
const HomeScreen = () => {
    return (
<ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🎬 MyMovieApp</Text>
        <View style={styles.avatar} />
      </View>

      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search through 200k+ movies online"
        placeholderTextColor="#999"
      />

      {/* Popular movies */}
      <Text style={styles.sectionTitle}>Popular movies</Text>
      <FlatList
        data={mockMovies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <Image source={{ uri: item.poster }} style={styles.poster} />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
      />

      {/* Latest movies */}
      <Text style={styles.sectionTitle}>Latest movies</Text>
      <View style={styles.grid}>
        {mockMovies.map((item) => (
          <View key={item.id} style={styles.movieCardGrid}>
            <Image source={{ uri: item.poster }} style={styles.posterGrid} />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d1a",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#444",
  },
  searchBar: {
    backgroundColor: "#1a1a2e",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  movieCard: {
    marginRight: 12,
    width: 120,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  movieTitle: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieCardGrid: {
    width: "48%",
    marginBottom: 16,
  },
  posterGrid: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});