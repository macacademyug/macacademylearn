import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0d0d0d" }}>
        <ActivityIndicator color="#FF6B1A" />
      </View>
    );
  }
  if (!user) return <Redirect href="/(auth)/sign-in" />;
  return <Redirect href="/(tabs)" />;
}
