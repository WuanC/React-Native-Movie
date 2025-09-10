import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Button,
  Text,
} from 'react-native';
import { getSearchMovies } from '../api/movieApi';
import SearchBar from '../components/SearchBar';
import { PopularCard } from '../components/PopularCard';

const backgroundImage = require('../../assets/MovieApp/images/bg.png');

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const SearchScreen = () => {
  const route = useRoute();
  const initialQuery = (route.params as any)?.query || '';

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentpage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [results, setResults] = useState<Movie[]>([]);

  const searchMovies = async (page: number = 1) => {
    console.log('Searching for:', query, 'Page:', page);
    if (!query.trim()) return;
    try {
      setLoading(true);
      const response = await getSearchMovies(query, page);
      setResults(response.data.results);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      searchMovies();
    }
  }, [initialQuery]);

  return (
    <View style={styles.container}>
      {/* Background */}
      <Image
        resizeMode="cover"
        source={backgroundImage}
        style={styles.backgroundImage}
      />

      {/* Search bar */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmit={() => searchMovies()}
          placeholder="Search movies..."
        />
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <View style={styles.cardWrapper}>
                <PopularCard
                  id={item.id}
                  title={item.title}
                  poster_path={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  vote_average={item.vote_average}
                  index={index}
                />
              </View>
            )}
          />

          {/* Pagination */}
          {results.length > 0 && (
            <View style={styles.pagination}>
              <Button
                title="⬅ Previous"
                onPress={() => {
                  searchMovies(currentpage - 1);
                }}
                disabled={currentpage === 1}
              />
              <Text style={styles.pageText}>
                {currentpage} / {totalPages}
              </Text>
              <Button
                title="Next ➡"
                onPress={() => {
                  searchMovies(currentpage + 1);
                }}
                disabled={currentpage === totalPages}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.15,
  },
  searchWrapper: {
    padding: 12,
    zIndex: 1,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 70, // chừa chỗ cho pagination
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1c1c1e',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#333',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  pageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchScreen;
