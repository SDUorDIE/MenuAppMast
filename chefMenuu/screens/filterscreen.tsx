import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem, CourseType } from '../types';
import { Picker } from "@react-native-picker/picker";
import React, { useState, useCallback, useMemo } from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from '../styles/styles';

type FilterScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterScreen'>;

export const FilterScreen: React.FC<FilterScreenProps> = ({ route }) => {
    const [courseFilter, setCourseFilter] = useState<CourseType | ''>('');

    const COURSE_TYPES: CourseType[] = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];

    const filteredMenu = useMemo(() => {
        return route.params.menu.filter(item => {
            if (courseFilter && item.courseType !== courseFilter) {
                return false;
            }
            return true;
        });
    }, [route.params.menu, courseFilter]);

    const renderMenuItem = useCallback(({ item }: { item: MenuItem }) => (
        <View style={styles.workoutItem}>
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text>Course: {item.courseType}</Text>
            <Text>Prep Time: {item.prepTime}</Text>
            <Text>Price: R{item.price}</Text>
        </View>
    ), []);

    return (
        <View style={styles.container}>
            <View style={styles.filterSection}>
                <Picker
                    selectedValue={courseFilter}
                    onValueChange={setCourseFilter}
                    style={styles.picker}
                >
                    <Picker.Item 
                        style={styles.picker}
                        label="All Courses" 
                        value="" 
                    />
                    {COURSE_TYPES.map((type) => (
                        <Picker.Item label={type} value={type} key={type} />
                    ))}
                </Picker>
            </View>

            <FlatList
                data={filteredMenu}
                renderItem={renderMenuItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No meals match your filters</Text>
                )}
            />
        </View>
    );
};