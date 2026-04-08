import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/context/AuthContext";
import * as Haptics from "expo-haptics";

export default function SignInPage() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const handleSignIn = async () => {
    if (!email.trim() || !password) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setError("");
    setLoading(true);
    const err = await signIn(email.trim(), password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      router.replace("/(tabs)" as any);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={[styles.container, { paddingTop: topPadding + 40, paddingBottom: bottomPadding + 20 }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoSection}>
        <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
          <Feather name="play-circle" size={34} color="#fff" />
        </View>
        <Text style={[styles.appName, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Mac Academy</Text>
        <Text style={[styles.tagline, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          FlipaClip Animation Courses
        </Text>
      </View>

      <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Welcome back</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
        Sign in to continue your learning
      </Text>

      <Text style={[styles.label, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>Email</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: error ? colors.destructive : colors.border, color: colors.foreground, fontFamily: "Inter_400Regular" }]}
        value={email}
        onChangeText={(v) => { setEmail(v); setError(""); }}
        placeholder="your@email.com"
        placeholderTextColor={colors.mutedForeground}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={[styles.label, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>Password</Text>
      <View style={styles.passwordWrap}>
        <TextInput
          style={[styles.input, styles.passwordInput, { backgroundColor: colors.card, borderColor: error ? colors.destructive : colors.border, color: colors.foreground, fontFamily: "Inter_400Regular" }]}
          value={password}
          onChangeText={(v) => { setPassword(v); setError(""); }}
          placeholder="Password"
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? "eye-off" : "eye"} size={18} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>

      {!!error && (
        <Text style={[styles.errorText, { color: colors.destructive, fontFamily: "Inter_400Regular" }]}>{error}</Text>
      )}

      <TouchableOpacity
        style={[styles.primaryBtn, { backgroundColor: colors.primary }, (!email || !password || loading) && { opacity: 0.6 }]}
        onPress={handleSignIn}
        disabled={!email || !password || loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.primaryBtnText, { fontFamily: "Inter_700Bold" }]}>Sign In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={[styles.linkText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          No account?{" "}
        </Text>
        <Link href="/(auth)/sign-up" asChild>
          <TouchableOpacity>
            <Text style={[styles.link, { color: colors.primary, fontFamily: "Inter_600SemiBold" }]}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, gap: 12 },
  logoSection: { alignItems: "center", gap: 8, marginBottom: 28 },
  logoCircle: { width: 72, height: 72, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  appName: { fontSize: 26, fontWeight: "700" },
  tagline: { fontSize: 14 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 15, marginBottom: 8 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: -4 },
  input: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15 },
  passwordWrap: { position: "relative" },
  passwordInput: { paddingRight: 48 },
  eyeBtn: { position: "absolute", right: 14, top: 0, bottom: 0, justifyContent: "center" },
  errorText: { fontSize: 13, marginTop: -4 },
  primaryBtn: { borderRadius: 14, paddingVertical: 18, alignItems: "center", justifyContent: "center", marginTop: 4 },
  primaryBtnText: { fontSize: 17, fontWeight: "700", color: "#fff" },
  linkRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  linkText: { fontSize: 14 },
  link: { fontSize: 14, fontWeight: "600" },
});
