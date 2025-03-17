import React, { useLayoutEffect } from "react";
import { FlatList, View, TouchableHighlight, Image, Text } from "react-native";
import styles from "./styles";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import RefreshControlWrapper from "../../components/SharedRefresh/RefreshControlWrapper.js";

export default function CategoriesScreen(props) {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="blue" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text>
      </View>
    </TouchableHighlight>
  );

  // Функция для имитации обновления данных
  const fetchCategoriesFromLocal = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categories); // Возвращаем локальные данные
      }, 300); // Имитация задержки загрузки
    });
  };

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
        refreshControl={
          <RefreshControlWrapper
            onRefresh={fetchCategoriesFromLocal} // Передаем функцию обновления данных
          />
        }
      />
    </View>
  );
}