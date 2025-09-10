import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getPopularMovies } from '../api/movieApi';
import { PopularCard } from '../components/PopularCard';
import SearchBar from '../components/SearchBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../../assets/MovieApp/images/bg.png');
type SearchBarNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;
const HomeScreen = () => {
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const navigation = useNavigation<SearchBarNavigationProp>();
  const onSubmit = () => {
    if(!query.trim()) return;
    navigation.navigate('Search', { query });
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getPopularMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={backgroundImage}
        style={styles.backgroundImage}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={styles.loader}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.scroll}
        >
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onSubmit= {onSubmit}
            placeholder="Search movies..."
          />
          <Text style={styles.sectionTitle}>Popular Movies</Text>
          <FlatList
            data={movies}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <PopularCard
                id={item.id}
                title={item.title}
                poster_path={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                vote_average={item.vote_average}
                index={index}
              />
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d1a",
    paddingHorizontal: 16,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
    opacity: 0.2, // làm mờ background
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 12,
  },
  contentContainer: {
    minHeight: "100%",
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  movieCard: {
    marginRight: 14,
    width: 140,
  },
  poster: {
    width: 140,
    height: 210,
    borderRadius: 14,
    backgroundColor: "#222",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6, // đổ bóng trên Android
  },
  movieTitle: {
    color: "#fff",
    marginTop: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieCardGrid: {
    width: "48%",
    marginBottom: 18,
  },
  posterGrid: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    backgroundColor: "#222",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
});
