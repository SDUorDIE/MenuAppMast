export type CourseType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert';

export interface MenuItem {
    name: string;
    prepTime: string;
    courseType: CourseType;
    price: number;
}

export type RootStackParamList = {
    HomeScreen: undefined;
    FilterScreen: {
        menu: MenuItem[];
    };
    ManageMenuScreen: {
        menu: MenuItem[];
        setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
        totalPrice: number;
        setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
    };
};