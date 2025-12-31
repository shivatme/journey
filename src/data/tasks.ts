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
  31: -5,
  39: -10,
  45: -7,
  64: -3,
  73: -9,
  80: -18,
  86: -27,
  89: -10,
  98: -23,
};

const TASKS: GameTask[] = [
  // 1-10: Warm-up
  { id: 1, text: "Give your partner a high five.", category: "warmup" },
  { id: 2, text: "Do 10 naked squats", category: "warmup" },
  { id: 3, text: "Take a shot", category: "warmup" },
  { id: 4, text: "Moan for 10 seconds", category: "warmup" },
  { id: 5, text: "Suck your partners thumb for a minute", category: "warmup" },
  { id: 6, text: "Go back 5 spaces! (Penalty)", category: "warmup" }, // Penalty tile
  { id: 7, text: "Kiss your partner on the butt cheek", category: "warmup" },
  {
    id: 8,
    text: "Get kissed by your partner on your lower back",
    category: "warmup",
  },
  {
    id: 9,
    text: "Hold your partner's kulfi/puddding till your next chance",
    category: "warmup",
  },
  { id: 10, text: "Sing a song for your love", category: "warmup" },

  // 11-25: Personal
  {
    id: 11,
    text: "Take 1.5 shots",
    category: "personal",
  },
  {
    id: 12,
    text: "Get kissed on your neck",
    category: "personal",
  },
  {
    id: 13,
    text: "Get kissed on your chest",
    category: "personal",
  },
  { id: 14, text: "Go back 10 spaces! (Penalty)", category: "personal" }, // Penalty
  { id: 15, text: "Get kissed on your abdomen", category: "personal" },
  { id: 16, text: "Get your arm pit licked", category: "personal" },
  {
    id: 17,
    text: "Bach gaya iss baar bete",
    category: "personal",
  },
  {
    id: 18,
    text: "Take a shot from your partners mouth",
    category: "personal",
  },
  {
    id: 19,
    text: "Get kissed on a body part of your choice below neck",
    category: "personal",
  },
  {
    id: 20,
    text: "Get spanked 3 times naked",
    category: "personal",
  },
  {
    id: 21,
    text: "Tell your partner how much you love them",
    category: "personal",
  },
  {
    id: 22,
    text: "Suck your partner(any part) for 2 minutes",
    category: "personal",
  },
  {
    id: 23,
    text: "Tell your partner how you imagine your future together",
    category: "personal",
  },
  {
    id: 24,
    text: "Get sucked by your partner(any part)",
    category: "personal",
  },
  { id: 25, text: "Have a shot", category: "personal" },

  // 26-40: Bold
  {
    id: 26,
    text: "Take a shot",
    category: "bold",
  },
  { id: 27, text: "Go back 5 spaces! (Penalty)", category: "bold" }, // Penalty
  {
    id: 28,
    text: "Smooch for a minute",
    category: "bold",
  },
  { id: 29, text: "Bach gaya bete", category: "bold" },
  { id: 30, text: "Kiss your partner passionately.", category: "bold" },
  {
    id: 31,
    text: "Go back 5 spaces! (Penalty)",
    category: "bold",
  },
  {
    id: 32,
    text: "Get licked in the ear",
    category: "bold",
  },
  {
    id: 33,
    text: "Give a 2 min lap dance on your partners fav song",
    category: "bold",
  },
  {
    id: 34,
    text: "Blindfold yourself and let your partner enjoy for 5 minutes",
    category: "bold",
  },
  {
    id: 35,
    text: "Kiss on pudding/kulfi",
    category: "bold",
  },
  { id: 36, text: "Go back 10 spaces! (Penalty)", category: "bold" }, // Penalty
  {
    id: 37,
    text: "Give your partner a hickey.",
    category: "bold",
  },
  {
    id: 38,
    text: "Give a 3 minute massage",
    category: "bold",
  },
  {
    id: 39,
    text: "Go back 10 spaces! (Penalty)",
    category: "bold",
  },
  { id: 40, text: "French kiss for 30 seconds.", category: "bold" },

  // 41-50: Final
  {
    id: 41,
    text: "Remove one item of clothing from your partner using your mouth",
    category: "final",
  },
  {
    id: 42,
    text: "Blind fold your partner and enjoy for 2 minutes",
    category: "final",
  },
  { id: 43, text: "Have 2 shots", category: "final" },
  {
    id: 44,
    text: "Let your partner lick your body for 2 minutes",
    category: "final",
  },
  { id: 45, text: "Go back 7 spaces! (Penalty)", category: "final" },
  {
    id: 46,
    text: "Let your partner pin your hands and do stuff",
    category: "final",
  },
  {
    id: 47,
    text: "Click a nude and send your partner right now",
    category: "final",
  },
  {
    id: 48,
    text: "Dont speak for 5 minutes",
    category: "final",
  },
  {
    id: 49,
    text: "Suck your partners pudding/kulfi for 2 minuts",
    category: "final",
  },
  {
    id: 50,
    text: "Have an orgasm with your partner or let them edge you",
    category: "final",
  },
  { id: 51, text: "Give a slow 60-second hug.", category: "bold" },
  { id: 52, text: "Finger / handjob for 2 minutes", category: "bold" },
  { id: 53, text: "Lick your parrtnerrs armpit", category: "bold" },
  { id: 54, text: "Give head for a minute", category: "bold" },
  {
    id: 55,
    text: "Give your partner a massage for 2 minutes",
    category: "bold",
  },
  {
    id: 56,
    text: "Use vibrator on your partner for a minute",
    category: "bold",
  },
  { id: 57, text: "Take a shot", category: "bold" },
  { id: 58, text: "Bach gaya bete", category: "bold" },
  { id: 59, text: "Bach gaya bete", category: "bold" },
  {
    id: 60,
    text: "Sit on your partner or let them sit on you",
    category: "bold",
  },
  {
    id: 61,
    text: "Let your partner hear your heart beat for a minute",
    category: "bold",
  },
  { id: 62, text: "Take a shot", category: "bold" },
  { id: 63, text: "Twerk for 10 seconds.", category: "bold" },
  { id: 64, text: "Go back 3 spaces! (Penalty)", category: "bold" },
  {
    id: 65,
    text: "Have an intimate stare session for a minute, dont speak",
    category: "bold",
  },
  { id: 66, text: "Bach gaya bete", category: "bold" },
  {
    id: 67,
    text: "Keep some part of your partner in your mouth till next turn",
    category: "bold",
  },
  { id: 68, text: "Take a shot", category: "bold" },
  {
    id: 69,
    text: "Do 69 for a few minutes",
    category: "bold",
  },
  { id: 70, text: "Get on your Knees and suck", category: "bold" },
  { id: 71, text: "Kiss your partner passionately", category: "bold" },
  { id: 72, text: "Bach gaya bete", category: "bold" },
  { id: 73, text: "Go back 9 spaces! (Penalty)", category: "bold" },
  { id: 74, text: "Lick your partners back", category: "bold" },
  { id: 75, text: "Get licked by your partner on the back", category: "bold" },
  { id: 76, text: "Promise something for your future", category: "final" },
  { id: 77, text: "Say why this relationship matters.", category: "final" },
  { id: 78, text: "Bach gaya bete", category: "final" },
  { id: 79, text: "Hold hands tightly and kiss.", category: "final" },
  { id: 80, text: "Go back 18 spaces! (Penalty)", category: "final" },
  { id: 81, text: "Say ‘thank you’ for something real.", category: "final" },
  {
    id: 82,
    text: "Describe your ideal future night together.",
    category: "final",
  },
  { id: 83, text: "Smile and stay silent for 10 seconds.", category: "final" },
  { id: 84, text: "Give them a massage for 2 minutes.", category: "final" },
  { id: 85, text: "Take a shot", category: "final" },
  { id: 86, text: "Go back 27 spaces! (Penalty)", category: "final" },
  { id: 87, text: "Send them a nude", category: "final" },
  { id: 88, text: "Let them edge you", category: "final" },
  { id: 89, text: "Go back 10 spaces! (Penalty)", category: "final" },
  { id: 90, text: "Make your partner feel special", category: "final" },
  { id: 91, text: "Hold hands until game ends.", category: "final" },
  { id: 92, text: "Dance together for a minute", category: "final" },
  { id: 93, text: "Give head for 30 seconds", category: "final" },
  {
    id: 94,
    text: "Eat/Drink something from your partners body",
    category: "final",
  },
  { id: 95, text: "Promise life together.", category: "final" },
  { id: 96, text: "Both take a shot", category: "final" },
  { id: 97, text: "Feed your partner with your mouth", category: "final" },
  { id: 98, text: "Go back 23 spaces! (Penalty)", category: "final" },
  {
    id: 99,
    text: "Pour a shot for your partner with your mouth",
    category: "final",
  },
  {
    id: 100,
    text: "🏁Shuru karo! You both win — together ❤️",
    category: "final",
  },
];

export const getTaskForTile = (tileId: number): GameTask => {
  const randomIndex = Math.floor(Math.random() * TASKS.length);
  return TASKS[randomIndex];
};
