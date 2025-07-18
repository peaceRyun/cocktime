import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function InputScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerCont}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='leftcircle' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.h2}>Input</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('OutputS')}
                style={{ position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', zIndex: 10 }}
            >
                <View style={styles.resultBtn}>
                    <Text style={styles.resultText}>결과 보기</Text>
                </View>
            </TouchableOpacity>
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
    resultBtn: {
        width: 200,
        backgroundColor: '#5A86F1',
        paddingVertical: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    resultText: {
        fontSize: 20,
        fontWeight: 700,
    },
});
