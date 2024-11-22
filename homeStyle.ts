import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    headingContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2b2e4a', 
    },
    display: {
        backgroundColor: '#ffc87c', 
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    workName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2b2e4a', 
    },
    otherDetails: {
        fontSize: 16,
        color: '#445c73', 
        marginVertical: 5,
    },
    listStyle: {
        marginVertical: 10,
        height: 490,
    },
    container2: {
        padding: 15,
        backgroundColor: '#ffffff', 
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    button: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'black', 
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 15,
        width: '100%',
      },
      summaryBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 5,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
      },
      summaryText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#666',
      },
});