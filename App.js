import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 우리가 만든 화면 컴포넌트들을 불러옵니다.
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';

// 스택 내비게이터를 생성합니다.
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        // NavigationContainer가 모든 내비게이션을 감싸야 합니다.
        <NavigationContainer>
            {/* Stack.Navigator가 스택 방식으로 화면들을 관리합니다. */}
            <Stack.Navigator initialRouteName='Home'>
                {/* Stack.Screen으로 각 화면을 등록합니다. name이 이동할 때 사용하는 이름이 됩니다. */}
                <Stack.Screen name='Home' component={HomeScreen} options={{ title: '홈' }} />
                <Stack.Screen name='Details' component={DetailsScreen} options={{ title: '상세 정보' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
