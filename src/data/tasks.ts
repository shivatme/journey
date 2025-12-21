export type TaskCategory = "warmup" | "personal" | "bold" | "final";

export interface GameTask {
  id: number;
  text: string;
  category: TaskCategory;
}

export const PENALTY_TILES: Record<number, number> = {
  6: -5,
  14: -10,
  27: -5,
  36: -10,
};

const TASKS: GameTask[] = [
  // 1-10: Warm-up
  { id: 1, text: "Give your partner a high five.", category: "warmup" },
  { id: 2, text: "Compliment your partner's outfit.", category: "warmup" },
  { id: 3, text: "Share your favorite memory together.", category: "warmup" },
  { id: 4, text: "Make a funny face.", category: "warmup" },
  { id: 5, text: "Tell a joke.", category: "warmup" },
  { id: 6, text: "Go back 5 spaces! (Penalty)", category: "warmup" }, // Penalty tile
  { id: 7, text: "Describe your partner in 3 words.", category: "warmup" },
  { id: 8, text: "Do 5 jumping jacks.", category: "warmup" },
  { id: 9, text: "Hold hands for the next round.", category: "warmup" },
  { id: 10, text: "Whisper something sweet.", category: "warmup" },

  // 11-25: Personal
  {
    id: 11,
    text: "What is your partner's best quality?",
    category: "personal",
  },
  {
    id: 12,
    text: "Share a secret you've never told anyone.",
    category: "personal",
  },
  {
    id: 13,
    text: "What was your first impression of your partner?",
    category: "personal",
  },
  { id: 14, text: "Go back 10 spaces! (Penalty)", category: "personal" }, // Penalty
  { id: 15, text: "What is your biggest fear?", category: "personal" },
  { id: 16, text: "Describe your perfect date.", category: "personal" },
  {
    id: 17,
    text: "What is one thing you want to improve in yourself?",
    category: "personal",
  },
  { id: 18, text: "Share a childhood memory.", category: "personal" },
  {
    id: 19,
    text: "What is your partner's most annoying habit?",
    category: "personal",
  },
  {
    id: 20,
    text: "If you could travel anywhere, where would it be?",
    category: "personal",
  },
  { id: 21, text: "What is your dream job?", category: "personal" },
  {
    id: 22,
    text: "What is the most romantic thing your partner has done?",
    category: "personal",
  },
  { id: 23, text: "Share a regret you have.", category: "personal" },
  { id: 24, text: "What makes you feel most loved?", category: "personal" },
  { id: 25, text: "Kiss your partner on the cheek.", category: "personal" },

  // 26-40: Bold
  {
    id: 26,
    text: "Give your partner a massage for 1 minute.",
    category: "bold",
  },
  { id: 27, text: "Go back 5 spaces! (Penalty)", category: "bold" }, // Penalty
  {
    id: 28,
    text: "Let your partner check your phone for 1 minute.",
    category: "bold",
  },
  { id: 29, text: "Do a sexy dance for 30 seconds.", category: "bold" },
  { id: 30, text: "Kiss your partner passionately.", category: "bold" },
  {
    id: 31,
    text: "Remove one piece of clothing (accessory counts).",
    category: "bold",
  },
  {
    id: 32,
    text: "Whisper a fantasy in your partner's ear.",
    category: "bold",
  },
  {
    id: 33,
    text: "Let your partner draw on your arm with a pen.",
    category: "bold",
  },
  {
    id: 34,
    text: "Blindfold yourself and let your partner feed you something.",
    category: "bold",
  },
  {
    id: 35,
    text: "Roleplay a scenario of your partner's choice for 2 minutes.",
    category: "bold",
  },
  { id: 36, text: "Go back 10 spaces! (Penalty)", category: "bold" }, // Penalty
  {
    id: 37,
    text: "Give your partner a hickey (or fake one).",
    category: "bold",
  },
  {
    id: 38,
    text: "Let your partner tickle you for 30 seconds.",
    category: "bold",
  },
  {
    id: 39,
    text: "Send a flirty text to your partner right now.",
    category: "bold",
  },
  { id: 40, text: "French kiss for 10 seconds.", category: "bold" },

  // 41-50: Final
  { id: 41, text: "Confess a deep desire.", category: "final" },
  {
    id: 42,
    text: "Promise to do one chore for your partner.",
    category: "final",
  },
  { id: 43, text: "Plan a date night for next week.", category: "final" },
  { id: 44, text: "Give a full body massage coupon.", category: "final" },
  { id: 45, text: "Tell your partner why you love them.", category: "final" },
  { id: 46, text: "Make a toast to your future.", category: "final" },
  { id: 47, text: "Recreate your first kiss.", category: "final" },
  {
    id: 48,
    text: "Share a goal you want to achieve together.",
    category: "final",
  },
  { id: 49, text: "Take a selfie together.", category: "final" },
  {
    id: 50,
    text: "FINISH! You win a special prize from your partner.",
    category: "final",
  },
];

export const getTaskForTile = (tileId: number): GameTask => {
  const task = TASKS.find((t) => t.id === tileId);
  if (!task) {
    return { id: tileId, text: "Free Space! Relax.", category: "warmup" };
  }
  return task;
};
