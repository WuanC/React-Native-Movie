import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { IPopularMovie } from "../types/interfaces";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type MovieDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MovieDetailScreen"
>;

export const PopularCard = ({
  id,
  title,
  poster_path,
  vote_average,
  index,
}: IPopularMovie) => {
  const navigation = useNavigation<MovieDetailNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MovieDetailScreen", { id })}
    >
      <View style={styles.posterContainer}>
        <Image source={{ uri: poster_path }} style={styles.poster} />

        {/* Rating góc trên phải */}
        <View style={styles.ratingContainer}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.ratingText}>{vote_average.toFixed(1)}</Text>
        </View>

        {/* Index ở góc dưới bên trái */}
        <Text style={styles.index}>{index + 1}</Text>
      </View>

      {/* Tên phim */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 12,
  },
  posterContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  ratingContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  star: {
    color: "#FFD700",
    marginRight: 4,
    fontSize: 12,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  index: {
    position: "absolute",
    bottom: -4,
    left: 4,
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    marginTop: 6,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
