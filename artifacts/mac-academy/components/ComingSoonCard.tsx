import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

interface ComingSoonCourse {
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}

interface Props {
  course: ComingSoonCourse;
}

export default function ComingSoonCard({ course }: Props) {
  const colors = useColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, opacity: 0.72 }]}>
      <View style={[styles.accentBar, { backgroundColor: course.color }]} />
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.iconWrap, { backgroundColor: course.color + "22" }]}>
            <Feather name={course.icon as any} size={20} color={course.color} />
          </View>
          <View style={[styles.badge, { backgroundColor: colors.muted }]}>
            <Feather name="clock" size={11} color={colors.mutedForeground} />
            <Text style={[styles.badgeText, { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" }]}>
              COMING SOON
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          {course.title}
        </Text>
        <Text style={[styles.sub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          {course.subtitle}
        </Text>

        <View style={styles.metaRow}>
          <Feather name="lock" size={13} color={colors.mutedForeground} />
          <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Not available yet — check back soon
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
  },
  accentBar: { width: 4 },
  body: { flex: 1, padding: 16, gap: 8 },
  topRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: "auto" as any,
  },
  badgeText: { fontSize: 11, fontWeight: "600", letterSpacing: 0.4 },
  title: { fontSize: 17, fontWeight: "700" },
  sub: { fontSize: 13, lineHeight: 19 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 12 },
});
