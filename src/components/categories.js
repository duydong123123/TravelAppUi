import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Sử dụng điều hướng
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../themes";
import { categoriesData } from "../constants"; // Dữ liệu categories mở rộng

export default function Categories({ searchText }) {
    const navigation = useNavigation(); // Hook điều hướng

    // Lọc danh mục theo từ khóa tìm kiếm
    const filteredCategories = categoriesData.filter((cat) =>
        cat.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // Hàm xử lý khi nhấn vào một danh mục
    const handleCategoryPress = (screen) => {
        if (screen) {
            navigation.navigate(screen); // Điều hướng đến màn hình tương ứng
        } else {
            alert("Không có màn hình liên kết!"); // Xử lý nếu không có màn hình
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.title, { fontSize: wp(4) }]}>Categories</Text>
                <TouchableOpacity>
                    <Text style={[styles.seeAll, { fontSize: wp(4), color: theme.text }]}>See all</Text>
                </TouchableOpacity>
            </View>

            {filteredCategories.length > 0 ? (
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.scrollContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {filteredCategories.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.categoryItem}
                            onPress={() => handleCategoryPress(cat.screen)} // Điều hướng
                        >
                            <Image source={cat.image} style={styles.categoryImage} />
                            <Text style={styles.categoryTitle}>{cat.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.noResults}>Không tìm thấy kết quả</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
    },
    title: {
        fontWeight: "600",
        color: "#3b3b3b",
    },
    seeAll: {
        fontWeight: "500",
    },
    scrollContainer: {
        // paddingHorizontal: 5,
    },
    categoryItem: {
        alignItems: "center",
        marginHorizontal: 8,
    },
    categoryImage: {
        borderRadius: 20,
        width: wp(20),
        height: wp(19),
    },
    categoryTitle: {
        color: "#3b3b3b",
        fontWeight: "500",
        marginTop: 5,
    },
    noResults: {
        textAlign: "center",
        marginTop: 5,
        color: "gray",
        fontSize: wp(4),
    },
});
