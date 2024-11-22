export interface WorkOutDetails {
    dishName: string;
    description: string;
    category: string;
    price: number;
}
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Home: undefined;
    'Manage Menu': undefined;
    'Filter Menu': {someProp?: string};
};

export type FilterMenuScreenProps = RouteProp<RootStackParamList, 'Filter Menu'>;