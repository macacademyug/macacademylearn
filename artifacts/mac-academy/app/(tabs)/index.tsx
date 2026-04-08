import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { usePro } from "@/context/ProContext";
import CourseCard from "@/components/CourseCard";
import { COURSES } from "@/data/courses";
import * as Haptics from "expo-haptics";

function OverallProgressBar() {
  const colors = useColors();
  const { getCourseProgress } = useProgress();
  const total = COURSES.reduce((s, c) => s + c.totalLessons, 0);
  const done = COURSES.reduce(
    (s, c) => s + Math.round((getCourseProgress(c.id, c.totalLessons) / 100) * c.totalLessons),
    0
  );
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.progressTopRow}>
        <View>
          <Text style={[styles.progressTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Your Progress
          </Text>
          <Text style={[styles.progressSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {done} of {total} lessons completed
          </Text>
        </View>
        <Text style={[styles.progressPct, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
          {pct}%
        </Text>
      </View>
      <View style={[styles.barTrack, { backgroundColor: colors.progressTrack }]}>
        <View style={[styles.barFill, { width: `${pct}%` as any, backgroundColor: colors.primary }]} />
      </View>
    </View>
  );
}

export default function CoursesScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isPro, unlockPro } = usePro();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = (Platform.OS === "web" ? 34 : insets.bottom) + 90;

  const [modalVisible, setModalVisible] = useState(false);
  const [proCode, setProCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const handleUnlockPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };

  const handleSubmitCode = () => {
    const ok = unlockPro(proCode);
    if (ok) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setModalVisible(false);
      setProCode("");
      setCodeError("");
      Alert.alert("Pro Unlocked!", "You now have access to all Pro lessons. Enjoy!");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setCodeError("Invalid code. Please check and try again.");
    }
  };

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.content, { paddingTop: topPadding + 16, paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.appName, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
              Mac Academy
            </Text>
            <Text style={[styles.tagline, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              FlipaClip Animation Courses
            </Text>
          </View>
          <View style={[styles.logoMark, { backgroundColor: colors.primary }]}>
            <Feather name="play" size={20} color="#fff" />
          </View>
        </View>

        <OverallProgressBar />

        {!isPro ? (
          <TouchableOpacity
            style={[styles.proBtn, { backgroundColor: colors.primary }]}
            onPress={handleUnlockPress}
            activeOpacity={0.85}
          >
            <Feather name="unlock" size={18} color="#fff" />
            <Text style={[styles.proBtnText, { fontFamily: "Inter_700Bold" }]}>Unlock Pro Lessons</Text>
            <View style={styles.proBadge}>
              <Text style={[styles.proBadgeText, { fontFamily: "Inter_700Bold" }]}>PRO</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={[styles.proActiveRow, { backgroundColor: "#22c55e18", borderColor: "#22c55e40" }]}>
            <Feather name="check-circle" size={18} color="#22c55e" />
            <Text style={[styles.proActiveText, { color: "#22c55e", fontFamily: "Inter_600SemiBold" }]}>
              Pro Access Active — all lessons unlocked!
            </Text>
          </View>
        )}

        <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          All Courses
        </Text>

        {COURSES.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={() => router.push(`/course/${course.id}` as any)}
          />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setModalVisible(false)} />
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
            <Text style={[styles.sheetTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              Unlock Pro Lessons
            </Text>

            <View style={[styles.paySteps, { backgroundColor: colors.background, borderColor: colors.border }]}>
              {[
                "Send Mobile Money to 0745414641 (Mac Academy)",
                "Send your payment screenshot to WhatsApp or email below",
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

            <View style={styles.contactRow}>
              <Feather name="message-circle" size={14} color="#25D366" />
              <Text style={[styles.contactInfo, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                WhatsApp: 0745414641
              </Text>
              <Feather name="mail" size={14} color={colors.primary} style={{ marginLeft: 12 }} />
              <Text style={[styles.contactInfo, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                alexkasaba2006@gmail.com
              </Text>
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
  content: { paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  appName: { fontSize: 26, fontWeight: "700" },
  tagline: { fontSize: 13, marginTop: 2 },
  logoMark: {
    width: 44, height: 44, borderRadius: 14,
    alignItems: "center", justifyContent: "center", paddingLeft: 2,
  },
  progressCard: {
    borderRadius: 16, borderWidth: 1, padding: 16, gap: 10, marginBottom: 14,
  },
  progressTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  progressTitle: { fontSize: 15, fontWeight: "700" },
  progressSub: { fontSize: 12, marginTop: 2 },
  progressPct: { fontSize: 28, fontWeight: "700" },
  barTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 3 },
  proBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 10, borderRadius: 16, paddingVertical: 18, marginBottom: 24,
    shadowColor: "#FF6B1A", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 12, elevation: 6,
  },
  proBtnText: { fontSize: 17, fontWeight: "700", color: "#fff" },
  proBadge: { backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  proBadgeText: { fontSize: 11, color: "#fff", fontWeight: "700" },
  proActiveRow: {
    flexDirection: "row", alignItems: "center", gap: 10,
    borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 20,
  },
  proActiveText: { fontSize: 14 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingTop: 16, gap: 14 },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 8 },
  sheetTitle: { fontSize: 20, fontWeight: "700" },
  paySteps: { borderRadius: 12, borderWidth: 1, padding: 14, gap: 12 },
  payStep: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  payNum: { width: 22, height: 22, borderRadius: 7, alignItems: "center", justifyContent: "center", marginTop: 1 },
  payNumText: { fontSize: 11, color: "#fff" },
  payStepText: { flex: 1, fontSize: 13, lineHeight: 20 },
  contactRow: { flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap" },
  contactInfo: { fontSize: 12 },
  inputLabel: { fontSize: 14 },
  codeInput: {
    borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 17, textAlign: "center", letterSpacing: 2,
  },
  codeError: { fontSize: 13, textAlign: "center", marginTop: -6 },
  submitBtn: { borderRadius: 14, paddingVertical: 18, alignItems: "center", marginTop: 4 },
  submitBtnText: { fontSize: 17, color: "#fff", fontWeight: "700" },
});
