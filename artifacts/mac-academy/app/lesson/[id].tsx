import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { usePro } from "@/context/ProContext";
import { COURSES } from "@/data/courses";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

function noteKey(lessonId: string) {
  return `@mac_note_${lessonId}`;
}

export default function LessonScreen() {
  const { id, courseId } = useLocalSearchParams<{ id: string; courseId: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { toggleComplete, isComplete, isCourseComplete } = useProgress();
  const { isPro } = usePro();

  const course = COURSES.find((c) => c.id === courseId);
  const lesson = course?.lessons.find((l) => l.id === id);
  const completed = lesson ? isComplete(lesson.id) : false;
  const nextLesson = course?.lessons.find((l) => l.order === (lesson?.order ?? 0) + 1);
  const topPadding = Platform.OS === "web" ? 67 : insets.top;

  const [note, setNote] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!lesson) return;
    AsyncStorage.getItem(noteKey(lesson.id)).then((v) => { if (v) setNote(v); }).catch(() => {});
  }, [lesson?.id]);

  const handleNoteChange = (text: string) => {
    setNote(text);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      if (lesson) AsyncStorage.setItem(noteKey(lesson.id), text).catch(() => {});
    }, 600);
  };

  const handleToggleComplete = async () => {
    if (!lesson || !course) return;
    const wasComplete = isComplete(lesson.id);
    Haptics.notificationAsync(
      wasComplete ? Haptics.NotificationFeedbackType.Warning : Haptics.NotificationFeedbackType.Success
    );
    await toggleComplete(lesson.id);
    if (!wasComplete) {
      const allIds = course.lessons.map((l) => l.id);
      const nowAllDone = allIds.every((lid) => lid === lesson.id ? true : isComplete(lid));
      if (nowAllDone) {
        setTimeout(() => setShowCelebration(true), 300);
      }
    }
  };

  const handleOpenVideo = async () => {
    if (!lesson) return;
    try {
      const ok = await Linking.canOpenURL(lesson.videoUrl);
      if (ok) await Linking.openURL(lesson.videoUrl);
      else Alert.alert("Video", "Could not open the video link.");
    } catch {
      Alert.alert("Video", "Could not open the video link.");
    }
  };

  if (!course || !lesson) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, fontFamily: "Inter_400Regular" }}>Lesson not found.</Text>
      </View>
    );
  }

  if (lesson.isPro && !isPro) {
    return (
      <View style={[styles.proLockScreen, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border, marginTop: topPadding + 8, marginLeft: 20 }]}
          activeOpacity={0.75}
        >
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </TouchableOpacity>
        <View style={styles.proLockContent}>
          <View style={[styles.proLockIcon, { backgroundColor: colors.primary + "20" }]}>
            <Feather name="lock" size={36} color={colors.primary} />
          </View>
          <Text style={[styles.proLockTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Pro Lesson
          </Text>
          <Text style={[styles.proLockDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            "{lesson.title}" is a Pro lesson. Unlock all Pro lessons for 25,000 UGX — send Mobile Money to 0745414641, screenshot it to us, and we'll give you a code.
          </Text>
          <View style={[styles.proContactRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="message-circle" size={14} color="#25D366" />
            <Text style={[styles.proContactText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              WhatsApp: 0745414641
            </Text>
          </View>
          <View style={[styles.proContactRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="mail" size={14} color={colors.primary} />
            <Text style={[styles.proContactText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              alexkasaba2006@gmail.com
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 8 }}>
            <Text style={[styles.backLink, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              ← Back to course
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.content,
          { paddingTop: topPadding + 8, paddingBottom: (Platform.OS === "web" ? 34 : insets.bottom) + 30 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          activeOpacity={0.75}
        >
          <Feather name="arrow-left" size={20} color={colors.foreground} />
        </TouchableOpacity>

        <View style={[styles.courseTag, { backgroundColor: course.color + "20" }]}>
          <Feather name={course.icon as any} size={12} color={course.color} />
          <Text style={[styles.courseTagText, { color: course.color, fontFamily: "Inter_600SemiBold" }]}>
            {course.title}
          </Text>
        </View>

        <Text style={[styles.lessonTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          {lesson.title}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Feather name="clock" size={13} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {lesson.duration}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="hash" size={13} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Lesson {lesson.order} of {course.totalLessons}
            </Text>
          </View>
          {completed && (
            <View style={[styles.doneBadge, { backgroundColor: colors.completed + "20" }]}>
              <Feather name="check" size={12} color={colors.completed} />
              <Text style={[styles.doneText, { color: colors.completed, fontFamily: "Inter_600SemiBold" }]}>
                Complete
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.videoPlayer, { borderColor: course.color + "60" }]}
          onPress={handleOpenVideo}
          activeOpacity={0.88}
        >
          <View style={[styles.playCircle, { backgroundColor: course.color }]}>
            <Feather name="play" size={30} color="#fff" style={{ marginLeft: 3 }} />
          </View>
          <Text style={[styles.videoHint, { fontFamily: "Inter_600SemiBold" }]}>Tap to watch video</Text>
          <Text style={[styles.videoSub, { fontFamily: "Inter_400Regular" }]}>
            Opens in YouTube · replace URL in data/courses.ts
          </Text>
        </TouchableOpacity>

        <View style={[styles.descCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.descLabel, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Lesson Description
          </Text>
          <Text style={[styles.descText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {lesson.description}
          </Text>
        </View>

        <View style={[styles.notesCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.notesHeader}>
            <Feather name="edit-3" size={15} color={course.color} />
            <Text style={[styles.notesLabel, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              My Notes
            </Text>
          </View>
          <TextInput
            style={[styles.notesInput, { color: colors.foreground, fontFamily: "Inter_400Regular", borderColor: colors.border }]}
            value={note}
            onChangeText={handleNoteChange}
            placeholder="Jot down anything useful from this lesson…"
            placeholderTextColor={colors.mutedForeground}
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.completeBtn, { backgroundColor: completed ? colors.completed : course.color }]}
          onPress={handleToggleComplete}
          activeOpacity={0.85}
        >
          <Feather name={completed ? "check-circle" : "circle"} size={22} color="#fff" />
          <Text style={[styles.completeBtnText, { fontFamily: "Inter_700Bold" }]}>
            {completed ? "Completed — Tap to Undo" : "Mark as Complete"}
          </Text>
        </TouchableOpacity>

        {nextLesson && !nextLesson.isPro && (
          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.replace(`/lesson/${nextLesson.id}?courseId=${course.id}` as any)}
            activeOpacity={0.8}
          >
            <View style={styles.nextContent}>
              <Text style={[styles.nextLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                Up next
              </Text>
              <Text style={[styles.nextTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]} numberOfLines={1}>
                {nextLesson.title}
              </Text>
            </View>
            <Feather name="arrow-right" size={20} color={course.color} />
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal visible={showCelebration} transparent animationType="fade" onRequestClose={() => setShowCelebration(false)}>
        <View style={styles.celebOverlay}>
          <View style={[styles.celebSheet, { backgroundColor: colors.card }]}>
            <Text style={styles.celebEmoji}>🎉</Text>
            <Text style={[styles.celebTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              Course Complete!
            </Text>
            <Text style={[styles.celebDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              You've finished all lessons in{"\n"}
              <Text style={{ color: course.color, fontFamily: "Inter_700Bold" }}>{course.title}</Text>.{"\n"}
              Amazing work — keep it up!
            </Text>
            <View style={[styles.celebBadge, { backgroundColor: course.color + "20", borderColor: course.color + "40" }]}>
              <Feather name="award" size={22} color={course.color} />
              <Text style={[styles.celebBadgeText, { color: course.color, fontFamily: "Inter_700Bold" }]}>
                Course Badge Earned
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.celebBtn, { backgroundColor: course.color }]}
              onPress={() => { setShowCelebration(false); router.back(); }}
              activeOpacity={0.85}
            >
              <Text style={[styles.celebBtnText, { fontFamily: "Inter_700Bold" }]}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  proLockScreen: { flex: 1 },
  proLockContent: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 14 },
  proLockIcon: { width: 80, height: 80, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  proLockTitle: { fontSize: 24, fontWeight: "700" },
  proLockDesc: { fontSize: 14, textAlign: "center", lineHeight: 22 },
  proContactRow: {
    flexDirection: "row", alignItems: "center", gap: 8,
    borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10, width: "100%",
  },
  proContactText: { fontSize: 13 },
  backLink: { fontSize: 14 },
  backBtn: {
    width: 44, height: 44, borderRadius: 12, borderWidth: 1,
    alignItems: "center", justifyContent: "center", marginBottom: 16,
  },
  courseTag: {
    flexDirection: "row", alignItems: "center", gap: 5,
    alignSelf: "flex-start", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 10,
  },
  courseTagText: { fontSize: 12, fontWeight: "600" },
  lessonTitle: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 13 },
  doneBadge: { flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  doneText: { fontSize: 12, fontWeight: "600" },
  videoPlayer: {
    borderRadius: 20, borderWidth: 2, backgroundColor: "#111111",
    aspectRatio: 16 / 9, alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18,
  },
  playCircle: { width: 76, height: 76, borderRadius: 38, alignItems: "center", justifyContent: "center" },
  videoHint: { color: "#fff", fontSize: 15, fontWeight: "600" },
  videoSub: { color: "rgba(255,255,255,.45)", fontSize: 11, textAlign: "center", paddingHorizontal: 20 },
  descCard: { borderRadius: 14, borderWidth: 1, padding: 18, gap: 10, marginBottom: 18 },
  descLabel: { fontSize: 16, fontWeight: "700" },
  descText: { fontSize: 14, lineHeight: 22 },
  notesCard: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 10, marginBottom: 18 },
  notesHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  notesLabel: { fontSize: 15, fontWeight: "700" },
  notesInput: {
    minHeight: 90, borderRadius: 10, borderWidth: 1,
    padding: 12, fontSize: 14, lineHeight: 21,
  },
  completeBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 12, borderRadius: 16, paddingVertical: 20, marginBottom: 14,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 10, elevation: 4,
  },
  completeBtnText: { fontSize: 17, fontWeight: "700", color: "#fff" },
  nextBtn: { flexDirection: "row", alignItems: "center", borderRadius: 14, borderWidth: 1, padding: 16, gap: 12 },
  nextContent: { flex: 1, gap: 2 },
  nextLabel: { fontSize: 11 },
  nextTitle: { fontSize: 15, fontWeight: "600" },
  celebOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", alignItems: "center", justifyContent: "center", padding: 32 },
  celebSheet: { borderRadius: 24, padding: 32, alignItems: "center", gap: 14, width: "100%" },
  celebEmoji: { fontSize: 52 },
  celebTitle: { fontSize: 26, fontWeight: "700" },
  celebDesc: { fontSize: 15, textAlign: "center", lineHeight: 24 },
  celebBadge: {
    flexDirection: "row", alignItems: "center", gap: 10,
    borderRadius: 14, borderWidth: 1, paddingHorizontal: 18, paddingVertical: 12,
  },
  celebBadgeText: { fontSize: 15 },
  celebBtn: { borderRadius: 14, paddingVertical: 16, paddingHorizontal: 40, marginTop: 4 },
  celebBtnText: { fontSize: 17, color: "#fff", fontWeight: "700" },
});
