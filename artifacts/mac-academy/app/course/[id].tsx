import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import LessonItem from "@/components/LessonItem";
import { COURSES, FLUTTERWAVE_PRO_LINK } from "@/data/courses";
import * as Haptics from "expo-haptics";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { getCourseProgress } = useProgress();

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

      {proLessonsCount > 0 && (
        <TouchableOpacity
          style={[styles.proBtn, { backgroundColor: colors.primary }]}
          onPress={handleUnlockPro}
          activeOpacity={0.85}
        >
          <Feather name="unlock" size={18} color="#fff" />
          <Text style={[styles.proBtnText, { fontFamily: "Inter_700Bold" }]}>
            Unlock {proLessonsCount} Pro Lessons
          </Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.lessonsTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
        Lessons
      </Text>

      {course.lessons.map((lesson) => (
        <LessonItem
          key={lesson.id}
          lesson={lesson}
          accentColor={course.color}
          isProLocked={true}
          onPress={() => router.push(`/lesson/${lesson.id}?courseId=${course.id}` as any)}
        />
      ))}
    </ScrollView>
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
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 10, borderRadius: 14, paddingVertical: 18, marginBottom: 20,
    shadowColor: "#FF6B1A", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
  },
  proBtnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
  lessonsTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
});
