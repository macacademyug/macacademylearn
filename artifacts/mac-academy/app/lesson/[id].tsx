import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { COURSES, FLUTTERWAVE_PRO_LINK } from "@/data/courses";
import * as Haptics from "expo-haptics";

export default function LessonScreen() {
  const { id, courseId } = useLocalSearchParams<{ id: string; courseId: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { markComplete, isComplete } = useProgress();
  const [justMarked, setJustMarked] = useState(false);

  const course = COURSES.find((c) => c.id === courseId);
  const lesson = course?.lessons.find((l) => l.id === id);
  const completed = lesson ? isComplete(lesson.id) : false;
  const nextLesson = course?.lessons.find((l) => l.order === (lesson?.order ?? 0) + 1);
  const topPadding = Platform.OS === "web" ? 67 : insets.top;

  const handleMarkComplete = async () => {
    if (!lesson || completed) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await markComplete(lesson.id);
    setJustMarked(true);
  };

  const handleOpenVideo = async () => {
    if (!lesson) return;
    try {
      const ok = await Linking.canOpenURL(lesson.videoUrl);
      if (ok) await Linking.openURL(lesson.videoUrl);
      else Alert.alert("Video Placeholder", "Paste your YouTube or Vimeo link in data/courses.ts for this lesson.");
    } catch {
      Alert.alert("Video Placeholder", "Paste your YouTube or Vimeo link in data/courses.ts for this lesson.");
    }
  };

  const handleUnlockPro = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      const ok = await Linking.canOpenURL(FLUTTERWAVE_PRO_LINK);
      if (ok) await Linking.openURL(FLUTTERWAVE_PRO_LINK);
      else Alert.alert("Payment", "Visit our website to unlock Pro lessons.");
    } catch {
      Alert.alert("Error", "Could not open payment page.");
    }
  };

  if (!course || !lesson) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, fontFamily: "Inter_400Regular" }}>Lesson not found.</Text>
      </View>
    );
  }

  if (lesson.isPro) {
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
            "{lesson.title}" is a Pro lesson. Unlock all Pro lessons with a one-time payment via Flutterwave.
          </Text>
          <TouchableOpacity
            style={[styles.proLockBtn, { backgroundColor: colors.primary }]}
            onPress={handleUnlockPro}
            activeOpacity={0.85}
          >
            <Feather name="unlock" size={20} color="#fff" />
            <Text style={[styles.proLockBtnText, { fontFamily: "Inter_700Bold" }]}>
              Unlock Pro Lessons
            </Text>
          </TouchableOpacity>
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
        {(completed || justMarked) && (
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
        <Text style={[styles.videoHint, { fontFamily: "Inter_600SemiBold" }]}>
          Tap to open video
        </Text>
        <Text style={[styles.videoSub, { fontFamily: "Inter_400Regular" }]}>
          Replace the URL in data/courses.ts with your YouTube / Vimeo link
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

      {!(completed || justMarked) ? (
        <TouchableOpacity
          style={[styles.completeBtn, { backgroundColor: course.color }]}
          onPress={handleMarkComplete}
          activeOpacity={0.85}
        >
          <Feather name="check-circle" size={22} color="#fff" />
          <Text style={[styles.completeBtnText, { fontFamily: "Inter_700Bold" }]}>
            Mark as Complete
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={[styles.completedBanner, { backgroundColor: colors.completed + "18", borderColor: colors.completed + "40" }]}>
          <Feather name="check-circle" size={22} color={colors.completed} />
          <Text style={[styles.completedText, { color: colors.completed, fontFamily: "Inter_700Bold" }]}>
            Lesson Completed!
          </Text>
        </View>
      )}

      {nextLesson && !nextLesson.isPro && (
        <TouchableOpacity
          style={[styles.nextBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() =>
            router.replace(`/lesson/${nextLesson.id}?courseId=${course.id}` as any)
          }
          activeOpacity={0.8}
        >
          <View style={styles.nextContent}>
            <Text style={[styles.nextLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Up next
            </Text>
            <Text
              style={[styles.nextTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
              numberOfLines={1}
            >
              {nextLesson.title}
            </Text>
          </View>
          <Feather name="arrow-right" size={20} color={course.color} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  proLockScreen: { flex: 1 },
  proLockContent: {
    flex: 1, alignItems: "center", justifyContent: "center",
    paddingHorizontal: 32, gap: 16,
  },
  proLockIcon: {
    width: 80, height: 80, borderRadius: 24,
    alignItems: "center", justifyContent: "center",
  },
  proLockTitle: { fontSize: 24, fontWeight: "700" },
  proLockDesc: { fontSize: 15, textAlign: "center", lineHeight: 22 },
  proLockBtn: {
    flexDirection: "row", alignItems: "center", gap: 10,
    borderRadius: 16, paddingVertical: 18, paddingHorizontal: 32,
    marginTop: 8,
  },
  proLockBtnText: { fontSize: 17, fontWeight: "700", color: "#fff" },
  backLink: { fontSize: 14 },
  backBtn: {
    width: 44, height: 44, borderRadius: 12, borderWidth: 1,
    alignItems: "center", justifyContent: "center", marginBottom: 16,
  },
  courseTag: {
    flexDirection: "row", alignItems: "center", gap: 5,
    alignSelf: "flex-start", borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 4, marginBottom: 10,
  },
  courseTagText: { fontSize: 12, fontWeight: "600" },
  lessonTitle: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 13 },
  doneBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
  },
  doneText: { fontSize: 12, fontWeight: "600" },
  videoPlayer: {
    borderRadius: 20, borderWidth: 2,
    backgroundColor: "#111111",
    aspectRatio: 16 / 9,
    alignItems: "center", justifyContent: "center",
    gap: 10, marginBottom: 18,
  },
  playCircle: {
    width: 76, height: 76, borderRadius: 38,
    alignItems: "center", justifyContent: "center",
  },
  videoHint: { color: "#fff", fontSize: 15, fontWeight: "600" },
  videoSub: { color: "rgba(255,255,255,0.45)", fontSize: 11, textAlign: "center", paddingHorizontal: 20 },
  descCard: {
    borderRadius: 14, borderWidth: 1, padding: 18, gap: 10, marginBottom: 18,
  },
  descLabel: { fontSize: 16, fontWeight: "700" },
  descText: { fontSize: 14, lineHeight: 22 },
  completeBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 12, borderRadius: 16, paddingVertical: 20, marginBottom: 14,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 10, elevation: 4,
  },
  completeBtnText: { fontSize: 18, fontWeight: "700", color: "#fff" },
  completedBanner: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 12, borderRadius: 16, borderWidth: 1,
    paddingVertical: 20, marginBottom: 14,
  },
  completedText: { fontSize: 17, fontWeight: "700" },
  nextBtn: {
    flexDirection: "row", alignItems: "center",
    borderRadius: 14, borderWidth: 1, padding: 16, gap: 12,
  },
  nextContent: { flex: 1, gap: 2 },
  nextLabel: { fontSize: 11 },
  nextTitle: { fontSize: 15, fontWeight: "600" },
});
