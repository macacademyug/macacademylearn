import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { Course } from "@/data/courses";
import * as Haptics from "expo-haptics";

interface CourseCardProps {
  course: Course;
  onPress: () => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
  const colors = useColors();
  const { getCourseProgress } = useProgress();
  const progress = getCourseProgress(course.id, course.totalLessons);
  const freeLessons = course.lessons.filter((l) => !l.isPro).length;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.82}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <View style={[styles.accentBar, { backgroundColor: course.color }]} />
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.iconWrap, { backgroundColor: course.color + "22" }]}>
            <Feather name={course.icon as any} size={20} color={course.color} />
          </View>
          <View style={[styles.levelBadge, { backgroundColor: course.color + "20" }]}>
            <Text style={[styles.levelText, { color: course.color, fontFamily: "Inter_600SemiBold" }]}>
              {course.level}
            </Text>
          </View>
          <View style={styles.freeChip}>
            <Text style={[styles.freeText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {freeLessons} free
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          {course.title}
        </Text>
        <Text
          style={[styles.desc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}
          numberOfLines={2}
        >
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
          <Feather name="chevron-right" size={16} color={course.color} style={{ marginLeft: "auto" }} />
        </View>

        {progress > 0 && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                Progress
              </Text>
              <Text style={[styles.progressPct, { color: course.color, fontFamily: "Inter_600SemiBold" }]}>
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
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  accentBar: { width: 4 },
  body: { flex: 1, padding: 16 },
  topRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  iconWrap: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: "center", justifyContent: "center",
  },
  levelBadge: {
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
  },
  levelText: { fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
  freeChip: { marginLeft: "auto" },
  freeText: { fontSize: 12 },
  title: { fontSize: 17, fontWeight: "700", marginBottom: 4 },
  desc: { fontSize: 13, lineHeight: 19, marginBottom: 8 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12 },
  progressSection: { gap: 5 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between" },
  progressLabel: { fontSize: 11 },
  progressPct: { fontSize: 11 },
  progressTrack: { height: 4, borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2 },
});
