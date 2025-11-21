'use server';

/**
 * @fileOverview Provides personalized outfit recommendations based on user browsing history and preferences.
 *
 * - getPersonalizedOutfitRecommendations - A function that retrieves personalized outfit recommendations.
 * - PersonalizedOutfitRecommendationsInput - The input type for the getPersonalizedOutfitRecommendations function.
 * - PersonalizedOutfitRecommendationsOutput - The return type for the getPersonalizedOutfitRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedOutfitRecommendationsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe(
      'A description of the user browsing history and preferences.  Include viewed items, categories, and brands.  Make sure to pass the data as a long string.'
    ),
  stylePreferences: z
    .string()
    .describe('A description of the users style preferences.'),
});
export type PersonalizedOutfitRecommendationsInput = z.infer<
  typeof PersonalizedOutfitRecommendationsInputSchema
>;

const PersonalizedOutfitRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized outfit recommendations.'),
});
export type PersonalizedOutfitRecommendationsOutput = z.infer<
  typeof PersonalizedOutfitRecommendationsOutputSchema
>;

export async function getPersonalizedOutfitRecommendations(
  input: PersonalizedOutfitRecommendationsInput
): Promise<PersonalizedOutfitRecommendationsOutput> {
  return personalizedOutfitRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedOutfitRecommendationsPrompt',
  input: {schema: PersonalizedOutfitRecommendationsInputSchema},
  output: {schema: PersonalizedOutfitRecommendationsOutputSchema},
  prompt: `You are a personal stylist providing outfit recommendations based on user preferences and browsing history.

  Based on the provided browsing history and style preferences, suggest a list of items for personalized outfit recommendations.

  Browsing History: {{{browsingHistory}}}
  Style Preferences: {{{stylePreferences}}}

  Recommendations:`,
});

const personalizedOutfitRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedOutfitRecommendationsFlow',
    inputSchema: PersonalizedOutfitRecommendationsInputSchema,
    outputSchema: PersonalizedOutfitRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
