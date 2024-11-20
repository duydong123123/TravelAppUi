import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native';

export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState('Nguyen Van A');
    const [email, setEmail] = useState('nguyenvana@gmail.com');
    const [phoneNumber, setPhoneNumber] = useState('0123456789');
    const [birthday, setBirthday] = useState('01/01/2000');
    const [address, setAddress] = useState('123 Đường ABC, Quận XYZ');
    const [preferences, setPreferences] = useState('Khám phá thiên nhiên, nghỉ dưỡng');
    const [frequentDestinations, setFrequentDestinations] = useState('Đà Lạt, Phú Quốc');
    const [language, setLanguage] = useState('Tiếng Việt');
    const [paymentDetails, setPaymentDetails] = useState('Thẻ tín dụng - **** **** **** 1234');
    const [specialRequests, setSpecialRequests] = useState('Không ăn cay, phòng không hút thuốc');
    const [isModalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị Modal

    const handleSave = () => {
        setModalVisible(true); // Hiển thị Modal khi nhấn "Lưu"
    };

    const handleGoBack = () => {
        navigation.goBack(); // Quay lại màn hình Home
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Thông tin cá nhân</Text>

                {/* Input fields */}
                <TextInput
                    style={styles.input}
                    placeholder="Họ và tên"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ngày sinh (dd/mm/yyyy)"
                    value={birthday}
                    onChangeText={setBirthday}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Địa chỉ"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sở thích du lịch"
                    value={preferences}
                    onChangeText={setPreferences}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Điểm đến thường xuyên"
                    value={frequentDestinations}
                    onChangeText={setFrequentDestinations}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ngôn ngữ"
                    value={language}
                    onChangeText={setLanguage}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Chi tiết thanh toán"
                    value={paymentDetails}
                    onChangeText={setPaymentDetails}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Yêu cầu đặc biệt"
                    value={specialRequests}
                    onChangeText={setSpecialRequests}
                />

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <Text style={styles.buttonText}>Quay lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Thông tin đã được lưu!</Text>
                        <Text style={styles.modalMessage}>
                            Cảm ơn bạn đã cập nhật thông tin cá nhân.
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
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
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    backButton: {
        flex: 1,
        backgroundColor: '#6c757d',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 10, // Khoảng cách giữa hai nút
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginLeft: 10, // Khoảng cách giữa hai nút
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
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
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    modalButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});
