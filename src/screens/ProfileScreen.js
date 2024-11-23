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
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

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
    const [isModalVisible, setModalVisible] = useState(false);

    const handleSave = () => {
        setModalVisible(true);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Thông Tin Cá Nhân</Text>

                {/* Input fields */}
                {renderInput('Họ và tên', name, setName, <FontAwesome name="user" size={20} color="black" />)}
                {renderInput('Email', email, setEmail, <MaterialIcons name="email" size={20} color="black" />)}
                {renderInput(
                    'Số điện thoại',
                    phoneNumber,
                    setPhoneNumber,
                    <Ionicons name="call" size={20} color="black" />,
                    'phone-pad'
                )}
                {renderInput('Ngày sinh (dd/mm/yyyy)', birthday, setBirthday, <FontAwesome name="birthday-cake" size={20} color="black" />)}
                {renderInput('Địa chỉ', address, setAddress, <Ionicons name="location-outline" size={20} color="black" />)}
                {renderInput('Sở thích du lịch', preferences, setPreferences, <Ionicons name="ios-airplane" size={20} color="black" />)}
                {renderInput('Điểm đến thường xuyên', frequentDestinations, setFrequentDestinations, <FontAwesome name="map-marker" size={20} color="black" />)}
                {renderInput('Ngôn ngữ', language, setLanguage, <FontAwesome name="language" size={20} color="black" />)}
                {renderInput('Chi tiết thanh toán', paymentDetails, setPaymentDetails, <FontAwesome name="credit-card" size={20} color="black" />)}
                {renderInput('Yêu cầu đặc biệt', specialRequests, setSpecialRequests, <MaterialIcons name="request-page" size={20} color="black" />)}

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

// Helper function to render input fields with icons
const renderInput = (placeholder, value, onChangeText, icon, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
        {icon}
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        backgroundColor: '#fafafa',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    backButton: {
        flex: 1,
        backgroundColor: '#6c757d',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginRight: 10,
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginLeft: 10,
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
        padding: 30,
        borderRadius: 20,
        width: '85%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    modalMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    modalButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
});
