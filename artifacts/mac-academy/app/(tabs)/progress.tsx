import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { COURSES } from "@/data/courses";

function StatCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  const colors = useColors();
  return (
    <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
        <Feather name={icon as any} size={20} color={color} />
      </View>
      <Text style={[styles.statValue, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
        {label}
      </Text>
    </View>
  );
}

export default function ProgressScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { getCourseProgress, completedLessons } = useProgress();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = (Platform.OS === "web" ? 34 : insets.bottom) + 90;

  const totalLessons = COURSES.reduce((s, c) => s + c.totalLessons, 0);
  const doneLessons = Object.values(completedLessons).filter(Boolean).length;
  const overallPct = totalLessons > 0 ? Math.round((doneLessons / totalLessons) * 100) : 0;
  const completedCourses = COURSES.filter(
    (c) => getCourseProgress(c.id, c.totalLessons) === 100
  ).length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPadding + 16, paddingBottom: bottomPadding },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.pageTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
        My Progress
      </Text>
      <Text style={[styles.pageSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
        Saved to your device
      </Text>

      <View style={[styles.overallCard, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "30" }]}>
        <View style={styles.overallRow}>
          <Text style={[styles.overallLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            Overall Completion
          </Text>
          <Text style={[styles.overallPct, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
            {overallPct}%
          </Text>
        </View>
        <View style={[styles.bigTrack, { backgroundColor: colors.progressTrack }]}>
          <View
            style={[
              styles.bigFill,
              { width: `${overallPct}%` as any, backgroundColor: colors.primary },
            ]}
          />
        </View>
        <Text style={[styles.overallSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          {doneLessons} of {totalLessons} lessons completed
        </Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard
          icon="check-circle"
          value={`${doneLessons}`}
          label="Lessons Done"
          color={colors.completed}
        />
        <StatCard
          icon="award"
          value={`${completedCourses}`}
          label="Courses Finished"
          color={colors.gold}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
        Course Breakdown
      </Text>

      {COURSES.map((course) => {
        const pct = getCourseProgress(course.id, course.totalLessons);
        const done = Math.round((pct / 100) * course.totalLessons);
        return (
          <View
            key={course.id}
            style={[styles.courseRow, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={[styles.courseAccent, { backgroundColor: course.color }]} />
            <View style={styles.courseBody}>
              <View style={styles.courseTop}>
                <View style={[styles.courseIcon, { backgroundColor: course.color + "20" }]}>
                  <Feather name={course.icon as any} size={16} color={course.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.courseName, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
                    numberOfLines={1}
                  >
                    {course.title}
                  </Text>
                  <Text style={[styles.courseMeta, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                    {done} / {course.totalLessons} lessons
                  </Text>
                </View>
                <Text style={[styles.coursePct, { color: course.color, fontFamily: "Inter_700Bold" }]}>
                  {pct}%
                </Text>
              </View>
              <View style={[styles.miniTrack, { backgroundColor: colors.progressTrack }]}>
                <View
                  style={[
                    styles.miniFill,
                    { width: `${pct}%` as any, backgroundColor: course.color },
                  ]}
                />
              </View>
            </View>
          </View>
        );
      })}

      {doneLessons === 0 && (
        <View style={[styles.emptyState, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="play-circle" size={36} color={colors.mutedForeground} />
          <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            No progress yet
          </Text>
          <Text style={[styles.emptyDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Complete your first lesson to start tracking progress here.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  pageTitle: { fontSize: 26, fontWeight: "700", marginBottom: 4 },
  pageSub: { fontSize: 13, marginBottom: 20 },
  overallCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    gap: 10,
    marginBottom: 18,
  },
  overallRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  overallLabel: { fontSize: 15, fontWeight: "600" },
  overallPct: { fontSize: 30, fontWeight: "700" },
  bigTrack: { height: 8, borderRadius: 4, overflow: "hidden" },
  bigFill: { height: "100%", borderRadius: 4 },
  overallSub: { fontSize: 12 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  statIcon: { width: 42, height: 42, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  statValue: { fontSize: 22, fontWeight: "700" },
  statLabel: { fontSize: 12, textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  courseRow: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    overflow: "hidden",
  },
  courseAccent: { width: 4 },
  courseBody: { flex: 1, padding: 14, gap: 10 },
  courseTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  courseIcon: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  courseName: { fontSize: 14, fontWeight: "600" },
  courseMeta: { fontSize: 12, marginTop: 1 },
  coursePct: { fontSize: 16, fontWeight: "700" },
  miniTrack: { height: 5, borderRadius: 3, overflow: "hidden" },
  miniFill: { height: "100%", borderRadius: 3 },
  emptyState: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 32,
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  emptyTitle: { fontSize: 16, fontWeight: "600" },
  emptyDesc: { fontSize: 13, textAlign: "center", lineHeight: 20 },
});
