import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

export default function InputScreen({ navigation }) {
    const [name, setName] = useState('');
    const [turns, setTurns] = useState('');
    const [isGenderChecked, setIsGenderChecked] = useState(false);

    const handleSubmit = () => {
        // if (!name) {
        //     Alert.alert('알림', '이름을 입력해주세요.');
        //     return;
        // }
        // if (!isGenderChecked) {
        //     Alert.alert('알림', '성별 체크해주세요.');
        //     return;
        // }
        // if (!turns) {
        //     Alert.alert('알림', '턴 수를 입력해주세요.');
        //     return;
        // }
        navigation.navigate('OutputS');
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerCont}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='leftcircle' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.h2}>Input</Text>
            </View>
            <View style={styles.cardCont}>
                <View style={styles.cardHeader}>
                    <Text style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}>Num</Text>
                    <Text style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}>Name</Text>
                    <Text style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}>Gender</Text>
                </View>
                <View style={styles.peopleList}>
                    <View style={styles.peopleItem}>
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: 20,
                                marginHorizontal: 10,
                            }}
                        >
                            1.
                        </Text>
                        <TextInput
                            style={styles.inputCont}
                            value={name}
                            onChangeText={setName}
                            placeholder='이름'
                            placeholderTextColor='#A9A9A9'
                        ></TextInput>
                        <View style={styles.genderCheckboxes}>
                            <TouchableOpacity style={styles.checkboxCont}>
                                <Text
                                    style={{ color: '#fff', fontWeight: 400, fontSize: 20 }}
                                    value={isGenderChecked}
                                    onValueChange={setIsGenderChecked}
                                >
                                    남
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkboxCont}>
                                <Text
                                    style={{ color: '#fff', fontWeight: 400, fontSize: 20 }}
                                    value={isGenderChecked}
                                    onValueChange={setIsGenderChecked}
                                >
                                    여
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }}>
                            <AntDesign name='pluscircle' size={24} color='#5A86F1' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.cardCont}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>Number of Turns : </Text>
                    <TextInput
                        style={styles.inputCont}
                        value={turns}
                        onChangeText={setTurns}
                        placeholder='턴 수'
                        placeholderTextColor='#A9A9A9'
                    ></TextInput>
                </View>
            </View>
            <TouchableOpacity
                onPress={handleSubmit}
                style={{ position: 'absolute', bottom: 40, left: 0, right: 0, alignItems: 'center', zIndex: 10 }}
            >
                <View style={styles.resultBtn}>
                    <Text style={styles.resultText}>결과 보기</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, position: 'relative', backgroundColor: '#d9e2f8' },
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 40,
        marginHorizontal: 20,
    },
    h2: { fontSize: 24, fontWeight: 500 },
    cardCont: { backgroundColor: '#1d1d1d', margin: 20, borderRadius: 10 },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 50,
    },
    peopleList: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    peopleItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 10,
        paddingVertical: 10,
    },
    inputCont: {
        borderWidth: 1,
        borderColor: '#fff',
        width: 110,
        height: 36,
        marginLeft: 20,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 17,
        paddingVertical: 0,
        paddingHorizontal: 10,
    },
    genderCheckboxes: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginHorizontal: 5,
    },
    checkboxCont: {
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 100,
    },
    resultBtn: {
        width: 200,
        backgroundColor: '#5A86F1',
        paddingVertical: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    resultText: {
        fontSize: 20,
        fontWeight: 700,
    },
});
