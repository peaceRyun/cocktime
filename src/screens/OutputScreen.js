import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function OutputScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerCont}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='leftcircle' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.h2}>Output</Text>
            </View>
            <View style={{ marginTop: 30, display: 'flex', gap: 20 }}>
                <View style={styles.cardCont}>
                    <Text style={{ fontSize: 20, fontWeight: 700, color: '#5A86F1' }}>Turn 1</Text>
                    <View style={styles.teamInfoCont}>
                        <View style={styles.teamInfoHeader}>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 500 }}>Team 01</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.startBtn}>
                                    <Text style={{ fontSize: 15, fontWeight: 700 }}>START</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.teamInfoMain}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>홍길동1</Text>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>홍길동2</Text>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>홍길동3</Text>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>홍길동4</Text>
                        </View>
                    </View>
                    <View style={styles.teamInfoCont}>
                        <View style={styles.teamInfoHeader}>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 500 }}>Team 02</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <View style={styles.clockLabel}>
                                    <AntDesign name='clockcircleo' size={15} color='#5A86F1' />
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>14: 05</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('MatchInfoS')}
                                    style={styles.matchInfoBtn}
                                >
                                    <Text style={{ fontSize: 10, fontWeight: 700 }}>Match Info</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('MatchInfoS')}
                                    style={styles.endBtn}
                                >
                                    <Text style={{ fontSize: 15, fontWeight: 700 }}>END</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.teamInfoMain}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>홍길동5</Text>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>홍길동6</Text>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>홍길동7</Text>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>홍길동8</Text>
                        </View>
                    </View>
                    <View style={styles.restInfoCont}>
                        <View style={styles.teamInfoHeader}>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 500 }}>휴식</Text>
                        </View>
                        <View style={styles.restInfoMain}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>깍두기1</Text>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>깍두기2</Text>
                        </View>
                    </View>
                </View>
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
    cardCont: {
        marginHorizontal: 20,
        height: 320,
        backgroundColor: '#1d1d1d',
        borderRadius: 10,
        padding: 20,
    },
    teamInfoCont: {
        marginTop: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#838383',
    },
    restInfoCont: { marginTop: 15, paddingBottom: 10 },
    teamInfoHeader: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    teamInfoMain: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    restInfoMain: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingLeft: 30,
    },
    startBtn: {
        backgroundColor: '#3DFF88',
        width: 70,
        height: 30,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    endBtn: {
        backgroundColor: '#FF5A3D',
        width: 70,
        height: 30,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    matchInfoBtn: {
        backgroundColor: '#C5FF3D',
        width: 70,
        height: 30,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockLabel: {
        // backgroundColor: '#4A4A4A',
        width: 70,
        height: 30,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
});
