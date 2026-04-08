import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { usePro } from "@/context/ProContext";
import LessonItem from "@/components/LessonItem";
import { COURSES } from "@/data/courses";
import * as Haptics from "expo-haptics";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { getCourseProgress } = useProgress();
  const { isPro, unlockPro } = usePro();

  const [modalVisible, setModalVisible] = useState(false);
  const [proCode, setProCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const course = COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, fontFamily: "Inter_400Regular" }}>Course not found.</Text>
      </View>
    );
  }

  const progress = getCourseProgress(course.id, course.totalLessons);
  const proLessonsCount = course.lessons.filter((l) => l.isPro).length;
  const freeLessonsCount = course.lessons.filter((l) => !l.isPro).length;
  const topPadding = Platform.OS === "web" ? 67 : insets.top;

  const handleOpenProModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setProCode("");
    setCodeError("");
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
      setCodeError("Invalid code. Please double-check and try again.");
    }
  };

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: topPadding + 8,
            paddingBottom: (Platform.OS === "web" ? 34 : insets.bottom) + 30,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          activeOpacity={0.75}
        >
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </TouchableOpacity>

        <View style={[styles.header, { backgroundColor: course.color + "15", borderColor: course.color + "30" }]}>
          <View style={[styles.headerIcon, { backgroundColor: course.color }]}>
            <Feather name={course.icon as any} size={28} color="#fff" />
          </View>
          <View style={[styles.levelBadge, { backgroundColor: course.color + "25" }]}>
            <Text style={[styles.levelText, { color: course.color, fontFamily: "Inter_600SemiBold" }]}>
              {course.level}
            </Text>
          </View>
          <Text style={[styles.courseTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            {course.title}
          </Text>
          <Text style={[styles.courseDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {course.description}
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Feather name="play-circle" size={13} color={colors.mutedForeground} />
              <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {course.totalLessons} lessons
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="clock" size={13} color={colors.mutedForeground} />
              <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {course.estimatedHours}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="unlock" size={13} color={colors.completed} />
              <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {freeLessonsCount} free
              </Text>
            </View>
          </View>
        </View>

        {progress > 0 && (
          <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.progressRow}>
              <Text style={[styles.progressLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                Your Progress
              </Text>
              <Text style={[styles.progressPct, { color: course.color, fontFamily: "Inter_700Bold" }]}>
                {progress}%
              </Text>
            </View>
            <View style={[styles.progressTrack, { backgroundColor: colors.progressTrack }]}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` as any, backgroundColor: course.color },
                ]}
              />
            </View>
            <Text style={[styles.progressSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {Math.round((progress / 100) * course.totalLessons)} of {course.totalLessons} lessons completed
            </Text>
          </View>
        )}

        {proLessonsCount > 0 && !isPro && (
          <TouchableOpacity
            style={[styles.proBtn, { backgroundColor: colors.primary }]}
            onPress={handleOpenProModal}
            activeOpacity={0.85}
          >
            <View style={styles.proBtnInner}>
              <Feather name="unlock" size={18} color="#fff" />
              <Text style={[styles.proBtnText, { fontFamily: "Inter_700Bold" }]} numberOfLines={1}>
                Unlock {proLessonsCount} Pro Lesson{proLessonsCount > 1 ? "s" : ""}
              </Text>
            </View>
            <View style={styles.proBadge}>
              <Text style={[styles.proBadgeText, { fontFamily: "Inter_700Bold" }]}>PRO</Text>
            </View>
          </TouchableOpacity>
        )}

        {isPro && (
          <View style={[styles.proUnlockedBanner, { backgroundColor: "#22c55e18", borderColor: "#22c55e40" }]}>
            <Feather name="check-circle" size={18} color="#22c55e" />
            <Text style={[styles.proUnlockedText, { color: "#22c55e", fontFamily: "Inter_600SemiBold" }]}>
              Pro Unlocked — all lessons available
            </Text>
          </View>
        )}

        <Text style={[styles.lessonsTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Lessons
        </Text>

        {course.lessons.map((lesson) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            accentColor={course.color}
            isProLocked={lesson.isPro && !isPro}
            onPress={() => router.push(`/lesson/${lesson.id}?courseId=${course.id}` as any)}
          />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setModalVisible(false)} />
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />
            <View style={styles.sheetTitleRow}>
              <Text style={[styles.sheetTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                Unlock Pro Lessons
              </Text>
              <View style={[styles.pricePill, { backgroundColor: colors.primary + "20", borderColor: colors.primary + "40" }]}>
                <Text style={[styles.priceText, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
                  25,000 UGX
                </Text>
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

            <TouchableOpacity
              style={[styles.closeBtn, { backgroundColor: colors.muted, borderColor: colors.border }]}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.closeBtnText, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>Close</Text>
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
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  backBtn: {
    width: 40, height: 40, borderRadius: 12, borderWidth: 1,
    alignItems: "center", justifyContent: "center", marginBottom: 16,
  },
  header: {
    borderRadius: 20, borderWidth: 1, padding: 20, gap: 10, marginBottom: 16,
  },
  headerIcon: {
    width: 56, height: 56, borderRadius: 16,
    alignItems: "center", justifyContent: "center",
  },
  levelBadge: {
    alignSelf: "flex-start", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3,
  },
  levelText: { fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
  courseTitle: { fontSize: 22, fontWeight: "700" },
  courseDesc: { fontSize: 14, lineHeight: 21 },
  metaRow: { flexDirection: "row", gap: 14, flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 12 },
  progressCard: {
    borderRadius: 14, borderWidth: 1, padding: 16, gap: 8, marginBottom: 14,
  },
  progressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressLabel: { fontSize: 14, fontWeight: "600" },
  progressPct: { fontSize: 18, fontWeight: "700" },
  progressTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  progressSub: { fontSize: 12 },
  proBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderRadius: 16, paddingVertical: 16, paddingHorizontal: 18, marginBottom: 16,
    shadowColor: "#FF6B1A", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
  },
  proBtnInner: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1, marginRight: 8 },
  proBtnText: { fontSize: 16, fontWeight: "700", color: "#fff", flexShrink: 1 },
  proBadge: { backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 8, paddingHorizontal: 9, paddingVertical: 4 },
  proBadgeText: { fontSize: 12, color: "#fff", fontWeight: "700" },
  proUnlockedBanner: {
    flexDirection: "row", alignItems: "center", gap: 10,
    borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 16,
  },
  proUnlockedText: { fontSize: 14, flex: 1 },
  lessonsTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingTop: 16, gap: 14 },
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
  contactRow: { flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap" },
  contactInfo: { fontSize: 12 },
  inputLabel: { fontSize: 14 },
  codeInput: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 14, fontSize: 17, textAlign: "center", letterSpacing: 2 },
  codeError: { fontSize: 13, textAlign: "center", marginTop: -6 },
  submitBtn: { borderRadius: 14, paddingVertical: 18, alignItems: "center" },
  submitBtnText: { fontSize: 17, color: "#fff", fontWeight: "700" },
  closeBtn: { borderRadius: 14, paddingVertical: 16, alignItems: "center", borderWidth: 1 },
  closeBtnText: { fontSize: 15 },
});
