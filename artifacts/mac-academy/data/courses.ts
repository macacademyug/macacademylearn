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
    description: "Learn the essential tools and techniques to start creating animations in FlipaClip from scratch.",
    totalLessons: 6,
    estimatedHours: "3 hrs",
    color: "#22c55e",
    icon: "star",
    lessons: [
      {
        id: "basics-1",
        title: "Welcome to FlipaClip",
        duration: "7:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Get an overview of FlipaClip's interface, tools, and what you'll create in this course. Perfect for absolute beginners who have never opened the app before.",
        order: 1,
        isPro: false,
      },
      {
        id: "basics-2",
        title: "Drawing Your First Frame",
        duration: "10:30",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Learn to use brushes, erasers, and the color palette to draw and paint your very first animation frame with confidence.",
        order: 2,
        isPro: false,
      },
      {
        id: "basics-3",
        title: "Understanding Onion Skinning",
        duration: "9:15",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Onion skinning is FlipaClip's most powerful feature. Learn how to use it to keep your animations smooth and consistent between frames.",
        order: 3,
        isPro: false,
      },
      {
        id: "basics-4",
        title: "Basic Movement Animation",
        duration: "14:45",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Animate a bouncing ball to understand the 12 principles of animation — timing, spacing, squash, and stretch all in one fun exercise.",
        order: 4,
        isPro: true,
      },
      {
        id: "basics-5",
        title: "Working with Layers",
        duration: "11:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Layers are essential for clean professional animations. Learn to separate backgrounds, characters, and effects for maximum control.",
        order: 5,
        isPro: true,
      },
      {
        id: "basics-6",
        title: "Exporting Your Animation",
        duration: "8:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Export your finished animation as a video or GIF and share it with the world. Learn the best export settings for social media.",
        order: 6,
        isPro: true,
      },
    ],
  },
  {
    id: "rigging",
    title: "Character Rigging",
    level: "Intermediate",
    description: "Give your characters life and structure using FlipaClip's rigging tools for smooth, repeatable animations.",
    totalLessons: 7,
    estimatedHours: "5 hrs",
    color: "#3B82F6",
    icon: "user",
    lessons: [
      {
        id: "rigging-1",
        title: "What is Character Rigging?",
        duration: "8:30",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Understand the concept of rigging, why it saves time, and how FlipaClip's cut-out animation system works compared to frame-by-frame.",
        order: 1,
        isPro: false,
      },
      {
        id: "rigging-2",
        title: "Designing a Rig-Friendly Character",
        duration: "14:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Design a character specifically built for rigging — proper body proportions, joint placement, and how to separate body parts for easy animation.",
        order: 2,
        isPro: true,
      },
      {
        id: "rigging-3",
        title: "Setting Up Body Parts as Layers",
        duration: "16:20",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Split your character into rig-ready layers — head, torso, arms, legs — and learn the correct stacking order for realistic movement.",
        order: 3,
        isPro: true,
      },
      {
        id: "rigging-4",
        title: "Animating a Walk Cycle",
        duration: "20:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Use your rig to animate the classic walk cycle. Master foot placement, weight shift, and arm swing for a natural-looking character walk.",
        order: 4,
        isPro: true,
      },
      {
        id: "rigging-5",
        title: "Run Cycle & Jump Animation",
        duration: "18:45",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Take your character further with a run cycle and a dynamic jump with anticipation, follow-through, and landing impact.",
        order: 5,
        isPro: true,
      },
      {
        id: "rigging-6",
        title: "Facial Expressions & Lip Sync",
        duration: "15:30",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Rig your character's face for expressions and lip sync. Learn the standard mouth shapes for dialogue and how to match them to audio.",
        order: 6,
        isPro: true,
      },
      {
        id: "rigging-7",
        title: "Assembling a Full Scene",
        duration: "22:15",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Bring everything together — rig your character, add a background, animate dialogue, and export a polished short scene.",
        order: 7,
        isPro: true,
      },
    ],
  },
  {
    id: "transitions",
    title: "Advanced Transitions",
    level: "Advanced",
    description: "Master cinematic scene transitions, special effects, and camera movements that make your animations stand out.",
    totalLessons: 8,
    estimatedHours: "7 hrs",
    color: "#FF6B1A",
    icon: "zap",
    lessons: [
      {
        id: "transitions-1",
        title: "The Power of Transitions",
        duration: "9:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Understand why transitions matter in storytelling and how professional animators use them to control pacing, emotion, and viewer attention.",
        order: 1,
        isPro: false,
      },
      {
        id: "transitions-2",
        title: "Smear & Blur Effects",
        duration: "16:40",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Learn the smear technique used in high-speed animations. Create motion blur effects manually in FlipaClip for punchy, dynamic movements.",
        order: 2,
        isPro: true,
      },
      {
        id: "transitions-3",
        title: "Wipe & Swipe Transitions",
        duration: "13:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Build professional wipe and swipe transitions between scenes using layered animation and creative masking techniques.",
        order: 3,
        isPro: true,
      },
      {
        id: "transitions-4",
        title: "Zoom & Whip Pan",
        duration: "17:30",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Simulate camera zoom-ins and whip pans for energetic, cinematic scene cuts that feel like real live-action film.",
        order: 4,
        isPro: true,
      },
      {
        id: "transitions-5",
        title: "Particle & Explosion Effects",
        duration: "24:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Create hand-drawn particle effects, sparks, and cartoon explosion transitions from scratch using FlipaClip's brush tools.",
        order: 5,
        isPro: true,
      },
      {
        id: "transitions-6",
        title: "Morphing Between Objects",
        duration: "20:15",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Master shape morphing transitions where one object seamlessly transforms into another — a hallmark of fluid professional animation.",
        order: 6,
        isPro: true,
      },
      {
        id: "transitions-7",
        title: "Music Sync & Timing",
        duration: "18:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Sync your transitions to music beats for maximum visual impact. Learn timing techniques used in AMVs and promotional animations.",
        order: 7,
        isPro: true,
      },
      {
        id: "transitions-8",
        title: "Building Your Showreel",
        duration: "15:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Compile your best transitions into a polished showreel with titles, music, and smooth transitions — ready to share with clients and on social media.",
        order: 8,
        isPro: true,
      },
    ],
  },
];

export const FLUTTERWAVE_PRO_LINK = "https://flutterwave.com/pay/mac-academy-pro";
