export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  order: number;
  isPro: boolean;
}

export interface Course {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  totalLessons: number;
  estimatedHours: string;
  lessons: Lesson[];
  color: string;
  icon: string;
}

// Replace the YouTube video IDs below with your own videos
const PLACEHOLDER_VIDEO = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export const COURSES: Course[] = [
  {
    id: "basics",
    title: "Basics of FlipaClip",
    level: "Beginner",
    description: "Master the essential tools and techniques to start creating your first animations in FlipaClip from scratch.",
    totalLessons: 3,
    estimatedHours: "30 min",
    color: "#22c55e",
    icon: "star",
    lessons: [
      {
        id: "basics-1",
        title: "Getting Started with FlipaClip",
        duration: "10:00",
        videoUrl: PLACEHOLDER_VIDEO,
        description: "A complete walkthrough of FlipaClip's interface — brushes, the timeline, layers, and playback controls. By the end you'll know exactly where everything lives and be ready to start animating.",
        order: 1,
        isPro: false,
      },
      {
        id: "basics-2",
        title: "Bouncing Ball Animation",
        duration: "15:00",
        videoUrl: PLACEHOLDER_VIDEO,
        description: "Animate a bouncing ball to understand the 12 principles of animation — timing, spacing, squash, and stretch. The bouncing ball is every animator's first exercise and the best way to learn motion.",
        order: 2,
        isPro: false,
      },
      {
        id: "basics-3",
        title: "Exporting Your Animation",
        duration: "5:00",
        videoUrl: PLACEHOLDER_VIDEO,
        description: "Export your finished animation as a video or GIF ready to share on social media. Learn the best export settings for different platforms including TikTok, Instagram, and YouTube.",
        order: 3,
        isPro: true,
      },
    ],
  },
  {
    id: "character",
    title: "Character Animation",
    level: "Intermediate",
    description: "Bring characters to life with walk cycles, run cycles, and expressive movement using FlipaClip's animation tools.",
    totalLessons: 3,
    estimatedHours: "40 min",
    color: "#3B82F6",
    icon: "user",
    lessons: [
      {
        id: "character-1",
        title: "Drawing the Background",
        duration: "10:00",
        videoUrl: PLACEHOLDER_VIDEO,
        description: "Design and draw a complete scene background for your animation — perspective basics, layering background elements, and how to create depth that makes your character stand out.",
        order: 1,
        isPro: false,
      },
      {
        id: "character-2",
        title: "Animating the Character",
        duration: "20:00",
        videoUrl: PLACEHOLDER_VIDEO,
        description: "Animate your character moving through the background scene. Cover walk cycles, weight shifts, and expressive actions — bringing your character to life with believable, fluid movement.",
        order: 2,
        isPro: true,
      },
      {
        id: "character-3",
        title: "Finalizing Your Scene",
        duration: "10:00",
        videoUrl: PLACEHOLDER_VIDEO,
        description: "Polish and finalize your animated scene — adjust timing, add finishing details, clean up rough lines, and put together a complete short animation ready for export.",
        order: 3,
        isPro: true,
      },
    ],
  },
  {
    id: "lipsync",
    title: "Lip Sync",
    level: "Advanced",
    description: "Match your character's mouth movements perfectly to audio dialogue using FlipaClip's frame-by-frame lip sync techniques.",
    totalLessons: 3,
    estimatedHours: "30 min",
    color: "#FF6B1A",
    icon: "mic",
    lessons: [
      {
        id: "lipsync-1",
        title: "Understanding Mouth Shapes",
        duration: "10:00",
        videoUrl: PLACEHOLDER_VIDEO,
        description: "Learn the standard Preston Blair mouth chart — the 8 essential mouth shapes (A/I, E, O, U, F/V, L/TH, M/B/P, rest) and how they map to the sounds in spoken dialogue.",
        order: 1,
        isPro: false,
      },
      {
        id: "lipsync-2",
        title: "Breaking Down Audio",
        duration: "10:00",
        videoUrl: PLACEHOLDER_VIDEO,
        description: "Import audio into FlipaClip and learn to read the waveform. Break a line of dialogue into individual sounds and map each sound to the correct mouth shape frame by frame.",
        order: 2,
        isPro: true,
      },
      {
        id: "lipsync-3",
        title: "Full Lip Sync Scene",
        duration: "10:00",
        videoUrl: PLACEHOLDER_VIDEO,
        description: "Bring it all together — animate a complete talking character scene with synced mouth shapes, eye blinks, and subtle head movement to create a convincing, polished performance.",
        order: 3,
        isPro: true,
      },
    ],
  },
];

export const FLUTTERWAVE_PRO_LINK = "https://flutterwave.com/pay/mac-academy-pro";
