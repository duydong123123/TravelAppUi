import { Image, Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function WelcomeScreen() {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleLogin = () => {
        if (!phoneNumber) {
            alert("Vui lòng nhập số điện thoại");
        } else if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
            alert("Số điện thoại phải có đúng 10 chữ số");
        } else {
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/welcome.png")} style={styles.backgroundImage} />

            <LinearGradient
                colors={["transparent", "rgba(3,105,161,0.8)"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}
            />

            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Du lịch dễ dàng</Text>
                    <Text style={styles.subtitle}>
                        Trải nghiệm những cuộc phiêu lưu tuyệt vời nhất trên khắp thế giới với chúng tôi
                    </Text>
                </View>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Nhập số điện thoại của bạn"
                placeholderTextColor="#aaa"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />

            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    gradient: {
        width: wp(100),
        height: hp(60),
        position: 'absolute',
        bottom: 0,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    textContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: wp(10),
        color: 'white',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: wp(4),
        color: '#e0e0e0',
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        fontSize: wp(4.5),
        marginVertical: 10,
        color: '#333',
        alignSelf: 'center',
        width: wp(80),
        zIndex: 1,
    },
    button: {
        backgroundColor: '#ff7f50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignSelf: 'center',
        marginBottom: 20,
        zIndex: 1,
    },
    buttonText: {
        fontSize: wp(5.5),
        color: 'white',
        fontWeight: 'bold',
    },
});
