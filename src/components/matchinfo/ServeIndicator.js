import { View, StyleSheet } from 'react-native';

const ServeIndicator = ({ top, bottom, left, right }) => {
    const offsetStyles = {
        top,
        bottom,
        left,
        right,
    };
    return (
        <View style={[styles.container, offsetStyles]}>
            <View style={styles.glow} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 23,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        position: 'absolute',
        margin: 3,
    },
    glow: {
        width: 13,
        height: 13,
        borderRadius: 6.5,
        backgroundColor: '#ACE43F',
        shadowColor: '#ACE43F',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
        opacity: 0.8,
    },
});

export default ServeIndicator;
