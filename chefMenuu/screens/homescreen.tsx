import React, { useState, useCallback, useMemo } from 'react';
import { Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';
import { styles } from '../styles/homescreenstyle';

type HomeScreenProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export const HomeScreen: React.FC<HomeScreenProp> = ({ navigation }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const averagePricePerType = useMemo(() => {
    const courseStats: { [key: string]: { total: number; count: number } } = {};
    
    menu.forEach((item) => {
      if (!courseStats[item.courseType]) {
        courseStats[item.courseType] = { total: 0, count: 0 };
      }
      courseStats[item.courseType].total += item.price;
      courseStats[item.courseType].count += 1;
    });

    return Object.entries(courseStats).map(([type, stats]) => ({
      type,
      average: Math.round(stats.total / stats.count)
    }));
  }, [menu]);

  const renderMenuItem = useCallback(({ item }: { item: MenuItem }) => (
    <View style={styles.container2}>
      <Text style={styles.workName}>Meal Name: {item.name}</Text>
      <Text style={styles.otherDetails}>Prep Time: {item.prepTime}</Text>
      <Text style={styles.otherDetails}>Course: {item.courseType}</Text>
      <Text style={styles.otherDetails}>Price: R{item.price}</Text>
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
          <Text style={styles.summaryText}>Total Meals: {menu.length}</Text>
          <Text style={styles.summaryText}>Total Price: R{totalPrice}</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>AVERAGE PRICE</Text>
          {averagePricePerType.map((stat) => (
            <Text key={stat.type} style={styles.summaryText}>
              {stat.type}: R{stat.average}
            </Text>
          ))}
          {averagePricePerType.length === 0 && (
            <Text style={styles.summaryText}>No courses recorded</Text>
          )}
        </View>
      </View>

      <FlatList
        style={styles.listStyle}
        data={menu}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMenuItem}
      />

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FilterScreen", { menu })}
        >
          <Text style={styles.buttonText}>Filter Courses</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ManageMenuScreen", {
            menu,
            setMenu,
            totalPrice,
            setTotalPrice
          })}
        >
          <Text style={styles.buttonText}>Manage Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};