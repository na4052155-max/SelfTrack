export type Sentiment = 'positive' | 'neutral' | 'negative';

const positiveWords = [
  'good', 'great', 'excellent', 'amazing', 'fantastic', 'wonderful', 'awesome',
  'love', 'like', 'enjoy', 'happy', 'excited', 'easy', 'clear', 'helpful',
  'useful', 'interesting', 'fun', 'engaging', 'brilliant', 'perfect'
];

const negativeWords = [
  'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'difficult',
  'hard', 'confusing', 'boring', 'frustrating', 'annoying', 'useless',
  'pointless', 'waste', 'stupid', 'dumb', 'complicated', 'overwhelming'
];

export const analyzeSentiment = (text: string): Sentiment => {
  if (!text) return 'neutral';
  
  const words = text.toLowerCase().split(/\s+/);
  let positiveScore = 0;
  let negativeScore = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) {
      positiveScore++;
    }
    if (negativeWords.some(nw => word.includes(nw))) {
      negativeScore++;
    }
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
};

export const getSentimentRecommendation = (sentiment: Sentiment, field: string): string => {
  switch (sentiment) {
    case 'positive':
      return `Great to see you're enjoying ${field}! Keep up the momentum and consider taking on more challenging topics.`;
    case 'negative':
      return `It seems you're facing some challenges with ${field}. Consider reviewing fundamentals or taking a different approach.`;
    case 'neutral':
      return `You're making steady progress in ${field}. Try mixing up your learning methods to stay engaged.`;
    default:
      return '';
  }
};