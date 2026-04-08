import React, { useState, useEffect } from "react";
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
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { usePro } from "@/context/ProContext";
import CourseCard from "@/components/CourseCard";
import ComingSoonCard from "@/components/ComingSoonCard";
import { COURSES } from "@/data/courses";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_W } = Dimensions.get("window");
const ONBOARD_KEY = "@mac_onboarded";

const COMING_SOON = [
  { title: "ToonBoom Harmony", subtitle: "Professional studio-grade animation with ToonBoom Harmony — rigging, cut-out animation, and more.", color: "#6C5CE7", icon: "film" },
  { title: "Blender Animation", subtitle: "3D animation fundamentals using Blender — modelling, rigging, and rendering your first 3D scenes.", color: "#E67E22", icon: "box" },
  { title: "Photoshop for Animators", subtitle: "Frame-by-frame animation and digital painting in Adobe Photoshop — from sketch to finished frames.", color: "#31A8FF", icon: "image" },
  { title: "Adobe Illustrator", subtitle: "Design vector characters and assets in Illustrator to use across your animation projects.", color: "#FF9A00", icon: "pen-tool" },
  { title: "After Effects", subtitle: "Bring your animations to life with motion graphics, visual effects, and compositing in After Effects.", color: "#9999FF", icon: "layers" },
];

const ONBOARD_SLIDES = [
  { icon: "play-circle", color: "#FF6B1A", title: "Welcome to Mac Academy", body: "Learn FlipaClip animation from scratch — beginner basics to advanced lip sync techniques, all in one place." },
  { icon: "check-circle", color: "#22c55e", title: "Track Your Progress", body: "Tap 'Mark as Complete' after each lesson. Your progress is saved and you can undo it anytime." },
  { icon: "unlock", color: "#6C5CE7", title: "Unlock Pro Lessons", body: "Pro lessons cost 25,000 UGX. Pay via Mobile Money → send screenshot → get your unlock code. Simple!" },
];

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
          <Text style={[styles.progressTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Your Progress</Text>
          <Text style={[styles.progressSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {done} of {total} lessons completed
          </Text>
        </View>
        <Text style={[styles.progressPct, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>{pct}%</Text>
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
  const { studyStreak } = useProgress();
  const { isPro, unlockPro } = usePro();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = (Platform.OS === "web" ? 34 : insets.bottom) + 90;

  const [modalVisible, setModalVisible] = useState(false);
  const [proCode, setProCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [search, setSearch] = useState("");
  const [onboardVisible, setOnboardVisible] = useState(false);
  const [onboardSlide, setOnboardSlide] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARD_KEY).then((v) => {
      if (!v) setOnboardVisible(true);
    }).catch(() => {});
  }, []);

  const finishOnboard = async () => {
    await AsyncStorage.setItem(ONBOARD_KEY, "true").catch(() => {});
    setOnboardVisible(false);
    setOnboardSlide(0);
  };

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

  const filteredCourses = search.trim()
    ? COURSES.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.lessons.some((l) => l.title.toLowerCase().includes(search.toLowerCase()))
      )
    : COURSES;

  const filteredComingSoon = search.trim()
    ? COMING_SOON.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    : COMING_SOON;

  const slide = ONBOARD_SLIDES[onboardSlide];

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.content, { paddingTop: topPadding + 16, paddingBottom: bottomPadding }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.appName, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>Mac Academy</Text>
            <Text style={[styles.tagline, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              FlipaClip Animation Courses
            </Text>
          </View>
          <View style={styles.headerRight}>
            {studyStreak > 0 && (
              <View style={[styles.streakPill, { backgroundColor: "#FF6B1A20", borderColor: "#FF6B1A40" }]}>
                <Text style={styles.streakFire}>🔥</Text>
                <Text style={[styles.streakText, { color: "#FF6B1A", fontFamily: "Inter_700Bold" }]}>
                  {studyStreak}
                </Text>
              </View>
            )}
            <View style={[styles.logoMark, { backgroundColor: colors.primary }]}>
              <Feather name="play" size={20} color="#fff" />
            </View>
          </View>
        </View>

        <View style={[styles.searchWrap, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}
            value={search}
            onChangeText={setSearch}
            placeholder="Search courses or lessons…"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Feather name="x" size={15} color={colors.mutedForeground} />
            </TouchableOpacity>
          )}
        </View>

        {!search && <OverallProgressBar />}

        {!isPro ? (
          <TouchableOpacity
            style={[styles.proBtn, { backgroundColor: colors.primary }]}
            onPress={handleUnlockPress}
            activeOpacity={0.85}
          >
            <View style={styles.proBtnInner}>
              <Feather name="unlock" size={18} color="#fff" />
              <Text style={[styles.proBtnText, { fontFamily: "Inter_700Bold" }]} numberOfLines={1} adjustsFontSizeToFit>
                Unlock Pro Lessons
              </Text>
            </View>
            <View style={styles.proBadge}>
              <Text style={[styles.proBadgeText, { fontFamily: "Inter_700Bold" }]}>25,000 UGX</Text>
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
          {search ? "Results" : "FlipaClip Courses"}
        </Text>

        {filteredCourses.length === 0 && search ? (
          <Text style={[styles.noResults, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            No courses match "{search}"
          </Text>
        ) : (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onPress={() => router.push(`/course/${course.id}` as any)} />
          ))
        )}

        {!search || filteredComingSoon.length > 0 ? (
          <>
            <View style={[styles.comingSoonHeader, { borderTopColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                Coming Soon
              </Text>
              <View style={[styles.comingSoonPill, { backgroundColor: colors.muted }]}>
                <Feather name="clock" size={11} color={colors.mutedForeground} />
                <Text style={[styles.comingSoonPillText, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
                  In development
                </Text>
              </View>
            </View>
            {filteredComingSoon.map((course) => (
              <ComingSoonCard key={course.title} course={course} />
            ))}
          </>
        ) : null}
      </ScrollView>

      {/* Pro Unlock Modal */}
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

            <Text style={[styles.inputLabel, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>Enter Pro Code</Text>
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

      {/* Onboarding Modal */}
      <Modal visible={onboardVisible} transparent animationType="fade" onRequestClose={finishOnboard}>
        <View style={styles.onboardOverlay}>
          <View style={[styles.onboardCard, { backgroundColor: colors.card }]}>
            <View style={[styles.onboardIconWrap, { backgroundColor: slide.color + "20" }]}>
              <Feather name={slide.icon as any} size={40} color={slide.color} />
            </View>
            <Text style={[styles.onboardTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {slide.title}
            </Text>
            <Text style={[styles.onboardBody, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {slide.body}
            </Text>

            <View style={styles.onboardDots}>
              {ONBOARD_SLIDES.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    { backgroundColor: i === onboardSlide ? colors.primary : colors.border },
                  ]}
                />
              ))}
            </View>

            <View style={styles.onboardBtns}>
              {onboardSlide < ONBOARD_SLIDES.length - 1 ? (
                <>
                  <TouchableOpacity onPress={finishOnboard}>
                    <Text style={[styles.skipText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.nextOnboardBtn, { backgroundColor: colors.primary }]}
                    onPress={() => setOnboardSlide(onboardSlide + 1)}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.nextOnboardText, { fontFamily: "Inter_700Bold" }]}>Next</Text>
                    <Feather name="arrow-right" size={16} color="#fff" />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.nextOnboardBtn, { backgroundColor: colors.primary, flex: 1 }]}
                  onPress={finishOnboard}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.nextOnboardText, { fontFamily: "Inter_700Bold" }]}>Get Started</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  appName: { fontSize: 26, fontWeight: "700" },
  tagline: { fontSize: 13, marginTop: 2 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  streakPill: {
    flexDirection: "row", alignItems: "center", gap: 3,
    borderRadius: 20, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5,
  },
  streakFire: { fontSize: 14 },
  streakText: { fontSize: 15, fontWeight: "700" },
  logoMark: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", paddingLeft: 2 },
  searchWrap: {
    flexDirection: "row", alignItems: "center", gap: 10,
    borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 15 },
  progressCard: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 10, marginBottom: 14 },
  progressTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  progressTitle: { fontSize: 15, fontWeight: "700" },
  progressSub: { fontSize: 12, marginTop: 2 },
  progressPct: { fontSize: 28, fontWeight: "700" },
  barTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 3 },
  proBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderRadius: 16, paddingVertical: 16, paddingHorizontal: 18, marginBottom: 24,
    shadowColor: "#FF6B1A", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 12, elevation: 6,
  },
  proBtnInner: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1, marginRight: 8 },
  proBtnText: { fontSize: 16, fontWeight: "700", color: "#fff", flexShrink: 1 },
  proBadge: { backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 8, paddingHorizontal: 9, paddingVertical: 4 },
  proBadgeText: { fontSize: 12, color: "#fff", fontWeight: "700" },
  proActiveRow: { flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 20 },
  proActiveText: { fontSize: 14 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  noResults: { fontSize: 14, textAlign: "center", marginTop: 8, marginBottom: 16 },
  comingSoonHeader: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderTopWidth: 1, paddingTop: 20, marginTop: 8, marginBottom: 12,
  },
  comingSoonPill: { flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  comingSoonPillText: { fontSize: 11 },
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
  submitBtn: { borderRadius: 14, paddingVertical: 18, alignItems: "center", marginTop: 4 },
  submitBtnText: { fontSize: 17, color: "#fff", fontWeight: "700" },
  onboardOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", alignItems: "center", justifyContent: "center", padding: 28 },
  onboardCard: { borderRadius: 24, padding: 28, alignItems: "center", width: "100%" },
  onboardIconWrap: { width: 90, height: 90, borderRadius: 28, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  onboardTitle: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 10 },
  onboardBody: { fontSize: 14, textAlign: "center", lineHeight: 22, marginBottom: 16 },
  onboardDots: { flexDirection: "row", marginBottom: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  onboardBtns: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 4 },
  skipText: { fontSize: 15 },
  nextOnboardBtn: { flexDirection: "row", alignItems: "center", gap: 6, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 24 },
  nextOnboardText: { fontSize: 16, color: "#fff", fontWeight: "700" },
});
