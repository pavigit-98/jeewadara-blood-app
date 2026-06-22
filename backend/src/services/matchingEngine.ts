import { IDonor } from '../models/types';
import { store } from './dataStore';

/**
 * Checks compatibility: Can donor donate to recipient?
 */
export function isCompatible(donorBlood: string, recipientBlood: string): boolean {
  const compatibilityMap: Record<string, string[]> = {
    'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Universal donor
    'O+': ['O+', 'A+', 'B+', 'AB+'],
    'A-': ['A-', 'A+', 'AB-', 'AB+'],
    'A+': ['A+', 'AB+'],
    'B-': ['B-', 'B+', 'AB-', 'AB+'],
    'B+': ['B+', 'AB+'],
    'AB-': ['AB-', 'AB+'],
    'AB+': ['AB+'] // Universal recipient only
  };
  
  return compatibilityMap[donorBlood]?.includes(recipientBlood) || false;
}

/**
 * Calculate donor matching score based on business rules:
 * score = availability + recent_activity + eligibility
 */
export function calculateDonorScore(donor: IDonor, targetBloodGroup: string): {
  score: number;
  availabilityScore: number;
  recentActivityScore: number;
  eligibilityScore: number;
  isEligible: boolean;
  cooldownRemainingDays: number;
} {
  // 1. Blood type compatibility check
  if (!isCompatible(donor.bloodGroup, targetBloodGroup)) {
    return { score: 0, availabilityScore: 0, recentActivityScore: 0, eligibilityScore: 0, isEligible: false, cooldownRemainingDays: 0 };
  }

  // Medical Deferral block
  if (donor.statusText?.includes('DEFERRED')) {
    return { score: 0, availabilityScore: 0, recentActivityScore: 0, eligibilityScore: 0, isEligible: false, cooldownRemainingDays: 0 };
  }

  // 2. Availability Score (max 50)
  const availabilityScore = donor.availability ? 50 : 0;

  // 3. Recent Activity / Cooldown Check (max 30)
  // Cooldown period = 90 days.
  const cooldownPeriodMs = 90 * 24 * 60 * 60 * 1000;
  const lastDonationTime = new Date(donor.lastDonationDate).getTime();
  const timeSinceLastDonationMs = Date.now() - lastDonationTime;
  
  let recentActivityScore = 0;
  let cooldownRemainingDays = 0;
  let isEligible = true;

  if (timeSinceLastDonationMs >= cooldownPeriodMs) {
    recentActivityScore = 30;
  } else {
    recentActivityScore = 0;
    const remainingMs = cooldownPeriodMs - timeSinceLastDonationMs;
    cooldownRemainingDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
    // If they donated extremely recently, they are not eligible to donate again yet!
    isEligible = false;
  }

  // 4. Base Eligibility score (max 20)
  // If they are eligible and have healthy history, score 20. If they have a deferred history, 0.
  const hasHistoryOfDeferral = donor.donationHistory.some(h => h.status === 'Deferred');
  const eligibilityScore = hasHistoryOfDeferral ? 5 : 20;

  const totalScore = availabilityScore + recentActivityScore + eligibilityScore;

  return {
    score: totalScore,
    availabilityScore,
    recentActivityScore,
    eligibilityScore,
    isEligible,
    cooldownRemainingDays
  };
}

export interface IRankedDonor {
  donor: IDonor;
  score: number;
  confidence: number; // percentage confidence e.g. 98%
  details: {
    availabilityScore: number;
    recentActivityScore: number;
    eligibilityScore: number;
    cooldownRemainingDays: number;
  };
  distanceKm: number;
  travelTimeMins: number;
}

/**
 * Runs the matching engine to find and rank all compatible donors
 */
export function runMatchingEngine(bloodGroup: string, district?: string): IRankedDonor[] {
  const allDonors = store.donors;
  
  const matches: IRankedDonor[] = [];

  for (const donor of allDonors) {
    const stats = calculateDonorScore(donor, bloodGroup);
    
    // Only return compatible, non-zero-scoring donors
    if (stats.score > 0) {
      // Calculate realistic mock distance and time based on district match
      const sameDistrict = district && donor.district.toLowerCase() === district.toLowerCase();
      const distanceKm = sameDistrict ? parseFloat((Math.random() * 5 + 1).toFixed(1)) : parseFloat((Math.random() * 25 + 6).toFixed(1));
      const travelTimeMins = Math.round(distanceKm * 2.5 + Math.random() * 5);

      // Map total score (max 100) to confidence level (70% - 99%)
      const confidence = Math.round(70 + (stats.score / 100) * 29);

      matches.push({
        donor,
        score: stats.score,
        confidence,
        details: {
          availabilityScore: stats.availabilityScore,
          recentActivityScore: stats.recentActivityScore,
          eligibilityScore: stats.eligibilityScore,
          cooldownRemainingDays: stats.cooldownRemainingDays
        },
        distanceKm,
        travelTimeMins
      });
    }
  }

  // Sort by score (highest first), then by distance (closest first)
  return matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.distanceKm - b.distanceKm;
  });
}
