import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/movieApi";

const MovieDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(id);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Backdrop Image */}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
        style={styles.backdrop}
        resizeMode="cover"
      />

      {/* Title + Basic Info */}
      <View style={styles.section}>
        <Text style={styles.title}>{movie.original_title}</Text>
        <Text style={styles.subInfo}>
          {movie.release_date?.split("-")[0]} • {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ""}
        </Text>
      </View>

      {/* Overview */}
      <View style={styles.section}>
        <Text style={styles.heading}>Overview</Text>
        <Text style={styles.text}>{movie.overview}</Text>
      </View>

      {/* Release date + Status */}
      <View style={styles.row}>
        <View style={styles.infoBox}>
          <Text style={styles.heading}>Release date</Text>
          <Text style={styles.text}>{movie.release_date}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.heading}>Status</Text>
          <Text style={styles.text}>{movie.status}</Text>
        </View>
      </View>

      {/* Genres */}
      <View style={styles.section}>
        <Text style={styles.heading}>Genres</Text>
        <View style={styles.badgeContainer}>
          {movie.genres?.map((genre: { id: number; name: string }) => (
            <View key={genre.id} style={styles.badge}>
              <Text style={styles.badgeText}>{genre.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Countries */}
      <View style={styles.section}>
        <Text style={styles.heading}>Countries</Text>
        <View style={styles.badgeContainer}>
          {movie.production_countries?.map((country: { iso_3166_1: string; name: string }) => (
            <View key={country.iso_3166_1} style={styles.badge}>
              <Text style={styles.badgeText}>{country.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Budget + Revenue */}
      <View style={styles.row}>
        <View style={styles.infoBox}>
          <Text style={styles.heading}>Budget</Text>
          <Text style={styles.text}>${movie.budget?.toLocaleString()}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.heading}>Revenue</Text>
          <Text style={styles.text}>${movie.revenue?.toLocaleString()}</Text>
        </View>
      </View>

      {/* Tagline */}
      {movie.tagline ? (
        <View style={styles.section}>
          <Text style={styles.heading}>Tagline</Text>
          <Text style={styles.text}>"{movie.tagline}"</Text>
        </View>
      ) : null}

      {/* Production Companies */}
      <View style={styles.section}>
        <Text style={styles.heading}>Production Companies</Text>
        {movie.production_companies?.map((company: { id: number; name: string }) => (
          <Text key={company.id} style={styles.text}>• {company.name}</Text>
        ))}
      </View>

      {/* Homepage Button */}
      {movie.homepage ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(movie.homepage)}
        >
          <Text style={styles.buttonText}>Visit Homepage →</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d14",
    padding: 16,
  },
  loading: {
    flex: 1,
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#fff",
  },
  backdrop: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subInfo: {
    color: "#aaa",
    marginTop: 4,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#ccc",
  },
  text: {
    fontSize: 14,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    backgroundColor: "#222",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 13,
  },
  button: {
    backgroundColor: "#7c3aed",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
