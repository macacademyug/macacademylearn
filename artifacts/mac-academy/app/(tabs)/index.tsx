import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import CourseCard from "@/components/CourseCard";
import { COURSES, FLUTTERWAVE_PRO_LINK } from "@/data/courses";
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
        <View
          style={[
            styles.barFill,
            { width: `${pct}%` as any, backgroundColor: colors.primary },
          ]}
        />
      </View>
    </View>
  );
}

export default function CoursesScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = (Platform.OS === "web" ? 34 : insets.bottom) + 90;

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
        { paddingTop: topPadding + 16, paddingBottom: bottomPadding },
      ]}
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

      <TouchableOpacity
        style={[styles.proBtn, { backgroundColor: colors.primary }]}
        onPress={handleUnlockPro}
        activeOpacity={0.85}
      >
        <Feather name="unlock" size={18} color="#fff" />
        <Text style={[styles.proBtnText, { fontFamily: "Inter_700Bold" }]}>
          Unlock Pro Lessons
        </Text>
        <View style={styles.proBadge}>
          <Text style={[styles.proBadgeText, { fontFamily: "Inter_700Bold" }]}>PRO</Text>
        </View>
      </TouchableOpacity>

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
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 2,
  },
  progressCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    marginBottom: 14,
  },
  progressTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressTitle: { fontSize: 15, fontWeight: "700" },
  progressSub: { fontSize: 12, marginTop: 2 },
  progressPct: { fontSize: 28, fontWeight: "700" },
  barTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 3 },
  proBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 24,
    shadowColor: "#FF6B1A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  proBtnText: { fontSize: 17, fontWeight: "700", color: "#fff" },
  proBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  proBadgeText: { fontSize: 11, color: "#fff", fontWeight: "700" },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
});
