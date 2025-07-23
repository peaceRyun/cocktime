import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { addUser, getUser, exportDatabase, importDatabase } from '../utils/database';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../styles/globalstyle';

const RegisterScreen = ({ navigation }) => {
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState(null); // 'male', 'female'
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!nickname) {
            Alert.alert('입력 오류', '닉네임을 입력해주세요.');
            return;
        }
        if (gender === null) {
            Alert.alert('입력 오류', '성별을 선택해주세요.');
            return;
        }

        setLoading(true);
        try {
            const existingUser = await getUser(nickname);

            if (existingUser) {
                if (existingUser.gender === gender) {
                    // 닉네임과 성별이 모두 일치 -> 로그인
                    await AsyncStorage.setItem('userNickname', nickname);
                    Alert.alert('로그인 성공', '로그인되었습니다.');
                    navigation.navigate('Home', { userNickname: nickname });
                } else {
                    // 닉네임은 있지만 성별이 다름 -> 오류 메시지
                    Alert.alert('로그인 실패', '성별 정보가 일치하지 않습니다.');
                }
            } else {
                // 존재하지 않는 닉네임 -> 새로 생성
                await addUser(nickname, gender);
                await AsyncStorage.setItem('userNickname', nickname);
                Alert.alert('환영합니다!', '새로운 사용자가 생성되었습니다.');
                navigation.navigate('Home', { userNickname: nickname });
            }
        } catch (e) {
            console.error('처리 중 오류 발생:', e);
            Alert.alert('오류', '요청을 처리하는 중 문제가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleImport = async () => {
        console.log('Attempting to import database...');
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            console.log('DocumentPicker result:', JSON.stringify(result, null, 2));

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                console.log(`File selected. URI: ${uri}`);
                await importDatabase(uri);
                Alert.alert('가져오기 성공', '데이터베이스를 성공적으로 가져왔습니다. 앱을 다시 시작해주세요.');
            } else {
                console.log('Document picker was canceled or returned no assets.');
            }
        } catch (err) {
            console.error('Error during import process in RegisterScreen:', err);
            Alert.alert('가져오기 실패', `오류가 발생했습니다: ${err.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.h2}>프로필을 설정해주세요</Text>
            <TextInput
                style={styles.inputCont}
                placeholder="닉네임"
                onChangeText={setNickname}
                value={nickname}
                autoCorrect={false}
                autoComplete="off"
                keyboardType="default"
                allowFontScaling={false}
            />
            <View style={styles.genderSelector}>
                <TouchableOpacity
                    style={[styles.genderButton, gender === 0 && styles.genderButtonSelected]}
                    onPress={() => setGender(0)}
                >
                    <Text style={[styles.genderButtonText, gender === 0 && styles.genderButtonTextSelected]}>
                        남자
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.genderButton, gender === 1 && styles.genderButtonSelected]}
                    onPress={() => setGender(1)}
                >
                    <Text style={[styles.genderButtonText, gender === 1 && styles.genderButtonTextSelected]}>
                        여자
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnCont} onPress={handleSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color='white' /> : <Text style={{ color: 'white' }}>완료</Text>}
            </TouchableOpacity>
            <View style={styles.dbButtonsContainer}>
                <TouchableOpacity style={styles.dbButton} onPress={exportDatabase} disabled={loading}>
                    <Text style={{ color: 'white' }}>DB 내보내기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dbButton} onPress={handleImport} disabled={loading}>
                    <Text style={{ color: 'white' }}>DB 가져오기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    h2: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 40,
    },
    inputCont: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: '80%',
        padding: 15,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    genderSelector: {
        flexDirection: 'row',
        marginBottom: 30,
        marginHorizontal: 40,
    },
    genderButton: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    genderButtonSelected: {
        backgroundColor: color.primary50,
        borderColor: color.primary50,
    },
    genderButtonText: {
        fontSize: 16,
        color: '#333',
    },
    genderButtonTextSelected: {
        color: 'white',
        fontWeight: 'bold',
    },
    btnCont: {
        backgroundColor: color.primary50,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    dbButtonsContainer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    dbButton: {
        backgroundColor: '#555',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
});

export default RegisterScreen;
