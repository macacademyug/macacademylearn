import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

interface ComingSoonCourse {
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}

interface Props {
  course: ComingSoonCourse;
}

function notifyKey(title: string) {
  return `@mac_notify_${title.replace(/\s+/g, "_")}`;
}

export default function ComingSoonCard({ course }: Props) {
  const colors = useColors();
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(notifyKey(course.title))
      .then((v) => { if (v === "true") setNotified(true); })
      .catch(() => {});
  }, [course.title]);

  const handleNotify = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const next = !notified;
    setNotified(next);
    await AsyncStorage.setItem(notifyKey(course.title), next ? "true" : "false").catch(() => {});
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, opacity: 0.8 }]}>
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

        <View style={styles.bottomRow}>
          <View style={styles.metaItem}>
            <Feather name="lock" size={12} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Not available yet
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.notifyBtn,
              notified
                ? { backgroundColor: course.color + "20", borderColor: course.color + "50" }
                : { backgroundColor: colors.muted, borderColor: colors.border },
            ]}
            onPress={handleNotify}
            activeOpacity={0.75}
          >
            <Feather
              name={notified ? "bell" : "bell-off"}
              size={12}
              color={notified ? course.color : colors.mutedForeground}
            />
            <Text
              style={[
                styles.notifyText,
                { color: notified ? course.color : colors.mutedForeground, fontFamily: "Inter_600SemiBold" },
              ]}
            >
              {notified ? "Notified" : "Notify Me"}
            </Text>
          </TouchableOpacity>
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
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  badge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginLeft: "auto" as any,
  },
  badgeText: { fontSize: 11, fontWeight: "600", letterSpacing: 0.4 },
  title: { fontSize: 17, fontWeight: "700" },
  sub: { fontSize: 13, lineHeight: 19 },
  bottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 12 },
  notifyBtn: {
    flexDirection: "row", alignItems: "center", gap: 5,
    borderRadius: 20, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6,
  },
  notifyText: { fontSize: 12, fontWeight: "600" },
});
