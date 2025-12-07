
export const LIMITS = {
  QUESTIONS_PER_DAY: 5,
  CRITIQUES_PER_DAY: 2
};

export type UsageType = 'question' | 'critique';

const getTodayKey = () => {
  return new Date().toDateString(); // Resets every day based on local time
};

export const checkLimit = (type: UsageType): boolean => {
  const today = getTodayKey();
  const lastDate = localStorage.getItem('usage_date');

  // If date changed, reset counts
  if (lastDate !== today) {
    localStorage.setItem('usage_date', today);
    localStorage.setItem('usage_question', '0');
    localStorage.setItem('usage_critique', '0');
    return true;
  }

  const count = parseInt(localStorage.getItem(`usage_${type}`) || '0', 10);
  const limit = type === 'question' ? LIMITS.QUESTIONS_PER_DAY : LIMITS.CRITIQUES_PER_DAY;

  return count < limit;
};

export const incrementUsage = (type: UsageType) => {
  const today = getTodayKey();
  const lastDate = localStorage.getItem('usage_date');

  if (lastDate !== today) {
    localStorage.setItem('usage_date', today);
    localStorage.setItem('usage_question', '0');
    localStorage.setItem('usage_critique', '0');
  }

  const current = parseInt(localStorage.getItem(`usage_${type}`) || '0', 10);
  localStorage.setItem(`usage_${type}`, (current + 1).toString());
};

export const getUsageStatus = () => {
  const today = getTodayKey();
  // Ensure date is sync
  if (localStorage.getItem('usage_date') !== today) {
    return {
      questions: 0,
      critiques: 0,
      maxQuestions: LIMITS.QUESTIONS_PER_DAY,
      maxCritiques: LIMITS.CRITIQUES_PER_DAY
    };
  }
  
  return {
    questions: parseInt(localStorage.getItem('usage_question') || '0', 10),
    critiques: parseInt(localStorage.getItem('usage_critique') || '0', 10),
    maxQuestions: LIMITS.QUESTIONS_PER_DAY,
    maxCritiques: LIMITS.CRITIQUES_PER_DAY
  };
};
