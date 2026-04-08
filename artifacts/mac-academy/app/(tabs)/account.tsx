import React, { useState, useRef } from "react";
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
  Share,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { usePro } from "@/context/ProContext";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Admin config ────────────────────────────────────────────────────────────
// Must match SECRET_KEY in ProContext.tsx and code-generator.html
const SECRET_KEY    = "X8K2";
const ADMIN_PASSWORD = "macadmin123";
const HIST_KEY = "@mac_code_history";

function randomChars(n: number) {
  const pool = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < n; i++) out += pool[Math.floor(Math.random() * pool.length)];
  return out;
}

function generateNewCode() {
  return `MAC-${randomChars(4)}-${SECRET_KEY}`;
}

async function saveCodeToHistory(code: string) {
  try {
    const raw = await AsyncStorage.getItem(HIST_KEY);
    const list: { code: string; date: string }[] = raw ? JSON.parse(raw) : [];
    list.unshift({ code, date: new Date().toLocaleString() });
    await AsyncStorage.setItem(HIST_KEY, JSON.stringify(list.slice(0, 100)));
  } catch {}
}

async function loadHistory(): Promise<{ code: string; date: string }[]> {
  try {
    const raw = await AsyncStorage.getItem(HIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
// ─────────────────────────────────────────────────────────────────────────────

export default function AccountScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { isPro, unlockPro } = usePro();
  const router = useRouter();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = (Platform.OS === "web" ? 34 : insets.bottom) + 90;

  // Pro modal
  const [proModalVisible, setProModalVisible] = useState(false);
  const [proCode, setProCode] = useState("");
  const [codeError, setCodeError] = useState("");

  // Admin unlock (tap version 5×)
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [adminVisible, setAdminVisible] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const [adminPwError, setAdminPwError] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);

  // Admin generator
  const [generatedCode, setGeneratedCode] = useState("");
  const [history, setHistory] = useState<{ code: string; date: string }[]>([]);
  const [historyVisible, setHistoryVisible] = useState(false);

  const handleVersionTap = () => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 1500);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setAdminVisible(true);
    }
  };

  const handleAdminLogin = () => {
    if (adminPw === ADMIN_PASSWORD) {
      setAdminAuthed(true);
      setAdminPwError("");
      loadHistory().then(setHistory);
    } else {
      setAdminPwError("Incorrect password.");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleGenerate = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const code = generateNewCode();
    setGeneratedCode(code);
    await saveCodeToHistory(code);
    const updated = await loadHistory();
    setHistory(updated);
  };

  const handleCopyCode = async () => {
    if (!generatedCode) return;
    try {
      await Share.share({ message: generatedCode });
    } catch {}
  };

  const handleWhatsApp = () => {
    if (!generatedCode) return;
    const msg = encodeURIComponent(
      `Hi! Here is your Mac Academy Pro unlock code:\n\n${generatedCode}\n\nOpen the app → Courses tab → tap "Unlock Pro Lessons" → enter the code. Enjoy! 🎬`
    );
    Linking.openURL(`https://wa.me/?text=${msg}`);
  };

  const handleCloseAdmin = () => {
    setAdminVisible(false);
    setAdminAuthed(false);
    setAdminPw("");
    setAdminPwError("");
    setGeneratedCode("");
    setHistoryVisible(false);
  };

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
        <Text style={[styles.pageTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Account</Text>

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

        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Preferences</Text>
        <View style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingLeft}>
            <Feather name={isDark ? "moon" : "sun"} size={20} color={colors.primary} />
            <Text style={[styles.settingLabel, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>Dark Mode</Text>
          </View>
          <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ false: colors.border, true: colors.primary }} thumbColor="#fff" />
        </View>

        {!isPro && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Pro Access</Text>
            <TouchableOpacity
              style={[styles.proRow, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "40" }]}
              onPress={() => setProModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={[styles.proIcon, { backgroundColor: colors.primary }]}>
                <Feather name="unlock" size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.proTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Enter Pro Code</Text>
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

        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Use on Multiple Phones</Text>
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
              <Text style={[styles.stepText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>{step}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.signOutBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={18} color={colors.destructive} />
          <Text style={[styles.signOutText, { color: colors.destructive, fontFamily: "Inter_600SemiBold" }]}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleVersionTap} activeOpacity={1} style={styles.versionWrap}>
          <Text style={[styles.versionText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Mac Academy v4.0
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Pro Unlock Modal ────────────────────────────── */}
      <Modal visible={proModalVisible} transparent animationType="slide" onRequestClose={() => setProModalVisible(false)}>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setProModalVisible(false)} />
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
            <View style={styles.sheetTitleRow}>
              <Text style={[styles.sheetTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Unlock Pro Access</Text>
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
            <Text style={[styles.inputLabel, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>Enter Pro Code</Text>
            <TextInput
              style={[styles.codeInput, { backgroundColor: colors.background, borderColor: codeError ? colors.destructive : colors.border, color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
              value={proCode}
              onChangeText={(v) => { setProCode(v); setCodeError(""); }}
              placeholder="e.g. MAC-AB3X-X8K2"
              placeholderTextColor={colors.mutedForeground}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            {!!codeError && <Text style={[styles.codeError, { color: colors.destructive, fontFamily: "Inter_400Regular" }]}>{codeError}</Text>}
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

      {/* ── Admin Code Generator Modal ──────────────────── */}
      <Modal visible={adminVisible} transparent animationType="slide" onRequestClose={handleCloseAdmin}>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleCloseAdmin} />
          <View style={[styles.adminSheet, { backgroundColor: colors.card }]}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />

            {!adminAuthed ? (
              /* Login screen */
              <View style={styles.adminSection}>
                <View style={styles.adminTitleRow}>
                  <View style={[styles.adminIconWrap, { backgroundColor: "#FF6B1A20" }]}>
                    <Feather name="shield" size={22} color="#FF6B1A" />
                  </View>
                  <View>
                    <Text style={[styles.adminTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Admin Panel</Text>
                    <Text style={[styles.adminSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>Code Generator</Text>
                  </View>
                </View>
                <Text style={[styles.inputLabel, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>Admin Password</Text>
                <TextInput
                  style={[styles.codeInput, { backgroundColor: colors.background, borderColor: adminPwError ? colors.destructive : colors.border, color: colors.foreground, fontFamily: "Inter_400Regular", letterSpacing: 1 }]}
                  value={adminPw}
                  onChangeText={(v) => { setAdminPw(v); setAdminPwError(""); }}
                  placeholder="Enter admin password"
                  placeholderTextColor={colors.mutedForeground}
                  secureTextEntry
                  onSubmitEditing={handleAdminLogin}
                  returnKeyType="done"
                />
                {!!adminPwError && <Text style={[styles.codeError, { color: colors.destructive, fontFamily: "Inter_400Regular" }]}>{adminPwError}</Text>}
                <TouchableOpacity
                  style={[styles.submitBtn, { backgroundColor: "#FF6B1A" }, !adminPw && { opacity: 0.5 }]}
                  onPress={handleAdminLogin}
                  disabled={!adminPw}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.submitBtnText, { fontFamily: "Inter_700Bold" }]}>Login</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* Generator screen */
              <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
                <View style={styles.adminSection}>
                  <View style={styles.adminTitleRow}>
                    <View style={[styles.adminIconWrap, { backgroundColor: "#FF6B1A20" }]}>
                      <Feather name="key" size={22} color="#FF6B1A" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.adminTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Code Generator</Text>
                      <Text style={[styles.adminSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                        1 code per paying student
                      </Text>
                    </View>
                    <TouchableOpacity onPress={handleCloseAdmin}>
                      <Feather name="x" size={20} color={colors.mutedForeground} />
                    </TouchableOpacity>
                  </View>

                  {/* Generated code display */}
                  <View style={[styles.codeBox, { backgroundColor: colors.background, borderColor: generatedCode ? "#FF6B1A50" : colors.border }]}>
                    {generatedCode ? (
                      <Text style={[styles.bigCode, { color: "#FF6B1A", fontFamily: "Inter_700Bold" }]}>{generatedCode}</Text>
                    ) : (
                      <Text style={[styles.bigCodeEmpty, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                        Tap Generate to create a code
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={[styles.submitBtn, { backgroundColor: "#FF6B1A" }]}
                    onPress={handleGenerate}
                    activeOpacity={0.85}
                  >
                    <Feather name="zap" size={18} color="#fff" />
                    <Text style={[styles.submitBtnText, { fontFamily: "Inter_700Bold" }]}>Generate Code</Text>
                  </TouchableOpacity>

                  {generatedCode ? (
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: colors.background, borderColor: colors.border }]}
                        onPress={handleCopyCode}
                        activeOpacity={0.8}
                      >
                        <Feather name="copy" size={16} color={colors.foreground} />
                        <Text style={[styles.actionBtnText, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>Copy / Share</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: "#25D36620", borderColor: "#25D36640" }]}
                        onPress={handleWhatsApp}
                        activeOpacity={0.8}
                      >
                        <Feather name="message-circle" size={16} color="#25D366" />
                        <Text style={[styles.actionBtnText, { color: "#25D366", fontFamily: "Inter_600SemiBold" }]}>WhatsApp</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}

                  {/* History */}
                  <TouchableOpacity
                    style={[styles.historyToggle, { borderColor: colors.border }]}
                    onPress={() => setHistoryVisible(!historyVisible)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.historyToggleText, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                      History ({history.length})
                    </Text>
                    <Feather name={historyVisible ? "chevron-up" : "chevron-down"} size={16} color={colors.mutedForeground} />
                  </TouchableOpacity>

                  {historyVisible && (
                    <View style={{ gap: 8 }}>
                      {history.length === 0 ? (
                        <Text style={[styles.emptyHist, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                          No codes generated yet.
                        </Text>
                      ) : (
                        history.map((item, i) => (
                          <View key={i} style={[styles.histItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <View style={{ flex: 1 }}>
                              <Text style={[styles.histCode, { color: "#FF6B1A", fontFamily: "Inter_700Bold" }]}>{item.code}</Text>
                              <Text style={[styles.histDate, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>{item.date}</Text>
                            </View>
                            <TouchableOpacity onPress={() => Share.share({ message: item.code }).catch(() => {})}>
                              <Feather name="share-2" size={15} color={colors.mutedForeground} />
                            </TouchableOpacity>
                          </View>
                        ))
                      )}
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
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
  profileCard: { flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 4 },
  avatar: { width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 22 },
  userName: { fontSize: 17, fontWeight: "700" },
  userEmail: { fontSize: 13, marginTop: 2 },
  proBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  proBadgeText: { fontSize: 12, color: "#fff", fontWeight: "700" },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginTop: 8, marginBottom: 2 },
  settingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: 14, borderWidth: 1, padding: 16 },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  settingLabel: { fontSize: 15 },
  proRow: { flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 14, borderWidth: 1, padding: 16 },
  proIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  proTitle: { fontSize: 15, fontWeight: "700" },
  proSub: { fontSize: 12, marginTop: 2 },
  proUnlockedBanner: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 14, borderWidth: 1, padding: 14 },
  proUnlockedText: { fontSize: 14 },
  infoCard: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 14 },
  stepRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  stepNum: { width: 24, height: 24, borderRadius: 8, alignItems: "center", justifyContent: "center", marginTop: 1 },
  stepNumText: { fontSize: 12, color: "#fff" },
  stepText: { flex: 1, fontSize: 13, lineHeight: 20 },
  signOutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 14, borderWidth: 1, padding: 16, marginTop: 8 },
  signOutText: { fontSize: 15, fontWeight: "600" },
  versionWrap: { alignItems: "center", paddingVertical: 16 },
  versionText: { fontSize: 12 },
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingTop: 16, gap: 14 },
  adminSheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingTop: 16, maxHeight: "90%", alignItems: "center" },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 8 },
  sheetTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sheetTitle: { fontSize: 20, fontWeight: "700" },
  pricePill: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4 },
  priceText: { fontSize: 13, fontWeight: "700" },
  paySteps: { borderRadius: 12, borderWidth: 1, padding: 14, gap: 12 },
  payStep: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  payNum: { width: 22, height: 22, borderRadius: 7, alignItems: "center", justifyContent: "center", marginTop: 1 },
  payNumText: { fontSize: 11, color: "#fff" },
  payStepText: { flex: 1, fontSize: 13, lineHeight: 20 },
  inputLabel: { fontSize: 14 },
  codeInput: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 17, textAlign: "center", letterSpacing: 2 },
  codeError: { fontSize: 13, textAlign: "center", marginTop: -6 },
  submitBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 14, paddingVertical: 18, marginTop: 4 },
  submitBtnText: { fontSize: 17, color: "#fff", fontWeight: "700" },
  adminSection: { width: "100%", gap: 14 },
  adminTitleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  adminIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  adminTitle: { fontSize: 18, fontWeight: "700" },
  adminSub: { fontSize: 12, marginTop: 2 },
  codeBox: { borderRadius: 16, borderWidth: 1.5, padding: 24, alignItems: "center", minHeight: 80, justifyContent: "center" },
  bigCode: { fontSize: 26, fontWeight: "700", letterSpacing: 3 },
  bigCodeEmpty: { fontSize: 14, textAlign: "center" },
  actionRow: { flexDirection: "row", gap: 10 },
  actionBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 12, borderWidth: 1, paddingVertical: 14 },
  actionBtnText: { fontSize: 14, fontWeight: "600" },
  historyToggle: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1, paddingTop: 14 },
  historyToggleText: { fontSize: 14 },
  emptyHist: { fontSize: 13, textAlign: "center", padding: 12 },
  histItem: { flexDirection: "row", alignItems: "center", borderRadius: 10, borderWidth: 1, padding: 12, gap: 10 },
  histCode: { fontSize: 15, letterSpacing: 1.5 },
  histDate: { fontSize: 11, marginTop: 2 },
});
