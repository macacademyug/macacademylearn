import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import * as Haptics from "expo-haptics";

const FAQS = [
  {
    q: "How do I watch a video lesson?",
    a: "Go to the Courses tab, tap a course, then tap any unlocked lesson. The video will open in YouTube so you can follow along at your own pace.",
  },
  {
    q: "How does progress saving work?",
    a: "Your progress is saved automatically to your device when you tap 'Mark as Complete' on a lesson. It stays saved even after you close the app. You can also tap the button again to undo it if you tapped by mistake.",
  },
  {
    q: "How much does the FlipaClip course cost?",
    a: "The FlipaClip Pro course costs 25,000 UGX. Pay via MTN or Airtel Mobile Money, send us your screenshot, and we'll give you an unlock code.",
  },
  {
    q: "How do I unlock Pro lessons?",
    a: "Tap the orange 'Unlock Pro Lessons' button on the Courses screen. Send Mobile Money to 0745414641, then send your screenshot to our WhatsApp or email. We'll send you a code — enter it in the box to unlock all lessons instantly.",
  },
  {
    q: "Which payment methods are supported?",
    a: "We accept MTN Uganda Mobile Money and Airtel Uganda Mobile Money. Send your payment to 0745414641 and screenshot it to us.",
  },
  {
    q: "What is FlipaClip?",
    a: "FlipaClip is a popular mobile animation app available on Android and iOS. This academy teaches you everything from beginner basics all the way to advanced lip sync techniques.",
  },
  {
    q: "I completed a lesson but progress didn't save. What do I do?",
    a: "Make sure you tap the 'Mark as Complete' button at the bottom of the lesson page. If the issue persists, try closing and reopening the app.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const colors = useColors();
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.faqItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setOpen(!open);
      }}
      activeOpacity={0.8}
    >
      <View style={styles.faqRow}>
        <Text
          style={[styles.faqQ, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
          numberOfLines={open ? undefined : 2}
        >
          {q}
        </Text>
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.mutedForeground}
        />
      </View>
      {open && (
        <Text style={[styles.faqA, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          {a}
        </Text>
      )}
    </TouchableOpacity>
  );
}

interface ContactRowProps {
  icon: string;
  label: string;
  sub: string;
  url: string;
  color?: string;
}

function ContactRow({ icon, label, sub, url, color }: ContactRowProps) {
  const colors = useColors();
  const accent = color ?? colors.primary;
  return (
    <TouchableOpacity
      style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => Linking.openURL(url)}
      activeOpacity={0.8}
    >
      <View style={[styles.contactIcon, { backgroundColor: accent + "18" }]}>
        <Feather name={icon as any} size={20} color={accent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.contactLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
          {label}
        </Text>
        <Text style={[styles.contactSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          {sub}
        </Text>
      </View>
      <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
    </TouchableOpacity>
  );
}

export default function SupportScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = (Platform.OS === "web" ? 34 : insets.bottom) + 90;

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
        Support
      </Text>
      <Text style={[styles.pageSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
        We're here to help
      </Text>

      <View style={[styles.heroBanner, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "30" }]}>
        <View style={[styles.heroIcon, { backgroundColor: colors.primary }]}>
          <Feather name="headphones" size={26} color="#fff" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Get in Touch
        </Text>
        <Text style={[styles.heroDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          Reach out via WhatsApp, email, or TikTok. We typically respond within 24 hours.
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
        Contact & Socials
      </Text>

      <ContactRow
        icon="message-circle"
        label="WhatsApp"
        sub="0745414641"
        url="https://wa.me/256745414641"
        color="#25D366"
      />
      <ContactRow
        icon="mail"
        label="Email Support"
        sub="alexkasaba2006@gmail.com"
        url="mailto:alexkasaba2006@gmail.com"
        color={colors.primary}
      />
      <ContactRow
        icon="video"
        label="TikTok"
        sub="@mac_toonzug"
        url="https://www.tiktok.com/@mac_toonzug"
        color="#010101"
      />

      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
        Frequently Asked Questions
      </Text>

      {FAQS.map((faq, i) => (
        <FAQItem key={i} q={faq.q} a={faq.a} />
      ))}

      <View style={[styles.versionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.versionText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          Mac Academy v3.0 · Made with creativity
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  pageTitle: { fontSize: 26, fontWeight: "700", marginBottom: 4 },
  pageSub: { fontSize: 13, marginBottom: 20 },
  heroBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  heroTitle: { fontSize: 18, fontWeight: "700" },
  heroDesc: { fontSize: 13, textAlign: "center", lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
  contactIcon: { width: 44, height: 44, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  contactLabel: { fontSize: 14, fontWeight: "600" },
  contactSub: { fontSize: 12, marginTop: 2 },
  faqItem: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
    gap: 10,
  },
  faqRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  faqQ: { flex: 1, fontSize: 14, fontWeight: "600", lineHeight: 20 },
  faqA: { fontSize: 13, lineHeight: 20 },
  versionCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  versionText: { fontSize: 12 },
});
