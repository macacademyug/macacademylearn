import React, { useCallback, useEffect, useState } from "react";
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
import { useSignIn, useSSO } from "@clerk/expo";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import * as Haptics from "expo-haptics";

WebBrowser.maybeCompleteAuthSession();

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => { void WebBrowser.coolDownAsync(); };
  }, []);
};

export default function SignInPage() {
  useWarmUpBrowser();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn, errors, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const handleEmailSignIn = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const { error } = await signIn.password({ emailAddress: email, password });
    if (error) return;
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          if (url.startsWith("http")) { if (typeof window !== "undefined") window.location.href = url; }
          else router.push(url as any);
        },
      });
    }
  };

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          if (url.startsWith("http")) { if (typeof window !== "undefined") window.location.href = url; }
          else router.push(url as any);
        },
      });
    }
  };

  const handleGoogleSignIn = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ decorateUrl }) => {
            router.push(decorateUrl("/") as any);
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [startSSOFlow]);

  if (signIn.status === "needs_client_trust") {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPadding + 40, paddingBottom: bottomPadding + 20 }]}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Verify Identity</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          Enter the code sent to your email
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, fontFamily: "Inter_400Regular" }]}
          value={code}
          onChangeText={setCode}
          placeholder="Verification code"
          placeholderTextColor={colors.mutedForeground}
          keyboardType="numeric"
        />
        <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={handleVerify}>
          <Text style={[styles.primaryBtnText, { fontFamily: "Inter_700Bold" }]}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

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

      <TouchableOpacity
        style={[styles.googleBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={handleGoogleSignIn}
        activeOpacity={0.8}
      >
        <Feather name="globe" size={18} color={colors.foreground} />
        <Text style={[styles.googleText, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
          Continue with Google
        </Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>or</Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      <Text style={[styles.label, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>Email</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, borderColor: errors?.fields?.identifier ? colors.destructive : colors.border, color: colors.foreground, fontFamily: "Inter_400Regular" }]}
        value={email}
        onChangeText={setEmail}
        placeholder="your@email.com"
        placeholderTextColor={colors.mutedForeground}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors?.fields?.identifier && (
        <Text style={[styles.errorText, { color: colors.destructive, fontFamily: "Inter_400Regular" }]}>
          {errors.fields.identifier.message}
        </Text>
      )}

      <Text style={[styles.label, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>Password</Text>
      <View style={styles.passwordWrap}>
        <TextInput
          style={[styles.input, styles.passwordInput, { backgroundColor: colors.card, borderColor: errors?.fields?.password ? colors.destructive : colors.border, color: colors.foreground, fontFamily: "Inter_400Regular" }]}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? "eye-off" : "eye"} size={18} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>
      {errors?.fields?.password && (
        <Text style={[styles.errorText, { color: colors.destructive, fontFamily: "Inter_400Regular" }]}>
          {errors.fields.password.message}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.primaryBtn,
          { backgroundColor: colors.primary },
          (!email || !password || fetchStatus === "fetching") && { opacity: 0.6 },
        ]}
        onPress={handleEmailSignIn}
        disabled={!email || !password || fetchStatus === "fetching"}
        activeOpacity={0.85}
      >
        {fetchStatus === "fetching" ? (
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
  logoCircle: {
    width: 72, height: 72, borderRadius: 24,
    alignItems: "center", justifyContent: "center",
  },
  appName: { fontSize: 26, fontWeight: "700" },
  tagline: { fontSize: 14 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 15, marginBottom: 8 },
  googleBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 10, borderRadius: 14, borderWidth: 1, paddingVertical: 16,
  },
  googleText: { fontSize: 16, fontWeight: "600" },
  divider: { flexDirection: "row", alignItems: "center", gap: 12, marginVertical: 4 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: -4 },
  input: {
    borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15,
  },
  passwordWrap: { position: "relative" },
  passwordInput: { paddingRight: 48 },
  eyeBtn: { position: "absolute", right: 14, top: 0, bottom: 0, justifyContent: "center" },
  errorText: { fontSize: 12, marginTop: -6 },
  primaryBtn: {
    borderRadius: 14, paddingVertical: 18, alignItems: "center", justifyContent: "center",
    marginTop: 4,
  },
  primaryBtnText: { fontSize: 17, fontWeight: "700", color: "#fff" },
  linkRow: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  linkText: { fontSize: 14 },
  link: { fontSize: 14, fontWeight: "600" },
});
