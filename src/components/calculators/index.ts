import LlmApiCost from './LlmApiCost.astro';
import SubscriptionVsApi from './SubscriptionVsApi.astro';
import AiRoi from './AiRoi.astro';

// Map frontmatter `calculator:` names to widget components.
export const WIDGETS: Record<string, any> = { LlmApiCost, SubscriptionVsApi, AiRoi };
