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
  isLocked: boolean;
  accentColor: string;
}

export default function LessonItem({ lesson, onPress, isLocked, accentColor }: LessonItemProps) {
  const colors = useColors();
  const { isComplete } = useProgress();
  const completed = isComplete(lesson.id);

  const handlePress = () => {
    if (isLocked) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={isLocked ? 1 : 0.75}
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
        isLocked && { opacity: 0.5 },
      ]}
    >
      <View style={[styles.numberWrap, { backgroundColor: completed ? colors.completed + "22" : accentColor + "18" }]}>
        {completed ? (
          <Feather name="check" size={16} color={colors.completed} />
        ) : isLocked ? (
          <Feather name="lock" size={14} color={colors.locked} />
        ) : (
          <Text style={[styles.number, { color: accentColor, fontFamily: "Inter_700Bold" }]}>
            {lesson.order}
          </Text>
        )}
      </View>
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
          numberOfLines={1}
        >
          {lesson.title}
        </Text>
        <Text style={[styles.description, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]} numberOfLines={1}>
          {lesson.description}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.duration, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          {lesson.duration}
        </Text>
        {!isLocked && (
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
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 15,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    fontSize: 12,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  duration: {
    fontSize: 12,
  },
});
