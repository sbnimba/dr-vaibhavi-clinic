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
            const voices = typeof window !== 'undefined' ? window.speechSynthesis.getVoices() : [];
            const hasMarathi = voices.some(v => v.lang.toLowerCase().includes('mr'));
            if (hasMarathi) {
                utterance.lang = 'mr-IN';
            } else {
                // Fallback to Hindi voice which can read Marathi Devnagari script
                utterance.lang = 'hi-IN';
                const hiVoice = voices.find(v => v.lang.toLowerCase().includes('hi'));
                if (hiVoice) {
                    utterance.voice = hiVoice;
                }
            }
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
