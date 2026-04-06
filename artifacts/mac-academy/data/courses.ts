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
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "A complete walkthrough of FlipaClip's interface — brushes, the timeline, layers, and playback controls. By the end you'll know exactly where everything lives and be ready to start animating.",
        order: 1,
        isPro: false,
      },
      {
        id: "basics-2",
        title: "Drawing & Onion Skinning",
        duration: "10:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Learn to draw clean frames and use onion skinning to line up your animation perfectly. You'll animate a simple bouncing ball to practice timing and spacing.",
        order: 2,
        isPro: false,
      },
      {
        id: "basics-3",
        title: "Layers, Color & Export",
        duration: "10:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Use layers to separate backgrounds, characters, and effects. Add color to your animation and export a finished video ready to share on social media.",
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
    estimatedHours: "30 min",
    color: "#3B82F6",
    icon: "user",
    lessons: [
      {
        id: "character-1",
        title: "Designing an Animatable Character",
        duration: "10:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Design a character built for smooth animation — correct body proportions, clean joints, and how to separate body parts into layers for maximum flexibility.",
        order: 1,
        isPro: false,
      },
      {
        id: "character-2",
        title: "Walk Cycle Fundamentals",
        duration: "10:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Animate the iconic walk cycle step by step. Master foot placement, weight shift, hip rotation, and arm swing for a fluid, natural-looking walk.",
        order: 2,
        isPro: true,
      },
      {
        id: "character-3",
        title: "Run, Jump & Expressions",
        duration: "10:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Level up with a run cycle, a dynamic jump with anticipation and landing, plus facial expressions that give your character personality and emotion.",
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
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Learn the standard Preston Blair mouth chart — the 8 essential mouth shapes (A/I, E, O, U, F/V, L/TH, M/B/P, rest) and how they map to the sounds in spoken dialogue.",
        order: 1,
        isPro: false,
      },
      {
        id: "lipsync-2",
        title: "Breaking Down Audio",
        duration: "10:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Import audio into FlipaClip and learn to read the waveform. Break a line of dialogue into individual sounds and map each sound to the correct mouth shape frame by frame.",
        order: 2,
        isPro: true,
      },
      {
        id: "lipsync-3",
        title: "Full Lip Sync Scene",
        duration: "10:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Bring it all together — animate a complete talking character scene with synced mouth shapes, eye blinks, and subtle head movement to create a convincing, polished performance.",
        order: 3,
        isPro: true,
      },
    ],
  },
];

export const FLUTTERWAVE_PRO_LINK = "https://flutterwave.com/pay/mac-academy-pro";
