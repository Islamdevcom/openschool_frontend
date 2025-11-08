/**
 * FAQ Cache Utility - Smart caching with similarity matching
 * Reduces token usage by checking cache before calling GPT API
 */

/**
 * Normalize text for comparison
 * - Convert to lowercase
 * - Remove punctuation
 * - Remove extra spaces
 * - Remove common question words
 */
const normalizeText = (text) => {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    // Remove punctuation
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'«»]/g, ' ')
    // Remove extra spaces
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Calculate similarity between two strings using Jaccard similarity
 * Returns a value between 0 (no similarity) and 1 (identical)
 */
const calculateSimilarity = (str1, str2) => {
  const normalized1 = normalizeText(str1);
  const normalized2 = normalizeText(str2);

  if (!normalized1 || !normalized2) return 0;
  if (normalized1 === normalized2) return 1;

  // Split into words (tokens)
  const words1 = new Set(normalized1.split(' ').filter(w => w.length > 2));
  const words2 = new Set(normalized2.split(' ').filter(w => w.length > 2));

  if (words1.size === 0 || words2.size === 0) return 0;

  // Calculate Jaccard similarity: intersection / union
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
};

/**
 * Find similar question in FAQ cache
 * @param {string} question - User's question
 * @param {Array} faqCache - Array of cached FAQ entries
 * @param {number} threshold - Similarity threshold (0-1), default 0.6
 * @returns {Object|null} - Cached entry or null
 */
export const findSimilarQuestion = (question, faqCache, threshold = 0.6) => {
  if (!question || !faqCache || faqCache.length === 0) {
    return null;
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of faqCache) {
    const similarity = calculateSimilarity(question, entry.question);

    if (similarity > bestScore && similarity >= threshold) {
      bestScore = similarity;
      bestMatch = {
        ...entry,
        similarityScore: similarity
      };
    }
  }

  if (bestMatch) {
    console.log(`✅ FAQ Cache HIT! Similarity: ${(bestScore * 100).toFixed(1)}%`);
    console.log(`Question: "${question}"`);
    console.log(`Matched: "${bestMatch.question}"`);
  }

  return bestMatch;
};

/**
 * Add question-answer pair to FAQ cache
 * @param {string} question - User's question
 * @param {string} answer - GPT's answer
 * @param {Array} currentCache - Current FAQ cache array
 * @param {number} maxSize - Maximum cache size, default 100
 * @returns {Array} - Updated cache
 */
export const addToFAQCache = (question, answer, currentCache = [], maxSize = 100) => {
  if (!question || !answer) return currentCache;

  const newEntry = {
    question,
    answer,
    timestamp: new Date().toISOString(),
    hitCount: 0
  };

  // Add to beginning of array (most recent first)
  const updatedCache = [newEntry, ...currentCache];

  // Limit cache size - remove oldest entries
  if (updatedCache.length > maxSize) {
    // Sort by hitCount to keep frequently used entries
    updatedCache.sort((a, b) => b.hitCount - a.hitCount);
    return updatedCache.slice(0, maxSize);
  }

  return updatedCache;
};

/**
 * Update hit count for cached entry
 * @param {Array} cache - FAQ cache array
 * @param {string} question - The question that was matched
 * @returns {Array} - Updated cache
 */
export const incrementHitCount = (cache, question) => {
  return cache.map(entry =>
    entry.question === question
      ? { ...entry, hitCount: (entry.hitCount || 0) + 1 }
      : entry
  );
};

/**
 * Get cache statistics
 * @param {Array} cache - FAQ cache array
 * @returns {Object} - Statistics object
 */
export const getCacheStats = (cache) => {
  if (!cache || cache.length === 0) {
    return {
      totalEntries: 0,
      totalHits: 0,
      mostPopular: null
    };
  }

  const totalHits = cache.reduce((sum, entry) => sum + (entry.hitCount || 0), 0);
  const mostPopular = [...cache].sort((a, b) => (b.hitCount || 0) - (a.hitCount || 0))[0];

  return {
    totalEntries: cache.length,
    totalHits,
    mostPopular: mostPopular ? {
      question: mostPopular.question,
      hits: mostPopular.hitCount || 0
    } : null
  };
};
