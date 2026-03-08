import { generateMetadata } from '@/lib/seo';
import PromptGuideContent from '@/components/pages/PromptGuideContent';

export const metadata = generateMetadata({
    title: 'Hướng Dẫn Prompt Tử Vi AI',
    description: 'Hướng dẫn cách viết prompt hiệu quả cho các công cụ AI. Khám phá các mẫu prompt Tử Vi, Tarot và cách tùy chỉnh để có kết quả tốt nhất.',
    keywords: 'prompt AI, hướng dẫn prompt, viết prompt hiệu quả, prompt Tử Vi, prompt Tarot, AI writing prompts',
    url: '/prompt-guide',
});

export default function Page() {
    return <PromptGuideContent />;
}
