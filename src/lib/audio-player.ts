import { AppLanguage } from '@/types/pregnancy-journey';

export function speakText(text: string, lang: AppLanguage): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('Speech synthesis is not supported in this browser.');
        return false;
    }

    try {
        window.speechSynthesis.cancel(); // Stop any ongoing audio

        const utterance = new SpeechSynthesisUtterance(text);

        // Map app language to Web Speech BCP 47 language tags
        if (lang === 'hi') {
            utterance.lang = 'hi-IN';
        } else if (lang === 'mr') {
            utterance.lang = 'mr-IN';
        } else {
            utterance.lang = 'en-IN';
        }

        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);
        return true;
    } catch (err) {
        console.error('Audio playback error:', err);
        return false;
    }
}

export function stopAudio(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}
