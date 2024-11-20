import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    StyleSheet,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import SortCategories from "../components/sortCategories";
import Destinations from "../components/destinations";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
    const [searchText, setSearchText] = useState("");
    const navigation = useNavigation(); // Hook để sử dụng điều hướng

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={ios ? styles.iosPadding : styles.androidPadding}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Khám phá ngay</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Image
                            source={require("../../assets/images/avatar.jpg")}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
                        <TextInput
                            placeholder="Tìm kiếm điểm đến"
                            placeholderTextColor="gray"
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={setSearchText} // Cập nhật searchText
                        />
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    <Categories searchText={searchText} /> {/* Truyền searchText */}
                </View>

                {/* Sort Categories */}
                <View style={styles.sortCategoriesContainer}>
                    <SortCategories />
                </View>

                {/* Destinations */}
                <View style={styles.destinationsContainer}>
                    <Destinations />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    iosPadding: {
        paddingTop: 10,
    },
    androidPadding: {
        paddingTop: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 10,
    },
    headerText: {
        fontSize: wp(7),
        fontWeight: "bold",
        color: "#3b3b3b",
    },
    avatar: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
    },
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 25,
        padding: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: wp(4),
        color: "#3b3b3b",
        paddingLeft: 10,
    },
    categoriesContainer: {
        marginBottom: 10,
    },
    sortCategoriesContainer: {
        marginBottom: -20,
    },
    destinationsContainer: {
        marginBottom: 10,
        marginTop: 10,
    },
});
