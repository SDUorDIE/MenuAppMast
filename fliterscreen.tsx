import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, WorkOutDetails } from '../types';
import { Picker } from "@react-native-picker/picker";

import React, { useState, useCallback, useMemo } from 'react';

import { styles } from '../styles/styles';
import {
    Text, 
    View,
    FlatList,
    TextInput,
} from 'react-native';


type FilterScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterScreen'>;

export const FilterScreen: React.FC<FilterScreenProps> = ({ route }) => {
    const [exerciseTypeFilter, setExerciseTypeFilter] = useState<string>('');

    const EXERCISE_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Desert'] as const;

    const filteredWorkouts = useMemo(() => {
        return route.params.workouts.filter(workout => {
            // Exercise type filter
            if (exerciseTypeFilter && workout.exercise_Type !== exerciseTypeFilter) {
                return false;
            }
            
            return true;


        });
    }, [route.params.workouts, exerciseTypeFilter]);

    const renderWorkoutItem = useCallback(({ item }: { item: WorkOutDetails }) => (
        <View style={styles.workoutItem}>
            <Text style={styles.workoutName}>{item.Workout_Name}</Text>
            <Text>Course: {item.exercise_Type}</Text>
            <Text> Expected Prep-Time: {item.duration}</Text>
            <Text>Price: {item.calories}</Text>
        </View>
    ), []);

    return (
        <View style={styles.container}>
            <View style={styles.filterSection}>
                <Picker
                    selectedValue={exerciseTypeFilter}
                    onValueChange={setExerciseTypeFilter}
                    style={styles.picker}
                >
                    <Picker.Item 
                    style={styles.picker}
                    label="All Types" value="" />
                    {EXERCISE_TYPES.map((type) => (
                        <Picker.Item label={type} value={type} key={type} />
                    ))}
                </Picker>
            </View>

            <FlatList
                data={filteredWorkouts}
                renderItem={renderWorkoutItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No Meals match your filters</Text>
                )}
            />
        </View>
    );
};