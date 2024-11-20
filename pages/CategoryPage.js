import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from './FavoriteContext';

const CategoryPage = ({ route, navigation }) => {
  const { categoryName } = route.params;
  const { addFavorite } = useFavorites();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setRecipes(data.meals || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [categoryName]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipes in the {categoryName} category</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('MealDetail', { id: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.strMeal}</Text>
            <TouchableOpacity style={styles.favoriteButton} onPress={() => addFavorite(item)}>
              <Text style={styles.favoriteText}>❤️ FAVORITE</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  favoriteButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CategoryPage;
