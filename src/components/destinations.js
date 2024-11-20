import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { destinationData } from "../constants"; // Chỉ giữ import dữ liệu điểm đến
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { HeartIcon } from "react-native-heroicons/solid";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Destinations() {
    const navigation = useNavigation();
    const [selectedFilter, setSelectedFilter] = useState('Tất cả'); // Mặc định là "Tất cả"

    // Lọc dữ liệu theo danh mục
    const filteredDestinations =
        selectedFilter === 'Tất cả'
            ? destinationData // Hiển thị tất cả nếu không có bộ lọc
            : destinationData.filter(item => item.category === selectedFilter); // Lọc theo danh mục

    return (
        <View style={styles.container}>
            {/* Bộ lọc */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterContainer}
            >
                {['Tất cả', 'Phổ biến', 'Đề xuất', 'Xem thêm'].map((filter, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedFilter(filter)}
                        style={[
                            styles.filterItem,
                            selectedFilter === filter && styles.activeFilterItem
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedFilter === filter && styles.activeFilterText
                            ]}
                        >
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Danh sách điểm đến */}
            <View style={styles.cardsContainer}>
                {filteredDestinations.map((item, index) => (
                    <DestinationCard item={item} key={index} navigation={navigation} />
                ))}
            </View>
        </View>
    );
}

const DestinationCard = ({ item, navigation }) => {
    const [isFavorite, setFavorite] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Destination', { ...item, isFavorite })}
            style={styles.card}
        >
            <Image source={item.image} style={styles.cardImage} />
            <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.gradient} />

            <TouchableOpacity
                onPress={() => setFavorite(!isFavorite)}
                style={styles.favoriteButton}
            >
                <HeartIcon size={wp(5)} color={isFavorite ? 'red' : "white"} />
            </TouchableOpacity>

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.shortDescription}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
        justifyContent: 'center',
    },
    filterItem: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        marginHorizontal: 5,
        textAlign: 'center',
    },
    activeFilterItem: {
        backgroundColor: '#3b82f6',
    },
    filterText: {
        color: '#3b3b3b',
        fontSize: wp(3.5),
    },
    activeFilterText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 15,
    },
    card: {
        justifyContent: 'flex-end',
        width: wp(44),
        height: wp(65),
        padding: 10,
        marginBottom: 15,
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        position: 'absolute',
        
    },
    gradient: {
        width: wp(44),
        height: hp(15),
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        bottom: 0,
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: 8,
        borderRadius: 15,
    },
    cardTitle: {
        fontSize: wp(4),
        color: 'white',
        fontWeight: '600',
    },
    cardDescription: {
        fontSize: wp(2.5),
        color: 'white',
    },
});
