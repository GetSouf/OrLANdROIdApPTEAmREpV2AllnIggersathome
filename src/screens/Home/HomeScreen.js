import React, { useLayoutEffect } from "react";
import { FlatList, View, TouchableHighlight, Image, Text } from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import RefreshControlWrapper from "../../components/SharedRefresh/RefreshControlWrapper.js";

export default function HomeScreen(props) {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
    
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="blue" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  // Функция для имитации обновления данных
  const fetchDataFromLocal = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(recipes); // Возвращаем локальные данные
      }, 300); // Имитация задержки загрузки
    });
  };

  return (
    <View>
      <FlatList
        data={recipes}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
        numColumns={2}
        refreshControl={
          <RefreshControlWrapper
            onRefresh={fetchDataFromLocal} // Передаем функцию обновления данных
          />
        }
      />
    </View>
  );
}