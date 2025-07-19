import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const screenHeight = Dimensions.get('window').height - 100;

export default function MatchInfoScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerCont}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name='leftcircle' size={24} color='black' />
                    </TouchableOpacity>
                    <Text style={styles.h2}>Match Info</Text>
                </View>
                <View style={styles.clockLabel}>
                    <AntDesign name='clockcircleo' size={15} color='#5A86F1' />
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>14: 05</Text>
                </View>
            </View>
            <View style={styles.matchCont}>
                <View style={styles.scoreCont}>
                    <View style={styles.teamCont}>
                        <View style={styles.leftCont}>
                            <View style={styles.countryCont}></View>
                            <Text style={{ color: '#fff', fontSize: 15 }}>홍길동1</Text>
                            <Text style={{ color: '#fff', fontSize: 15 }}>홍길동2</Text>
                        </View>
                        <View style={styles.rightCont}>
                            <AntDesign name='checkcircle' size={15} color='#5A86F1' />
                            <Text style={{ color: '#fff', fontSize: 15 }}>0</Text>
                        </View>
                    </View>
                    <Text style={{ color: '#5A86F1', fontSize: 14 }}>VS</Text>
                    <View style={styles.teamCont}>
                        <View style={styles.leftCont}>
                            <View style={styles.countryCont}></View>
                            <Text style={{ color: '#fff', fontSize: 15 }}>홍길동3</Text>
                            <Text style={{ color: '#fff', fontSize: 15 }}>홍길동4</Text>
                        </View>
                        <View style={styles.rightCont}>
                            <Text style={{ color: '#fff', fontSize: 15 }}>0</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.introCont}>
                    <Text style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>
                        홍길동1 to Serve, Love All, Play
                    </Text>
                </View>
                <View style={styles.playCont}>
                    <TouchableOpacity style={styles.plusPointCont}>
                        <Text style={[{ color: '#fff', fontSize: 15 }]}>+ 1 Point</Text>
                    </TouchableOpacity>
                    <View style={styles.courtCont}>
                        <View style={styles.vLineLeft}></View>
                        <View style={styles.vLineRight}></View>
                        <View style={styles.topSec}></View>
                        <View style={styles.vLineTopHalf}></View>
                        <View style={styles.hLineTop}></View>
                        <View style={styles.hLineThick}></View>
                        <View style={styles.hLineBottom}></View>
                        <View style={styles.vLineBottomHalf}></View>
                        <View style={styles.bottomSec}></View>
                    </View>
                    <TouchableOpacity style={styles.plusPointCont}>
                        <Text style={[{ color: '#fff', fontSize: 15 }]}>+ 1 Point</Text>
                    </TouchableOpacity>
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
        justifyContent: 'space-between',
        marginTop: 40,
        marginHorizontal: 20,
    },
    headerLeft: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 },
    h2: { fontSize: 24, fontWeight: 500 },
    clockLabel: {
        backgroundColor: '#1d1d1d',
        width: 70,
        height: 30,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    matchCont: {
        padding: 30,
        height: screenHeight,
        backgroundColor: '#1d1d1d',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        display: 'flex',
        gap: 20,
    },
    scoreCont: {
        padding: 15,
        backgroundColor: '#4a4a4a',
        borderRadius: 10,
        display: 'flex',
        gap: 10,
        // justifyContent: 'start',
    },
    teamCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    countryCont: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: '#1D1D1D',
        position: 'relative',
    },
    leftCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    rightCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    introCont: {
        width: 250,
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: '#5A86F1',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playCont: {
        display: 'flex',
        gap: 20,
    },
    plusPointCont: {
        backgroundColor: '#2D2D2F',
        paddingVertical: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    courtCont: {
        width: 300,
        height: 300,
        backgroundColor: '#4A4A4A',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        marginVertical: 20,
        marginLeft: 25,
    },
    topSec: {
        flex: 1,
    },
    bottomSec: {
        flex: 1,
    },
    hLineThick: { position: 'absolute', top: 150, zIndex: 10, width: '100%', height: 2, backgroundColor: '#fff' },
    hLineTop: {
        position: 'absolute',
        top: 110,
        zIndex: 10,
        width: '100%',
        height: 1,
        backgroundColor: '#fff',
        opacity: 0.4,
    },
    hLineBottom: {
        position: 'absolute',
        top: 190,
        zIndex: 10,
        width: '100%',
        height: 1,
        backgroundColor: '#fff',
        opacity: 0.4,
    },
    vLineLeft: {
        position: 'absolute',
        left: 20,
        zIndex: 10,
        width: 1,
        height: '100%',
        backgroundColor: '#fff',
        opacity: 0.4,
    },
    vLineRight: {
        position: 'absolute',
        right: 20,
        zIndex: 10,
        width: 1,
        height: '100%',
        backgroundColor: '#fff',
        opacity: 0.4,
    },
    vLineTopHalf: {
        position: 'absolute',
        left: 150,
        width: 1,
        height: 110,
        backgroundColor: '#fff',
        opacity: 0.4,
    },
    vLineBottomHalf: {
        position: 'absolute',
        left: 150,
        bottom: 0,
        width: 1,
        height: 105,
        backgroundColor: '#fff',
        opacity: 0.4,
    },
});
