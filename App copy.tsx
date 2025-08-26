import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

const API_KEY = '77292bdf9885177363d6cb3a223abef1';

export default function App() {
  const [movieIds, setMovieIds] = useState<number[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          const ids = data.results.map((movie: { id: number }) => movie.id);
          setMovieIds(ids);
        } else {
          setError('No results found');
        }
      })
      .catch(() => setError('Failed to fetch movies'));
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = [];
      for (const id of movieIds) {
        try {
          const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
          const data = await res.json();
          details.push(data);
        } catch {
          // Ignore errors for individual movies
        }
      }
      setMovies(details);
    };

    if (movieIds.length > 0) {
      fetchMovieDetails();
    }
  }, [movieIds]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Movies</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {movies.map((movie) => (
            <View key={movie.id} style={styles.card}>
              {movie.poster_path && (
                <View style={styles.posterContainer}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    style={styles.poster}
                  />

                  
                </View>
              )}
              <View style={styles.info}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.date}>Release: {movie.release_date}</Text>
                <Text style={styles.overview}>{movie.overview}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
    alignItems: 'flex-start',
  },
  posterContainer: {
    marginRight: 12,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  overview: {
    fontSize: 13,
    color: '#333',
  },
});
