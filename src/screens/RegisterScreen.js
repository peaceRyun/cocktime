import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import useFirebaseStore from '../store/useFirebaseStore'; // Zustand 스토어 임포트

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { registerUser, loading, error } = useFirebaseStore(); // Zustand 액션과 상태 가져오기

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            await registerUser(email, password);
            Alert.alert('성공', '회원가입이 완료되었습니다.');
            navigation.navigate('Home'); // 성공 시 Home 화면으로 이동
        } catch (e) {
            Alert.alert('회원가입 실패', error || '알 수 없는 오류가 발생했습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.h2}>이메일을 설정해주세요</Text>
            <TextInput
                style={styles.inputCont}
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.h2}>비밀번호를 설정해주세요</Text>
            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.passwordInput}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                >
                    <AntDesign
                        name={showPassword ? "eye" : "eyeo"}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnCont} onPress={handleSubmit} disabled={loading}> {/* 로딩 중에는 버튼 비활성화 */}
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={{ color: 'white' }}>완료</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
    },
    h2: {
        fontSize: 20,
        fontWeight: 600,
    },
    inputCont: {
        borderWidth: 2,
        borderColor: 'black',
        width: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
        width: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    passwordInput: {
        flex: 1,
        textAlign: 'center',
    },
    eyeIcon: {
        paddingLeft: 10,
    },
    btnCont: {
        backgroundColor: '#5A86F1',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
});

export default RegisterScreen;