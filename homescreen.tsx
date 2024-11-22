import React, { useState, useCallback, useMemo } from 'react';
import { Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, WorkOutDetails } from '../types';
import { homestyle as styles } from '../styles/homestyle';

type HomeScreenProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export const HomeScreen: React.FC<HomeScreenProp> = ({ navigation }) => {
  const [workouts, setWorkOuts] = useState<WorkOutDetails[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const averageCaloriesPerType = useMemo(() => {
    const exerciseStats: { [key: string]: { total: number; count: number } } = {};
    
    workouts.forEach((workout) => {
      if (!exerciseStats[workout.exercise_Type]) {
        exerciseStats[workout.exercise_Type] = { total: 0, count: 0 };
      }
      exerciseStats[workout.exercise_Type].total += workout.calories;
      exerciseStats[workout.exercise_Type].count += 1;
    });

    return Object.entries(exerciseStats).map(([type, stats]) => ({
      type,
      average: Math.round(stats.total / stats.count)
    }));
  }, [workouts]);

  const renderWorkoutItem = useCallback(({ item }: { item: WorkOutDetails; index: number }) => (
    <View style={styles.container2}>
      <Text style={styles.workName}>Meal Name: {item.Workout_Name}</Text>
      <Text style={styles.otherDetails}>Expected Prep-Time: {item.duration}</Text>
      <Text style={styles.otherDetails}>Course: {item.exercise_Type}</Text>
      <Text style={styles.otherDetails}>Price: {item.calories}</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Chefill</Text>
      </View>
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>TODAY'S MENU</Text>
          <Text style={styles.summaryText}>Total Meals: {workouts.length}</Text>
          <Text style={styles.summaryText}>Total Price: {totalCalories}</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>AVERAGE PRICE</Text>
          {averageCaloriesPerType.map((stat) => (
            <Text key={stat.type} style={styles.summaryText}>
             {stat.type}: R {stat.average} 
            </Text>
          ))}
          {averageCaloriesPerType.length === 0 && (
            <Text style={styles.summaryText}>No Courses recorded</Text>
          )}
        </View>
      </View>

      <FlatList
        style={styles.listStyle}
        data={workouts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderWorkoutItem}
      />

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FilterScreen", { workouts })}
        >
          <Text style={styles.buttonText}>Filter Dish Type</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ManageWorkoutScreen", {
            workouts,
            setWorkOuts,
            totalCalories,
            setTotalCalories
          })}
        >
          <Text style={styles.buttonText}>Manage Meals</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};