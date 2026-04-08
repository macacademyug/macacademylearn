import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { usePro } from "@/context/ProContext";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

export default function AccountScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { isPro, unlockPro } = usePro();
  const router = useRouter();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = (Platform.OS === "web" ? 34 : insets.bottom) + 90;

  const [proModalVisible, setProModalVisible] = useState(false);
  const [proCode, setProCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const handleSignOut = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await signOut();
    router.replace("/(auth)/sign-in" as any);
  };

  const handleSubmitCode = () => {
    const ok = unlockPro(proCode);
    if (ok) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setProModalVisible(false);
      setProCode("");
      setCodeError("");
      Alert.alert("Pro Unlocked!", "You now have access to all Pro lessons. Enjoy!");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setCodeError("Invalid code. Please double-check and try again.");
    }
  };

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.content, { paddingTop: topPadding + 16, paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.pageTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Account
        </Text>

        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.primary + "20" }]}>
            <Text style={[styles.avatarText, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
              {user?.username?.charAt(0).toUpperCase() ?? "?"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.userName, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {user?.username ?? "User"}
            </Text>
            <Text style={[styles.userEmail, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {user?.email ?? ""}
            </Text>
          </View>
          {isPro && (
            <View style={[styles.proBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.proBadgeText, { fontFamily: "Inter_700Bold" }]}>PRO</Text>
            </View>
          )}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Preferences
        </Text>

        <View style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingLeft}>
            <Feather name={isDark ? "moon" : "sun"} size={20} color={colors.primary} />
            <Text style={[styles.settingLabel, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>
              Dark Mode
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#fff"
          />
        </View>

        {!isPro && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              Pro Access
            </Text>
            <TouchableOpacity
              style={[styles.proRow, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "40" }]}
              onPress={() => setProModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={[styles.proIcon, { backgroundColor: colors.primary }]}>
                <Feather name="unlock" size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.proTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                  Enter Pro Code
                </Text>
                <Text style={[styles.proSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                  Already paid? Tap here to enter your code
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
            </TouchableOpacity>
          </>
        )}

        {isPro && (
          <View style={[styles.proUnlockedBanner, { backgroundColor: "#22c55e18", borderColor: "#22c55e40" }]}>
            <Feather name="check-circle" size={20} color="#22c55e" />
            <Text style={[styles.proUnlockedText, { color: "#22c55e", fontFamily: "Inter_600SemiBold" }]}>
              Pro access is active — all lessons unlocked!
            </Text>
          </View>
        )}

        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Use on Multiple Phones
        </Text>
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {[
            "Sign up with the same email and password on any device",
            "Your progress is saved per device (tap Mark as Complete on each lesson)",
            "If you have a Pro code, just enter it again on each new device",
          ].map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepNum, { backgroundColor: colors.primary }]}>
                <Text style={[styles.stepNumText, { fontFamily: "Inter_700Bold" }]}>{i + 1}</Text>
              </View>
              <Text style={[styles.stepText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.signOutBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={18} color={colors.destructive} />
          <Text style={[styles.signOutText, { color: colors.destructive, fontFamily: "Inter_600SemiBold" }]}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={proModalVisible} transparent animationType="slide" onRequestClose={() => setProModalVisible(false)}>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setProModalVisible(false)} />
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
            <View style={styles.sheetTitleRow}>
              <Text style={[styles.sheetTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                Unlock Pro Access
              </Text>
              <View style={[styles.pricePill, { backgroundColor: colors.primary + "20", borderColor: colors.primary + "40" }]}>
                <Text style={[styles.priceText, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>25,000 UGX</Text>
              </View>
            </View>

            <View style={[styles.paySteps, { backgroundColor: colors.background, borderColor: colors.border }]}>
              {[
                "Send Mobile Money to 0745414641 (Mac Academy)",
                "Send payment screenshot to WhatsApp or email",
                "Receive your unique Pro code from us",
                "Enter the code below to unlock all lessons",
              ].map((s, i) => (
                <View key={i} style={styles.payStep}>
                  <View style={[styles.payNum, { backgroundColor: colors.primary }]}>
                    <Text style={[styles.payNumText, { fontFamily: "Inter_700Bold" }]}>{i + 1}</Text>
                  </View>
                  <Text style={[styles.payStepText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>{s}</Text>
                </View>
              ))}
            </View>

            <Text style={[styles.inputLabel, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>
              Enter Pro Code
            </Text>
            <TextInput
              style={[styles.codeInput, { backgroundColor: colors.background, borderColor: codeError ? colors.destructive : colors.border, color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
              value={proCode}
              onChangeText={(v) => { setProCode(v); setCodeError(""); }}
              placeholder="e.g. MAC-PRO-2024"
              placeholderTextColor={colors.mutedForeground}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            {!!codeError && (
              <Text style={[styles.codeError, { color: colors.destructive, fontFamily: "Inter_400Regular" }]}>{codeError}</Text>
            )}

            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: colors.primary }, !proCode.trim() && { opacity: 0.5 }]}
              onPress={handleSubmitCode}
              disabled={!proCode.trim()}
              activeOpacity={0.85}
            >
              <Text style={[styles.submitBtnText, { fontFamily: "Inter_700Bold" }]}>Unlock Pro</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, gap: 12 },
  pageTitle: { fontSize: 26, fontWeight: "700", marginBottom: 8 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 22 },
  userName: { fontSize: 17, fontWeight: "700" },
  userEmail: { fontSize: 13, marginTop: 2 },
  proBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  proBadgeText: { fontSize: 12, color: "#fff", fontWeight: "700" },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginTop: 8, marginBottom: 2 },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingLabel: { fontSize: 15 },
  proRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  proIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  proTitle: { fontSize: 15, fontWeight: "700" },
  proSub: { fontSize: 12, marginTop: 2 },
  proUnlockedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  proUnlockedText: { fontSize: 14 },
  infoCard: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 14 },
  stepRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  stepNum: { width: 24, height: 24, borderRadius: 8, alignItems: "center", justifyContent: "center", marginTop: 1 },
  stepNumText: { fontSize: 12, color: "#fff" },
  stepText: { flex: 1, fontSize: 13, lineHeight: 20 },
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginTop: 8,
  },
  signOutText: { fontSize: 15, fontWeight: "600" },
  sheetTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  pricePill: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4 },
  priceText: { fontSize: 13, fontWeight: "700" },
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 16,
    gap: 14,
  },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 8 },
  sheetTitle: { fontSize: 20, fontWeight: "700" },
  paySteps: { borderRadius: 12, borderWidth: 1, padding: 14, gap: 12 },
  payStep: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  payNum: { width: 22, height: 22, borderRadius: 7, alignItems: "center", justifyContent: "center", marginTop: 1 },
  payNumText: { fontSize: 11, color: "#fff" },
  payStepText: { flex: 1, fontSize: 13, lineHeight: 20 },
  inputLabel: { fontSize: 14 },
  codeInput: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 17,
    textAlign: "center",
    letterSpacing: 2,
  },
  codeError: { fontSize: 13, textAlign: "center", marginTop: -6 },
  submitBtn: { borderRadius: 14, paddingVertical: 18, alignItems: "center", marginTop: 4 },
  submitBtnText: { fontSize: 17, color: "#fff", fontWeight: "700" },
});
