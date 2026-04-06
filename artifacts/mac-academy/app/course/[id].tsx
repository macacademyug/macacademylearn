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
import { COURSES } from "@/data/courses";
import * as Haptics from "expo-haptics";

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  const colors = useColors();
  return (
    <View style={[styles.progressTrack, { backgroundColor: colors.progressTrack }]}>
      <View style={[styles.progressFill, { width: `${progress}%` as any, backgroundColor: color }]} />
    </View>
  );
}

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { getCourseProgress, isUnlocked, unlockCourse } = useProgress();

  const course = COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, fontFamily: "Inter_400Regular" }}>Course not found.</Text>
      </View>
    );
  }

  const unlocked = isUnlocked(course.id);
  const progress = getCourseProgress(course.id, course.totalLessons);

  const handleBuyAccess = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      const supported = await Linking.canOpenURL(course.flutterwaveLink);
      if (supported) {
        await Linking.openURL(course.flutterwaveLink);
      } else {
        Alert.alert("Cannot open payment page", "Please visit our website to purchase access.");
      }
    } catch {
      Alert.alert("Error", "Unable to open payment link.");
    }
  };

  const handleDevUnlock = () => {
    unlockCourse(course.id);
    Alert.alert("Unlocked!", `${course.title} is now unlocked.`);
  };

  const topPadding = Platform.OS === "web" ? 67 : insets.top;

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

      <View style={[styles.courseHeader, { backgroundColor: course.color + "18", borderColor: course.color + "35" }]}>
        <View style={[styles.courseIconWrap, { backgroundColor: course.color }]}>
          <Feather name={course.icon as any} size={28} color="#fff" />
        </View>
        <View style={[styles.levelBadge, { backgroundColor: course.color + "30" }]}>
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
          {[
            { icon: "play-circle", label: `${course.totalLessons} lessons` },
            { icon: "clock", label: course.estimatedHours },
          ].map((m) => (
            <View key={m.label} style={styles.metaItem}>
              <Feather name={m.icon as any} size={13} color={colors.mutedForeground} />
              <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                {m.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {unlocked && (
        <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              Your Progress
            </Text>
            <Text style={[styles.progressPct, { color: course.color, fontFamily: "Inter_700Bold" }]}>
              {progress}%
            </Text>
          </View>
          <ProgressBar progress={progress} color={course.color} />
          <Text style={[styles.progressSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {Math.round(progress / 100 * course.totalLessons)} of {course.totalLessons} lessons completed
          </Text>
        </View>
      )}

      {!unlocked && (
        <View style={[styles.lockedBanner, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="lock" size={30} color={colors.locked} />
          <Text style={[styles.lockedTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Full Access Required
          </Text>
          <Text style={[styles.lockedDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Unlock all {course.totalLessons} lessons and lifetime access for {course.price}.
          </Text>
          <TouchableOpacity
            style={[styles.buyBtn, { backgroundColor: course.color }]}
            onPress={handleBuyAccess}
            activeOpacity={0.85}
          >
            <Feather name="credit-card" size={18} color="#fff" />
            <Text style={[styles.buyText, { fontFamily: "Inter_700Bold" }]}>
              Buy Full Access — {course.price}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDevUnlock}>
            <Text style={[styles.devUnlock, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              (Demo: tap to preview)
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={[styles.lessonsTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
        Lessons
      </Text>

      {course.lessons.map((lesson) => (
        <LessonItem
          key={lesson.id}
          lesson={lesson}
          isLocked={!unlocked}
          accentColor={course.color}
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
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  courseHeader: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 10,
    marginBottom: 16,
  },
  courseIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  levelBadge: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  levelText: { fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
  courseTitle: { fontSize: 22, fontWeight: "700" },
  courseDesc: { fontSize: 14, lineHeight: 21 },
  metaRow: { flexDirection: "row", gap: 16, marginTop: 4 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 13 },
  progressCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 8,
    marginBottom: 16,
  },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressLabel: { fontSize: 15, fontWeight: "600" },
  progressPct: { fontSize: 18, fontWeight: "700" },
  progressTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  progressSub: { fontSize: 12 },
  lockedBanner: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  lockedTitle: { fontSize: 18, fontWeight: "700" },
  lockedDesc: { fontSize: 14, textAlign: "center", lineHeight: 20 },
  buyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 28,
    marginTop: 4,
  },
  buyText: { fontSize: 16, fontWeight: "700", color: "#fff" },
  devUnlock: { fontSize: 12, marginTop: 4 },
  lessonsTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
});
