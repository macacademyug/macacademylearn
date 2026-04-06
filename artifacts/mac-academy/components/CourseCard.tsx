import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
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

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  const colors = useColors();
  return (
    <View style={[styles.progressTrack, { backgroundColor: colors.progressTrack }]}>
      <View
        style={[
          styles.progressFill,
          { width: `${progress}%` as any, backgroundColor: color },
        ]}
      />
    </View>
  );
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
  const colors = useColors();
  const { getCourseProgress, isUnlocked } = useProgress();
  const unlocked = isUnlocked(course.id);
  const progress = getCourseProgress(course.id, course.totalLessons);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.accentBar}>
        <View style={[styles.accent, { backgroundColor: course.color }]} />
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={[styles.iconWrap, { backgroundColor: course.color + "22" }]}>
            <Feather name={course.icon as any} size={20} color={course.color} />
          </View>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: course.color }]}>
              {course.level}
            </Text>
          </View>
          {!unlocked && (
            <View style={[styles.lockBadge, { backgroundColor: colors.muted }]}>
              <Feather name="lock" size={12} color={colors.locked} />
            </View>
          )}
        </View>

        <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          {course.title}
        </Text>
        <Text style={[styles.description, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]} numberOfLines={2}>
          {course.description}
        </Text>

        <View style={styles.meta}>
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
          <Text style={[styles.price, { color: unlocked ? colors.completed : course.color, fontFamily: "Inter_600SemiBold" }]}>
            {unlocked ? (course.isFree ? "Free" : "Unlocked") : course.price}
          </Text>
        </View>

        {unlocked && progress > 0 && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                Progress
              </Text>
              <Text style={[styles.progressPercent, { color: course.color, fontFamily: "Inter_600SemiBold" }]}>
                {progress}%
              </Text>
            </View>
            <ProgressBar progress={progress} color={course.color} />
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
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  accentBar: {
    width: 4,
  },
  accent: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    flex: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  lockBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 2,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  price: {
    fontSize: 13,
    marginLeft: "auto",
  },
  progressSection: {
    gap: 5,
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontSize: 11,
  },
  progressPercent: {
    fontSize: 11,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});
