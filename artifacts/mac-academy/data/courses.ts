export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  totalLessons: number;
  estimatedHours: string;
  lessons: Lesson[];
  isFree: boolean;
  price: string;
  flutterwaveLink: string;
  color: string;
  icon: string;
}

export const COURSES: Course[] = [
  {
    id: "beginner",
    title: "FlipaClip Fundamentals",
    level: "Beginner",
    description: "Master the basics of FlipaClip animation from scratch. Perfect for absolute beginners.",
    totalLessons: 6,
    estimatedHours: "3 hrs",
    isFree: true,
    price: "Free",
    flutterwaveLink: "https://flutterwave.com",
    color: "#22c55e",
    icon: "star",
    lessons: [
      {
        id: "beginner-1",
        title: "Introduction to FlipaClip",
        duration: "8:30",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Get familiar with the FlipaClip interface and basic tools.",
        order: 1,
      },
      {
        id: "beginner-2",
        title: "Drawing Your First Frame",
        duration: "12:15",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Learn to draw and paint your first animation frame.",
        order: 2,
      },
      {
        id: "beginner-3",
        title: "Understanding Onion Skinning",
        duration: "10:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Use onion skinning to create smooth animations.",
        order: 3,
      },
      {
        id: "beginner-4",
        title: "Basic Movement Animation",
        duration: "15:45",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Animate a simple bouncing ball to learn motion principles.",
        order: 4,
      },
      {
        id: "beginner-5",
        title: "Working with Layers",
        duration: "11:20",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Organize your animation with multiple layers.",
        order: 5,
      },
      {
        id: "beginner-6",
        title: "Exporting Your First Animation",
        duration: "8:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Export and share your completed animation.",
        order: 6,
      },
    ],
  },
  {
    id: "intermediate",
    title: "Character Animation",
    level: "Intermediate",
    description: "Bring characters to life with walk cycles, expressions, and dynamic movement.",
    totalLessons: 8,
    estimatedHours: "6 hrs",
    isFree: false,
    price: "$19.99",
    flutterwaveLink: "https://flutterwave.com/pay/mac-academy-intermediate",
    color: "#3B82F6",
    icon: "trending-up",
    lessons: [
      {
        id: "intermediate-1",
        title: "Character Design Basics",
        duration: "14:30",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Design a character optimized for animation.",
        order: 1,
      },
      {
        id: "intermediate-2",
        title: "The Walk Cycle",
        duration: "18:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Master the classic walk cycle animation.",
        order: 2,
      },
      {
        id: "intermediate-3",
        title: "Facial Expressions",
        duration: "12:45",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Animate compelling facial emotions and expressions.",
        order: 3,
      },
      {
        id: "intermediate-4",
        title: "Run & Jump Physics",
        duration: "16:20",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Apply physics to running and jumping animations.",
        order: 4,
      },
      {
        id: "intermediate-5",
        title: "Lip Sync Techniques",
        duration: "20:10",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Sync mouth movements to audio dialogue.",
        order: 5,
      },
      {
        id: "intermediate-6",
        title: "Hair & Cloth Dynamics",
        duration: "13:55",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Add secondary motion to hair and clothing.",
        order: 6,
      },
      {
        id: "intermediate-7",
        title: "Camera & Backgrounds",
        duration: "15:30",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Create depth with parallax backgrounds and camera moves.",
        order: 7,
      },
      {
        id: "intermediate-8",
        title: "Finishing Your Short Film",
        duration: "22:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Combine everything into a complete short animation.",
        order: 8,
      },
    ],
  },
  {
    id: "advanced",
    title: "Pro Animation Mastery",
    level: "Advanced",
    description: "Professional techniques for complex scenes, special effects, and storytelling.",
    totalLessons: 10,
    estimatedHours: "10 hrs",
    isFree: false,
    price: "$39.99",
    flutterwaveLink: "https://flutterwave.com/pay/mac-academy-advanced",
    color: "#FF6B1A",
    icon: "zap",
    lessons: [
      {
        id: "advanced-1",
        title: "Advanced Frame Timing",
        duration: "25:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Master timing and spacing for cinematic animation.",
        order: 1,
      },
      {
        id: "advanced-2",
        title: "Special Effects: Fire & Water",
        duration: "28:30",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Create stunning particle and liquid effects.",
        order: 2,
      },
      {
        id: "advanced-3",
        title: "Fight Scene Choreography",
        duration: "30:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Animate dynamic action and combat sequences.",
        order: 3,
      },
      {
        id: "advanced-4",
        title: "Lighting & Shading Techniques",
        duration: "22:45",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Apply professional lighting to your scenes.",
        order: 4,
      },
      {
        id: "advanced-5",
        title: "Storytelling & Storyboarding",
        duration: "19:20",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Plan and structure compelling animated stories.",
        order: 5,
      },
      {
        id: "advanced-6",
        title: "Color Grading Animations",
        duration: "16:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Apply cinematic color grades to your finished scenes.",
        order: 6,
      },
      {
        id: "advanced-7",
        title: "Sound Design Integration",
        duration: "20:15",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Layer sound effects and music with your animation.",
        order: 7,
      },
      {
        id: "advanced-8",
        title: "Collaborating & Exporting for Social",
        duration: "14:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Export optimized animations for YouTube, Instagram & TikTok.",
        order: 8,
      },
      {
        id: "advanced-9",
        title: "Building a Portfolio",
        duration: "18:30",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Compile and present your work for clients and opportunities.",
        order: 9,
      },
      {
        id: "advanced-10",
        title: "Monetizing Your Animation Skills",
        duration: "12:00",
        videoUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
        description: "Turn your skills into a career or freelance income.",
        order: 10,
      },
    ],
  },
];
