import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { Lesson } from "@/data/courses";
import * as Haptics from "expo-haptics";

interface LessonItemProps {
  lesson: Lesson;
  onPress: () => void;
  accentColor: string;
  isProLocked: boolean;
}

export default function LessonItem({ lesson, onPress, accentColor, isProLocked }: LessonItemProps) {
  const colors = useColors();
  const { isComplete } = useProgress();
  const completed = isComplete(lesson.id);
  const locked = lesson.isPro && isProLocked;

  const handlePress = () => {
    if (locked) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={locked ? 1 : 0.75}
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: completed ? colors.completed + "50" : colors.border },
        locked && { opacity: 0.55 },
      ]}
    >
      <View
        style={[
          styles.numberWrap,
          {
            backgroundColor: completed
              ? colors.completed + "22"
              : locked
              ? colors.muted
              : accentColor + "18",
          },
        ]}
      >
        {completed ? (
          <Feather name="check" size={16} color={colors.completed} />
        ) : locked ? (
          <Feather name="lock" size={14} color={colors.locked} />
        ) : (
          <Text style={[styles.number, { color: accentColor, fontFamily: "Inter_700Bold" }]}>
            {lesson.order}
          </Text>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
            numberOfLines={1}
          >
            {lesson.title}
          </Text>
          {lesson.isPro && (
            <View style={[styles.proBadge, { backgroundColor: accentColor + "20" }]}>
              <Text style={[styles.proText, { color: accentColor, fontFamily: "Inter_700Bold" }]}>
                PRO
              </Text>
            </View>
          )}
        </View>
        <Text
          style={[styles.desc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}
          numberOfLines={1}
        >
          {lesson.description}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.duration, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          {lesson.duration}
        </Text>
        {!locked && (
          <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  numberWrap: {
    width: 38, height: 38, borderRadius: 10,
    alignItems: "center", justifyContent: "center",
  },
  number: { fontSize: 15, fontWeight: "700" },
  content: { flex: 1, gap: 3 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { flex: 1, fontSize: 14, fontWeight: "600" },
  proBadge: { borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2 },
  proText: { fontSize: 9, fontWeight: "700", letterSpacing: 0.5 },
  desc: { fontSize: 12 },
  right: { flexDirection: "row", alignItems: "center", gap: 4 },
  duration: { fontSize: 12 },
});
