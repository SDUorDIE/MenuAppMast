import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, WorkOutDetails } from '../types';
import { Picker } from "@react-native-picker/picker";
import React, { useState, useCallback } from 'react';
import { Text, View, FlatList, TouchableHighlight, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { styles as homeStyles } from '../styles/home';
import { Alert } from 'react-native';
import { StyleSheet } from "react-native";

type ManageWorkoutProps = NativeStackScreenProps<RootStackParamList, 'ManageWorkoutScreen'>;

export const ManageWorkouts: React.FC<ManageWorkoutProps> = (props) => {
    const [WorkOutName, setWorkOutName] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [exerciseType, setType] = useState<string>('');
    const [calories, setcalories] = useState<string>('');

    const ExerciseType = ['Breakfast', 'Lunch', 'Dinner', 'Desert'];

    const handleRemoval = useCallback((index: number) => {
        const newWorkouts = [...props.route.params.workouts];
        const [removedWorkout] = newWorkouts.splice(index, 1);
        
        // Update workouts in route params
        props.route.params.setWorkOuts(newWorkouts);
        
        // Update total calories in route params
        props.route.params.setTotalCalories(
            props.route.params.totalCalories - removedWorkout.calories
        );

        // Navigate back to HomeScreen after removal
        props.navigation.navigate('HomeScreen');
    }, [props.route.params, props.navigation]);
    
    const renderWorkoutItem = useCallback(({ item, index }: { item: WorkOutDetails; index: number }) => (
        <View style={styles.container2}>
            <Text style={styles.workName}>Meal Name: {item.Workout_Name}</Text>
            <Text style={styles.otherDetails}>Prep-time: {item.duration}</Text>
            <Text style={styles.otherDetails}>coures: {item.exercise_Type}</Text>
            <Text style={styles.otherDetails}>price: {item.calories}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleRemoval(index)}
            >
                <Text style={styles.buttonText}>Remove Meal</Text>
            </TouchableOpacity>
        </View>
    ), [handleRemoval]);

    const handleSubmit = () => {
        if (WorkOutName && duration && exerciseType && calories && parseInt(calories) > 20) {
            const newWorkout: WorkOutDetails = {
                Workout_Name: WorkOutName,
                duration: duration,
                exercise_Type: exerciseType,
                calories: parseInt(calories)
            };

            const updateWorkout = [...props.route.params.workouts, newWorkout];
            props.route.params.setWorkOuts(updateWorkout);

            const updateTotalCalories = props.route.params.totalCalories + newWorkout.calories;
            props.route.params.setTotalCalories(updateTotalCalories);

            // Reset form fields
            setWorkOutName('');
            setDuration('');
            setType('');
            setcalories('');

            // Navigate back to HomeScreen after adding workout
            props.navigation.navigate('HomeScreen');
        } else if (parseInt(calories) <= 0) {
            Alert.alert(
                "Invalid Price",
                "Price need's to be greater than 20!",
                [{ text: "OK" }]
            );
        } else {
            Alert.alert(
                "Incorrect Information",
                "Please fill in all fields before adding a Meal",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <View style={[homeStyles.container, { flex: 1 }]}>
            {/* Add Workout Form Section */}
            <ScrollView style={styles.userInputView}>
                <Text style={homeStyles.heading}>Add New Meal</Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='Meal Name'
                    value={WorkOutName}
                    onChangeText={setWorkOutName}
                />

                <TextInput 
                    style={styles.input}
                    placeholder='Expected Prep-Time (min)'
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="numeric"
                />

                <Picker
                    selectedValue={exerciseType}
                    onValueChange={(itemValue) => setType(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Coures's" value="" />
                    {ExerciseType.map((exerciseType) => (
                        <Picker.Item label={exerciseType} value={exerciseType} key={exerciseType} />
                    ))}
                </Picker>

                <TextInput 
                    style={styles.input}
                    placeholder='Price'
                    value={calories}
                    onChangeText={setcalories}
                    keyboardType="numeric"
                />
                
                <TouchableHighlight onPress={handleSubmit} style={homeStyles.button}>
                    <Text style={homeStyles.buttonText}>Add Meal</Text>
                </TouchableHighlight>
            </ScrollView>

            {/* Workout List Section */}
            <View style={{ flex: 1 }}>
                <Text style={[homeStyles.heading, { marginTop: 20 }]}>Current Meals</Text>
                <FlatList
                    style={homeStyles.listStyle}
                    data={props.route.params.workouts}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderWorkoutItem}
                />
            </View>
        </View>
    );
};