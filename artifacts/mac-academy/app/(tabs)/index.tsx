import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/expo";
import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/context/ProgressContext";
import CourseCard from "@/components/CourseCard";
import { COURSES } from "@/data/courses";

function OverallProgress() {
  const colors = useColors();
  const { getCourseProgress } = useProgress();
  const total = COURSES.reduce((sum, c) => sum + c.totalLessons, 0);
  const done = COURSES.reduce((sum, c) => sum + Math.round(getCourseProgress(c.id, c.totalLessons) / 100 * c.totalLessons), 0);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  if (done === 0) return null;

  return (
    <View style={[styles.overallCard, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "30" }]}>
      <View style={styles.overallRow}>
        <Text style={[styles.overallLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
          Overall Progress
        </Text>
        <Text style={[styles.overallPct, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
          {pct}%
        </Text>
      </View>
      <View style={[styles.bigTrack, { backgroundColor: colors.progressTrack }]}>
        <View style={[styles.bigFill, { width: `${pct}%` as any, backgroundColor: colors.primary }]} />
      </View>
      <Text style={[styles.overallSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
        {done} of {total} lessons completed
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { user } = useUser();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const firstName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "Student";

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
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.greeting, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Welcome back,
          </Text>
          <Text style={[styles.name, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            {firstName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => signOut()}
          style={[styles.profileBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
          activeOpacity={0.75}
        >
          <Feather name="log-out" size={18} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>

      <View style={[styles.heroBanner, { backgroundColor: colors.primary }]}>
        <View>
          <Text style={[styles.heroTitle, { color: "#fff", fontFamily: "Inter_700Bold" }]}>
            Mac Academy
          </Text>
          <Text style={[styles.heroSub, { color: "rgba(255,255,255,0.85)", fontFamily: "Inter_400Regular" }]}>
            FlipaClip Animation Courses
          </Text>
        </View>
        <View style={styles.heroIcon}>
          <Feather name="play-circle" size={44} color="rgba(255,255,255,0.35)" />
        </View>
      </View>

      <OverallProgress />

      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
        Courses
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
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroBanner: {
    borderRadius: 20,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  heroSub: {
    fontSize: 14,
    marginTop: 4,
  },
  heroIcon: {},
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  overallCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 20,
    gap: 8,
  },
  overallRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overallLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  overallPct: {
    fontSize: 16,
    fontWeight: "700",
  },
  bigTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  bigFill: {
    height: "100%",
    borderRadius: 3,
  },
  overallSub: {
    fontSize: 12,
  },
});
