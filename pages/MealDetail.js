import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const MealDetail = ({ route }) => {
  const { id } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMeal(data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal details:', error);
        setLoading(false);
      }
    };
    fetchMealDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meal not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.mealImage} />
      <Text style={styles.mealTitle}>{meal.strMeal}</Text>
      <Text style={styles.mealCategory}>{meal.strCategory}</Text>
      <Text style={styles.mealArea}>{meal.strArea}</Text>

      <Text style={styles.sectionTitle}>Bahan-bahan</Text>
      <View style={styles.tableContainer}>
        {getIngredients(meal).map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.ingredient}</Text>
            <Text style={styles.tableCell}>{item.measure}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Petunjuk</Text>
      <View style={styles.instructionsContainer}>
        {meal.strInstructions.split('. ').map((instruction, index) => (
          <View key={index} style={styles.instructionStep}>
            <Text style={styles.instructionBullet}>•</Text>
            <Text style={styles.instructionText}>{instruction.trim()}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.categoryText}>Category: {meal.strCategory}</Text>
      <Text style={styles.copyrightText}>Copyright © 2024</Text>
    </ScrollView>
  );
};

const getIngredients = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`] !== "") {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
      });
    }
  }
  return ingredients;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  mealImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  mealTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  mealCategory: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 5,
  },
  mealArea: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    fontSize: 16,
    width: '50%',
  },
  instructionsContainer: {
    marginTop: 10,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  instructionBullet: {
    fontSize: 16,
    marginRight: 10,
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    flex: 1,
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  copyrightText: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default MealDetail;
