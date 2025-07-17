import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// 모든 스크린 컴포넌트는 'navigation' prop을 자동으로 받습니다.
export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>홈 화면</Text>
            <Button
                title='상세 페이지로 이동'
                // 'Details'는 App.js에서 등록할 화면의 이름입니다.
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    text: { fontSize: 24, marginBottom: 20 },
});
