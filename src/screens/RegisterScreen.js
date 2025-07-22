import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        setLoading(true);
        // 여기에 SQLite 회원가입 로직을 추가할 수 있습니다.
        // 현재는 임시로 성공 처리 후 Home으로 이동합니다.
        try {
            // 실제 SQLite 로직이 들어갈 자리
            console.log('회원가입 시도:', email, password);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 비동기 작업 시뮬레이션
            Alert.alert('성공', '회원가입이 완료되었습니다.');
            navigation.navigate('Home'); // 성공 시 Home 화면으로 이동
        } catch (e) {
            Alert.alert('회원가입 실패', '알 수 없는 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.h2}>이메일을 설정해주세요</Text>
            <TextInput
                style={styles.inputCont}
                onChangeText={setEmail}
                value={email}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <Text style={styles.h2}>비밀번호를 설정해주세요</Text>
            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={styles.passwordInput}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={!showPassword}
                    autoCapitalize='none'
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <AntDesign name={showPassword ? 'eye' : 'eyeo'} size={24} color='black' />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnCont} onPress={handleSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color='white' /> : <Text style={{ color: 'white' }}>완료</Text>}
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
