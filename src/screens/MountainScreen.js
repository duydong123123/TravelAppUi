import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, ActivityIndicator, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function MountainScreen() {
    const navigation = useNavigation();
    const [data, setData] = useState([]); // Dữ liệu từ API
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [selectedItem, setSelectedItem] = useState(null); // Lưu mục đã chọn
    const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        fetch("https://673d3fce0118dbfe8606a07e.mockapi.io/mountain")
            .then((response) => response.json())
            .then((result) => {
                setData(result); // Lưu dữ liệu vào state
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    // Hiển thị trạng thái loading
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#228B22" />
            </View>
        );
    }

    // Hiển thị thông báo lỗi nếu không có dữ liệu
    if (data.length === 0) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Không thể tải dữ liệu, vui lòng thử lại sau!</Text>
            </View>
        );
    }

    // Xử lý khi nhấn vào nút "Khám phá thêm"
    const handleExploreMore = (item) => {
        setSelectedItem(item); // Lưu mục được chọn
        setModalVisible(true); // Hiển thị modal
    };

    // Render từng mục
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <ImageBackground source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover">
                <View style={styles.cardOverlay}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    {/* <Text style={styles.cardDescription}>{item.description}</Text> */}
                    <TouchableOpacity style={styles.button} onPress={() => handleExploreMore(item)}>
                        <Text style={styles.buttonText}>{item.buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Nút quay lại */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Danh sách các mục */}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />

            {/* Modal hiển thị chi tiết */}
            {selectedItem && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                            <Text style={styles.modalDescription}>{selectedItem.description}</Text>
                            <ImageBackground source={{ uri: selectedItem.imageUrl }} style={styles.modalImage} />
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backButton: {
        position: "absolute",
        top: 5,
        left: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 30,
        zIndex: 10,
    },
    list: {
        paddingTop: 50, // Để tránh che bởi nút quay lại
    },
    card: {
        margin: 10,
        borderRadius: 15,
        overflow: "hidden",
        elevation: 5,
        backgroundColor: "#000", // Để ảnh nổi bật
    },
    cardImage: {
        width: "100%",
        height: 200,
    },
    cardOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 15,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: "#f0f0f0",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#228B22",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: "flex-start",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    errorText: {
        fontSize: 16,
        color: "red",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: "center",
    },
    modalImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    closeButton: {
        backgroundColor: "#228B22",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});
