import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { initDatabase, getAllUsers } from './src/utils/database';

import HomeScreen from './src/screens/HomeScreen';
import InputScreen from './src/screens/InputScreen';
import OutputScreen from './src/screens/OutputScreen';
import MatchInfoScreen from './src/screens/MatchInfoScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        Pretendard: require('./assets/fonts/PretendardVariable.ttf'),
    });

    const [isLoggedIn, setIsLoggedIn] = useState(null); // null: 로딩 중, false: 비로그인, true: 로그인

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // 데이터베이스 초기화
                await initDatabase();
                console.log('Database initialized.');

                // 저장된 사용자 정보 확인
                const userNickname = await AsyncStorage.getItem('userNickname');
                setIsLoggedIn(!!userNickname); // 닉네임이 있으면 true, 없으면 false

                console.log('User login status:', !!userNickname);
            } catch (err) {
                console.error('App initialization failed:', err);
                setIsLoggedIn(false);
            }
        };

        initializeApp();
    }, []);

    // 폰트가 로드되지 않았거나 로그인 상태가 확인되지 않았으면 로딩
    if (!fontsLoaded || isLoggedIn === null) {
        return null; // 또는 로딩 스크린 컴포넌트
    }

    return (
        // NavigationContainer가 모든 내비게이션을 감싸야 합니다.
        <NavigationContainer>
            {/* Stack.Navigator가 스택 방식으로 화면들을 관리합니다. */}
            <Stack.Navigator
                initialRouteName={isLoggedIn ? 'Home' : 'Register'}
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        fontFamily: 'Pretendard',
                    },
                }}
            >
                {/* Stack.Screen으로 각 화면을 등록합니다. name이 이동할 때 사용하는 이름이 됩니다. */}
                <Stack.Screen name='Home' component={HomeScreen} options={{ title: '홈' }} />
                <Stack.Screen name='Register' component={RegisterScreen} options={{ title: '회원가입' }} />
                <Stack.Screen name='InputS' component={InputScreen} options={{ title: '입력 페이지' }} />
                <Stack.Screen name='OutputS' component={OutputScreen} options={{ title: '결과 페이지' }} />
                <Stack.Screen name='MatchInfoS' component={MatchInfoScreen} options={{ title: '매치 정보 페이지' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
