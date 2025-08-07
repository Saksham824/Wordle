export const WORD_LIST = [
  "CRANE", "BRICK", "GLASS", "PRIDE", "CHAIR",
  "CROWN", "PLANT", "WATER", "SHEEP", "MOUSE",
  "BRAVE", "WORLD", "HAPPY", "LIGHT", "MONEY",
  "SUGAR", "HEART", "THORN", "NIGHT", "GRASS"
];

export const getRandomWord = () => {
  const index = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[index];
};
