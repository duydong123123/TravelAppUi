import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Modal,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, ClockIcon, HeartIcon, MapPinIcon, SunIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../themes";

export default function DestinationScreen(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavorite, setFavorite] = useState(props.route.params.isFavorite);
    const [isModalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị Modal

    const handleBooking = () => {
        setModalVisible(true); // Hiển thị Modal
    };

    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('Home'); // Quay lại màn hình chính
    };

    return (
        <View style={styles.container}>
            <Image source={item.image} style={styles.image} />

            <SafeAreaView style={styles.safeArea}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <ChevronLeftIcon size={wp(7)} strokeWidth={4} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setFavorite(!isFavorite)}
                    style={styles.favoriteButton}
                >
                    <HeartIcon size={wp(7)} strokeWidth={4} color={isFavorite ? "red" : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            <View style={styles.detailsContainer}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{item?.title}</Text>
                        <Text style={[styles.price, { color: theme.text }]}>{`$${item?.price}`}</Text>
                    </View>

                    <Text style={styles.description}>{item?.longDescription}</Text>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <ClockIcon size={wp(7)} color={"skyblue"} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoTextBold}>{item.duration}</Text>
                                <Text style={styles.infoText}>Thời gian</Text>
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <MapPinIcon size={wp(7)} color={"#f87171"} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoTextBold}>{item.distance}</Text>
                                <Text style={styles.infoText}>Khoảng cách</Text>
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <SunIcon size={wp(7)} color={"orange"} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoTextBold}>{item.weather}</Text>
                                <Text style={styles.infoText}>
                                    {parseInt(item.weather.split(' ')[0]) > 25 ? 'Nắng' : 'Lạnh'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={styles.bookButton}
                    onPress={handleBooking} // Gọi hàm xử lý đặt ngay
                >
                    <Text style={styles.bookButtonText}>Đặt ngay</Text>
                </TouchableOpacity>
            </View>

            {/* Modal hiển thị khi đặt thành công */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Đặt thành công!</Text>
                        <Text style={styles.modalMessage}>
                            Cảm ơn bạn đã đặt vé. Chúng tôi sẽ liên lạc với bạn sớm.
                        </Text>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: wp(100),
        height: hp(55),
    },
    safeArea: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
    },
    backButton: {
        padding: 10,
        marginLeft: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 25,
    },
    favoriteButton: {
        padding: 10,
        marginRight: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 25,
    },
    detailsContainer: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: 'white',
        marginTop: -40,
    },
    scrollView: {
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: wp(7),
        fontWeight: 'bold',
        color: '#3b3b3b',
        flex: 1,
    },
    price: {
        fontSize: wp(7),
        fontWeight: '600',
    },
    description: {
        fontSize: wp(3.7),
        color: '#3b3b3b',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoTextContainer: {
        marginLeft: 5,
    },
    infoTextBold: {
        fontSize: wp(4.5),
        fontWeight: 'bold',
        color: '#3b3b3b',
    },
    infoText: {
        color: '#3b3b3b',
    },
    bookButton: {
        backgroundColor: theme.bg(0.8),
        height: wp(15),
        width: wp(50),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    bookButtonText: {
        fontSize: wp(5.5),
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        width: wp(80),
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: wp(6),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: wp(4.5),
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    modalButtonText: {
        fontSize: wp(4.5),
        color: 'white',
        fontWeight: 'bold',
    },
});
