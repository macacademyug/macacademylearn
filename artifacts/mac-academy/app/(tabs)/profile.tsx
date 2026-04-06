import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/expo";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import { COURSES } from "@/data/courses";
import * as Haptics from "expo-haptics";

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { user } = useUser();
  const { getCourseProgress, isUnlocked } = useProgress();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;

  const name = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "Student";
  const email = user?.emailAddresses?.[0]?.emailAddress || "";

  const totalLessons = COURSES.reduce((s, c) => s + c.totalLessons, 0);
  const doneLessons = COURSES.reduce((s, c) => s + Math.round(getCourseProgress(c.id, c.totalLessons) / 100 * c.totalLessons), 0);
  const unlockedCount = COURSES.filter((c) => isUnlocked(c.id)).length;

  const handleSignOut = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await signOut();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: topPadding + 16,
          paddingBottom: (Platform.OS === "web" ? 34 : insets.bottom) + 100,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.avatarCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={[styles.avatarText, { fontFamily: "Inter_700Bold" }]}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.nameText, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          {name}
        </Text>
        {email ? (
          <Text style={[styles.emailText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            {email}
          </Text>
        ) : null}
      </View>

      <View style={styles.statsRow}>
        {[
          { label: "Lessons Done", value: `${doneLessons}/${totalLessons}`, icon: "check-circle", color: colors.completed },
          { label: "Courses Unlocked", value: `${unlockedCount}/${COURSES.length}`, icon: "unlock", color: colors.primary },
        ].map((stat) => (
          <View
            key={stat.label}
            style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Feather name={stat.icon as any} size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
        Course Progress
      </Text>

      {COURSES.map((course) => {
        const progress = getCourseProgress(course.id, course.totalLessons);
        const unlocked = isUnlocked(course.id);
        return (
          <View key={course.id} style={[styles.courseProgress, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cpRow}>
              <View style={[styles.cpDot, { backgroundColor: course.color }]} />
              <Text style={[styles.cpTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]} numberOfLines={1}>
                {course.title}
              </Text>
              {!unlocked && <Feather name="lock" size={13} color={colors.locked} />}
              <Text style={[styles.cpPct, { color: course.color, fontFamily: "Inter_700Bold" }]}>
                {unlocked ? `${progress}%` : "Locked"}
              </Text>
            </View>
            {unlocked && (
              <View style={[styles.cpTrack, { backgroundColor: colors.progressTrack }]}>
                <View style={[styles.cpFill, { width: `${progress}%` as any, backgroundColor: course.color }]} />
              </View>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        style={[styles.signOutBtn, { backgroundColor: colors.destructive + "18", borderColor: colors.destructive + "40" }]}
        onPress={handleSignOut}
        activeOpacity={0.75}
      >
        <Feather name="log-out" size={18} color={colors.destructive} />
        <Text style={[styles.signOutText, { color: colors.destructive, fontFamily: "Inter_600SemiBold" }]}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  avatarCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  nameText: { fontSize: 20, fontWeight: "700" },
  emailText: { fontSize: 13 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    alignItems: "center",
    gap: 6,
  },
  statValue: { fontSize: 18, fontWeight: "700" },
  statLabel: { fontSize: 11, textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  courseProgress: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
    gap: 8,
  },
  cpRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  cpDot: { width: 8, height: 8, borderRadius: 4 },
  cpTitle: { flex: 1, fontSize: 14, fontWeight: "600" },
  cpPct: { fontSize: 13 },
  cpTrack: { height: 4, borderRadius: 2, overflow: "hidden" },
  cpFill: { height: "100%", borderRadius: 2 },
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginTop: 24,
  },
  signOutText: { fontSize: 16, fontWeight: "600" },
});
