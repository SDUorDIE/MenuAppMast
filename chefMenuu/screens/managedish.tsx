import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem, CourseType } from '../types';
import { Picker } from "@react-native-picker/picker";
import React, { useState, useCallback } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, TouchableHighlight, ScrollView, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { styles as homeStyles } from '../styles/homescreenstyle';

type ManageMenuProps = NativeStackScreenProps<RootStackParamList, 'ManageMenuScreen'>;

export const ManageMenu: React.FC<ManageMenuProps> = ({ route, navigation }) => {
    const [mealName, setMealName] = useState<string>('');
    const [prepTime, setPrepTime] = useState<string>('');
    const [courseType, setCourseType] = useState<CourseType | ''>('');
    const [price, setPrice] = useState<string>('');

    const COURSE_TYPES: CourseType[] = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];

    const handleRemoval = useCallback((index: number) => {
        const newMenu = [...route.params.menu];
        const [removedItem] = newMenu.splice(index, 1);
        
        route.params.setMenu(newMenu);
        route.params.setTotalPrice(
            route.params.totalPrice - removedItem.price
        );
        navigation.navigate('HomeScreen');
    }, [route.params, navigation]);

    const validateForm = (): string | null => {
        if (!mealName.trim()) return "Please enter a meal name";
        if (!prepTime.trim()) return "Please enter preparation time";
        if (!courseType) return "Please select a course type";
        if (!price.trim()) return "Please enter a price";
        
        const priceNum = Number(price);
        if (isNaN(priceNum)) return "Please enter a valid price";
        if (priceNum <= 20) return "Price must be greater than R20";
        
        return null;
    };

    const handleSubmit = () => {
        const error = validateForm();
        if (error) {
            Alert.alert("Invalid Input", error, [{ text: "OK" }]);
            return;
        }

        const newItem: MenuItem = {
            name: mealName,
            prepTime: prepTime,
            courseType: courseType as CourseType,
            price: parseInt(price)
        };

        const updatedMenu = [...route.params.menu, newItem];
        route.params.setMenu(updatedMenu);
        route.params.setTotalPrice(
            route.params.totalPrice + newItem.price
        );

    
        setMealName('');
        setPrepTime('');
        setCourseType('');
        setPrice('');

        navigation.navigate('HomeScreen');
    };

    const renderMenuItem = useCallback(({ item, index }: { item: MenuItem; index: number }) => (
        <View style={styles.container2}>
            <Text style={styles.workName}>Meal Name: {item.name}</Text>
            <Text style={styles.otherDetails}>Prep Time: {item.prepTime}</Text>
            <Text style={styles.otherDetails}>Course: {item.courseType}</Text>
            <Text style={styles.otherDetails}>Price: R{item.price}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleRemoval(index)}
            >
                <Text style={styles.buttonText}>Remove Meal</Text>
            </TouchableOpacity>
        </View>
    ), [handleRemoval]);

    return (
        <View style={[homeStyles.container, { flex: 1 }]}>
            <ScrollView style={styles.userInputView}>
                <Text style={homeStyles.heading}>Add New Meal</Text>
                
                <TextInput 
                    style={styles.input}
                    placeholder='Meal Name'
                    value={mealName}
                    onChangeText={setMealName}
                />

                <TextInput 
                    style={styles.input}
                    placeholder='Prep Time (minutes)'
                    value={prepTime}
                    onChangeText={setPrepTime}
                    keyboardType="numeric"
                />

                <Picker
                    selectedValue={courseType}
                    onValueChange={(value) => setCourseType(value as CourseType)}
                    style={styles.input}
                >
                    <Picker.Item label="Select Course" value="" />
                    {COURSE_TYPES.map((type) => (
                        <Picker.Item label={type} value={type} key={type} />
                    ))}
                </Picker>

                <TextInput 
                    style={styles.input}
                    placeholder='Price (R)'
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />
                
                <TouchableHighlight onPress={handleSubmit} style={homeStyles.button}>
                    <Text style={homeStyles.buttonText}>Add Meal</Text>
                </TouchableHighlight>
            </ScrollView>

            <View style={{ flex: 1 }}>
                <Text style={[homeStyles.heading, { marginTop: 20 }]}>Current Menu</Text>
                <FlatList
                    style={homeStyles.listStyle}
                    data={route.params.menu}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={renderMenuItem}
                />
            </View>
        </View>
    );
};