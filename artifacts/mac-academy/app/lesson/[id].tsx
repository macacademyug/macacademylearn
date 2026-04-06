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
import { COURSES } from "@/data/courses";
import * as Haptics from "expo-haptics";

export default function LessonScreen() {
  const { id, courseId } = useLocalSearchParams<{ id: string; courseId: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { markComplete, isComplete } = useProgress();
  const [marking, setMarking] = useState(false);

  const course = COURSES.find((c) => c.id === courseId);
  const lesson = course?.lessons.find((l) => l.id === id);
  const completed = lesson ? isComplete(lesson.id) : false;

  const nextLesson = course?.lessons.find((l) => l.order === (lesson?.order ?? 0) + 1);

  const handleMarkComplete = async () => {
    if (!lesson || completed) return;
    setMarking(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await markComplete(lesson.id);
    setTimeout(() => setMarking(false), 400);
  };

  const handleOpenVideo = async () => {
    if (!lesson) return;
    const url = lesson.videoUrl;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Placeholder", "Paste your YouTube or Vimeo link in courses.ts to make this work.");
      }
    } catch {
      Alert.alert("Placeholder", "Paste your YouTube or Vimeo link in courses.ts to make this work.");
    }
  };

  const topPadding = Platform.OS === "web" ? 67 : insets.top;

  if (!course || !lesson) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, fontFamily: "Inter_400Regular" }}>Lesson not found.</Text>
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
        {completed && (
          <View style={[styles.doneBadge, { backgroundColor: colors.completed + "20" }]}>
            <Feather name="check" size={12} color={colors.completed} />
            <Text style={[styles.doneText, { color: colors.completed, fontFamily: "Inter_600SemiBold" }]}>
              Completed
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.videoPlayer, { backgroundColor: "#0a0a0a", borderColor: course.color + "50" }]}
        onPress={handleOpenVideo}
        activeOpacity={0.85}
      >
        <View style={[styles.playCircle, { backgroundColor: course.color }]}>
          <Feather name="play" size={28} color="#fff" />
        </View>
        <Text style={[styles.videoHint, { fontFamily: "Inter_500Medium" }]}>
          Tap to open video
        </Text>
        <Text style={[styles.videoSub, { fontFamily: "Inter_400Regular" }]}>
          Paste your YouTube / Vimeo URL in courses.ts
        </Text>
      </TouchableOpacity>

      <View style={[styles.descCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.descTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          About this lesson
        </Text>
        <Text style={[styles.descText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          {lesson.description}
        </Text>
      </View>

      {!completed ? (
        <TouchableOpacity
          style={[
            styles.completeBtn,
            { backgroundColor: marking ? colors.completed : course.color },
          ]}
          onPress={handleMarkComplete}
          activeOpacity={0.85}
          disabled={marking}
        >
          <Feather name={marking ? "check" : "check-circle"} size={20} color="#fff" />
          <Text style={[styles.completeBtnText, { fontFamily: "Inter_700Bold" }]}>
            {marking ? "Marked Complete!" : "Mark as Complete"}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={[styles.completedBanner, { backgroundColor: colors.completed + "15", borderColor: colors.completed + "35" }]}>
          <Feather name="check-circle" size={20} color={colors.completed} />
          <Text style={[styles.completedText, { color: colors.completed, fontFamily: "Inter_700Bold" }]}>
            Lesson Completed
          </Text>
        </View>
      )}

      {nextLesson && (
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  courseTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  courseTagText: { fontSize: 12, fontWeight: "600" },
  lessonTitle: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 13 },
  doneBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  doneText: { fontSize: 12, fontWeight: "600" },
  videoPlayer: {
    borderRadius: 20,
    borderWidth: 2,
    aspectRatio: 16 / 9,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 18,
  },
  playCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 4,
  },
  videoHint: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  videoSub: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
  },
  descCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 8,
    marginBottom: 18,
  },
  descTitle: { fontSize: 16, fontWeight: "700" },
  descText: { fontSize: 14, lineHeight: 21 },
  completeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 14,
  },
  completeBtnText: { fontSize: 17, fontWeight: "700", color: "#fff" },
  completedBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 18,
    marginBottom: 14,
  },
  completedText: { fontSize: 16, fontWeight: "700" },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  nextContent: { flex: 1, gap: 2 },
  nextLabel: { fontSize: 11 },
  nextTitle: { fontSize: 15, fontWeight: "600" },
});
