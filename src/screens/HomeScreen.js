import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { color } from '../styles/globalstyle';

const screenHeight = Dimensions.get('window').height - 275;

export default function HomeScreen({ navigation, route }) {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const loadUserEmail = async () => {
            try {
                // route params에서 먼저 확인
                const routeEmail = route.params?.userEmail;

                if (routeEmail) {
                    setUserEmail(routeEmail);
                } else {
                    // AsyncStorage에서 이메일 가져오기
                    const storedEmail = await AsyncStorage.getItem('userEmail');
                    if (storedEmail) {
                        setUserEmail(storedEmail);
                    }
                }
            } catch (error) {
                console.error('Error loading user email:', error);
            }
        };

        loadUserEmail();
    }, [route.params]);

    // 이메일에서 사용자 이름 추출 (@ 앞부분)
    const getUserName = (email) => {
        if (!email) return '사용자';
        return email.split('@')[0];
    };

    const handleLogOut = async () => {
        try {
            await AsyncStorage.clear(); // 모든 AsyncStorage 데이터 지우기
            navigation.replace('Register'); // RegisterScreen으로 이동 (뒤로가기 방지)
        } catch (e) {
            console.error('로그아웃 오류:', e);
            Alert.alert('오류', '로그아웃 중 문제가 발생했습니다.');
        }
    };
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/bg_gradient.png')}
                style={{ position: 'absolute', left: 0, right: 0, width: '100%', height: '100%' }}
            />
            <View style={styles.h2Cont}>
                <View>
                    <Text style={styles.h2}>안녕하세요,</Text>
                    <Text style={styles.h2}>{getUserName(userEmail)} 님</Text>
                </View>
                <TouchableOpacity style={styles.btnLogOutCont} onPress={handleLogOut}>
                    <Text style={{ fontWeight: 600 }}>로그아웃</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.matchCont}>
                <View>
                    <Image
                        source={require('../../assets/loader.png')}
                        style={{ width: 70, height: 70, resizeMode: 'cover' }}
                    />
                </View>
                <View>
                    <Text style={styles.matchTitle}>새 게임을 시작하세요!</Text>
                    <TouchableOpacity style={styles.newMatchButton} onPress={() => navigation.navigate('InputS')}>
                        <Text style={styles.newMatchButtonText}>새 게임</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.prevMatchCont}>
                <Text style={styles.prevMatchTitle}>이전 매치</Text>
                <View style={{ marginTop: 30, display: 'flex', gap: 30 }}>
                    <View style={styles.cardCont}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 10,
                                borderBottomColor: '#3a3a3a',
                                borderBottomWidth: 1,
                                paddingBottom: 9,
                            }}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <AntDesign name='calendar' size={20} color={color.primary50} />
                                <Text style={{ fontWeight: 600, fontSize: 15, color: color.primary50 }}>
                                    2025/07/17
                                </Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <AntDesign name='clockcircleo' size={20} color={color.primary50} />
                                <Text style={{ fontWeight: 600, fontSize: 15, color: color.primary50 }}>07:25</Text>
                            </View>
                        </View>
                        <View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 20,
                                }}
                            >
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <View style={styles.countryCont}></View>
                                    <Text style={{ fontSize: 15, color: '#fff' }}>홍길동1</Text>
                                    <Text style={{ fontSize: 15, color: '#fff' }}>홍길동2</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <AntDesign name='checkcircle' size={20} color={color.primary50} />
                                    <Text style={{ fontSize: 15, color: '#fff' }}>25</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 14, color: color.primary50, marginVertical: 5 }}>VS</Text>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    opacity: 0.4,
                                }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 5,
                                    }}
                                >
                                    <View style={styles.countryCont}></View>
                                    <Text style={{ fontSize: 15, color: '#fff' }}>홍길동1</Text>
                                    <Text style={{ fontSize: 15, color: '#fff' }}>홍길동2</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 15,
                                    }}
                                >
                                    {/* <AntDesign name='checkcircle' size={15} color='#5A86F1' /> */}
                                    <Text style={{ fontSize: 15, color: '#fff' }}>20</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { position: 'relative', flex: 1 },
    h2Cont: {
        marginTop: 40,
        marginHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    matchCont: {
        margin: 20,
        padding: 20,
        backgroundColor: '#1d1d1d',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
    },
    prevMatchCont: {
        padding: 20,
        height: screenHeight,
        backgroundColor: '#1d1d1d',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    cardCont: {
        backgroundColor: '#2D2D2F',
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 10,
    },
    btnLogOutCont: { paddingHorizontal: 20, paddingVertical: 15, backgroundColor: color.primary50, borderRadius: 10 },
    h2: { fontSize: 24, fontWeight: '500' },
    matchTitle: { fontSize: 16, fontWeight: '400', color: 'white' },
    prevMatchTitle: { fontSize: 20, fontWeight: '500', color: 'white' },
    newMatchButton: {
        backgroundColor: color.primary50,
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 50,
        marginTop: 10,
    },
    newMatchButtonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 600,
    },
    countryCont: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: '#1D1D1D',
        position: 'relative',
    },
});
