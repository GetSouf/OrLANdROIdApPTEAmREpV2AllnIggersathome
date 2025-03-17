import React, { useState, useLayoutEffect } from "react";
import { FlatList, View, TouchableHighlight, Image, Text, StyleSheet } from "react-native";
import { fetchTopApplications } from "../../../SqlMethods/AppTopSql";
import RefreshControlWrapper from "../../components/SharedRefresh/RefreshControlWrapper.js";

export default function ApiTest(props) {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useLayoutEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setRefreshing(true);
        try {
            const result = await fetchTopApplications(0,5,5);
            if (result.status === 200) {
                setData(result.data);
            }
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        } finally {
            setRefreshing(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.Название}</Text>
            <Text>{item.Разработчик}</Text>
            <Text>{item.Категория}</Text>
            <Text>{item.Возрастноеограничение}</Text>
            <Text>{item.Рейтинг}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item["Имя пакета"]}
                refreshControl={
                    <RefreshControlWrapper refreshing={refreshing} onRefresh={loadData} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
