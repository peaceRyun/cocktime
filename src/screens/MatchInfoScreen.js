import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MatchInfoScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerCont}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='leftcircle' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.h2}>Match Info</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, position: 'relative' },
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 40,
        marginHorizontal: 20,
    },
    h2: { fontSize: 24, fontWeight: 500 },
});
