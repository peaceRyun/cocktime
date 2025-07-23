import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { color } from '../styles/globalstyle';
import { getGamesWithMemberNicknames } from '../utils/database';

const screenHeight = Dimensions.get('window').height - 275;

export default function HomeScreen({ navigation, route }) {
    const [userNickname, setUserNickname] = useState('');
    const [games, setGames] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadGames = async () => {
        try {
            const gamesData = await getGamesWithMemberNicknames();
            setGames(gamesData);
        } catch (error) {
            console.error('Error loading games:', error);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadGames().then(() => setRefreshing(false));
    }, []);

    useFocusEffect(
        useCallback(() => {
            const loadUserData = async () => {
                try {
                    const routeNickname = route.params?.userNickname;
                    if (routeNickname) {
                        setUserNickname(routeNickname);
                    } else {
                        const storedNickname = await AsyncStorage.getItem('userNickname');
                        if (storedNickname) {
                            setUserNickname(storedNickname);
                        }
                    }
                } catch (error) {
                    console.error('Error loading user nickname:', error);
                }
            };

            loadUserData();
            loadGames();
        }, [route.params])
    );

    const handleLogOut = async () => {
        try {
            await AsyncStorage.clear();
            navigation.replace('Register');
        } catch (e) {
            console.error('로그아웃 오류:', e);
            Alert.alert('오류', '로그아웃 중 문제가 발생했습니다.');
        }
    };

    const renderGameItem = ({ item }) => (
        <View style={styles.cardCont}>
            <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                    <AntDesign name='calendar' size={20} color={color.primary50} />
                    <Text style={styles.cardHeaderText}>{item.start_time ? new Date(item.start_time).toLocaleDateString() : '날짜 정보 없음'}</Text>
                </View>
                <Text style={styles.cardHeaderText}>{item.start_time ? new Date(item.start_time).toLocaleTimeString() : ''}</Text>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.memoText}>{item.memo || '메모 없음'}</Text>
                {item.nicknames && (
                    <View style={styles.membersContainer}>
                        <Text style={styles.membersTitle}>참여자:</Text>
                        <Text style={styles.membersText}>{item.nicknames.join(', ')}</Text>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/bg_gradient.png')}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
            />
            <View style={styles.h2Cont}>
                <View>
                    <Text style={styles.h2}>안녕하세요,</Text>
                    <Text style={styles.h2}>{userNickname} 님</Text>
                </View>
                <TouchableOpacity style={styles.btnLogOutCont} onPress={handleLogOut}>
                    <Text style={{ fontWeight: '600' }}>로그아웃</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.matchCont}>
                <Image
                    source={require('../../assets/loader.png')}
                    style={{ width: 70, height: 70, resizeMode: 'cover' }}
                />
                <View>
                    <Text style={styles.matchTitle}>새 게임을 시작하세요!</Text>
                    <TouchableOpacity style={styles.newMatchButton} onPress={() => navigation.navigate('InputS')}>
                        <Text style={styles.newMatchButtonText}>새 게임</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.prevMatchCont}>
                <Text style={styles.prevMatchTitle}>이전 매치</Text>
                <FlatList
                    data={games}
                    renderItem={renderGameItem}
                    keyExtractor={(item) => item.game_id.toString()}
                    contentContainerStyle={{ marginTop: 20, paddingBottom: 40 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[color.primary50]}
                            tintColor={color.primary50}
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.emptyListText}>이전 매치 기록이 없습니다.</Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    h2Cont: {
        marginTop: 40,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    matchCont: {
        margin: 20,
        padding: 20,
        backgroundColor: '#1d1d1d',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
    },
    prevMatchCont: {
        paddingHorizontal: 20,
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
        marginBottom: 15,
    },
    btnLogOutCont: { paddingHorizontal: 20, paddingVertical: 15, backgroundColor: color.primary50, borderRadius: 10 },
    h2: { fontSize: 24, fontWeight: '500', color: 'white' },
    matchTitle: { fontSize: 16, fontWeight: '400', color: 'white' },
    prevMatchTitle: { fontSize: 20, fontWeight: '500', color: 'white', paddingTop: 20 },
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
        fontWeight: '600',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#3a3a3a',
        borderBottomWidth: 1,
        paddingBottom: 9,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardHeaderText: {
        fontWeight: '600',
        fontSize: 15,
        color: color.primary50,
    },
    cardBody: {
        paddingTop: 10,
    },
    memoText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
    },
    membersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    membersTitle: {
        color: color.primary50,
        fontWeight: 'bold',
    },
    membersText: {
        color: 'white',
        flexShrink: 1,
    },
    emptyListContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    emptyListText: {
        color: '#888',
        fontSize: 16,
    },
});
('');
