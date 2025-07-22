import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import HomeScreen from './src/screens/HomeScreen';
import InputScreen from './src/screens/InputScreen';
import OutputScreen from './src/screens/OutputScreen';
import MatchInfoScreen from './src/screens/MatchInfoScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        Pretendard: require('./assets/fonts/PretendardVariable.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        // NavigationContainer가 모든 내비게이션을 감싸야 합니다.
        <NavigationContainer>
            {/* Stack.Navigator가 스택 방식으로 화면들을 관리합니다. */}
            <Stack.Navigator
                initialRouteName='Register'
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
