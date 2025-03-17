import React, { useState } from "react";
import { RefreshControl } from "react-native";

export default function RefreshControlWrapper({ refreshing, onRefresh, children }) {
  const [isRefreshing, setIsRefreshing] = useState(refreshing || false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh(); // Вызываем переданную функцию для обновления данных
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      colors={['blue']}
      tintColor="blue"
    >
      {children}
    </RefreshControl>
  );
}