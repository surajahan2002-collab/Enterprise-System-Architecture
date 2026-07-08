/**
 * 🌍 Architecture: Global Standards (Internationalization - i18n)
 * 🗣️ Domain: DDPM Enterprise Localization Engine
 * 🎯 Objective: Decoupling hardcoded strings from UI components and handling dynamic translations.
 */

// 1. Defining the Dictionary Structure
type TranslationDictionary = {
    [key: string]: string;
};

type SupportedLanguages = 'en-US' | 'fa-IR' | 'de-DE';

const dictionaries: Record<SupportedLanguages, TranslationDictionary> = {
    'en-US': {
        'welcome_message': 'Welcome back to DDPM, {{name}}!',
        'risk_high': 'CRITICAL: Project budget exceeded by {{amount}}.',
        'button_deploy': 'Deploy Infrastructure'
    },
    'fa-IR': {
        'welcome_message': 'به سیستم مدیریت پروژه خوش آمدید، {{name}}!',
        'risk_high': 'هشدار حیاتی: بودجه پروژه به میزان {{amount}} از سقف عبور کرد.',
        'button_deploy': 'استقرار زیرساخت'
    },
    'de-DE': {
        'welcome_message': 'Willkommen zurück bei DDPM, {{name}}!',
        'risk_high': 'KRITISCH: Projektbudget um {{amount}} überschritten.',
        'button_deploy': 'Infrastruktur bereitstellen'
    }
};

export class EnterpriseI18nEngine {
    private currentLang: SupportedLanguages;
    private currentDict: TranslationDictionary;

    constructor(defaultLang: SupportedLanguages = 'en-US') {
        this.currentLang = defaultLang;
        this.currentDict = dictionaries[defaultLang];
    }

    /**
     * 🔄 Dynamically switches the system language and structural direction at runtime.
     */
    public switchLanguage(lang: SupportedLanguages): void {
        this.currentLang = lang;
        this.currentDict = dictionaries[lang];
        
        // Architectural enforcement of reading direction (RTL for Persian/Arabic)
        const direction = lang === 'fa-IR' ? 'RTL' : 'LTR';
        console.log(`\n⚙️ [i18n ENGINE] Language switched to: ${lang} | Layout Direction: ${direction}`);
    }

    /**
     * 🗣️ Translates a key and interpolates dynamic variables.
     */
    public translate(key: string, variables?: Record<string, string | number>): string {
        let text = this.currentDict[key];
        
        if (!text) {
            console.warn(`⚠️ [i18n MISSING KEY] Translation not found for: '${key}' in ${this.currentLang}`);
            return key; // Fallback to raw key to prevent UI crashes
        }

        // Variable Interpolation Logic (e.g., replacing {{name}} with the actual name)
        if (variables) {
            Object.keys(variables).forEach(varName => {
                const regex = new RegExp(`{{${varName}}}`, 'g');
                text = text.replace(regex, String(variables[varName]));
            });
        }

        return text;
    }

    /**
     * 💰 Formats currency based on international locales natively.
     */
    public formatCurrency(amount: number): string {
        const currencyMap: Record<SupportedLanguages, string> = {
            'en-US': 'USD',
            'fa-IR': 'IRR',
            'de-DE': 'EUR'
        };

        return new Intl.NumberFormat(this.currentLang, {
            style: 'currency',
            currency: currencyMap[this.currentLang]
        }).format(amount);
    }
}

// ============================================================================
// 🚀 EXECUTION SIMULATION: MULTILINGUAL DASHBOARD RENDER
// ============================================================================

console.log(`\n🌐 [DDPM PLATFORM] Booting Global UI Engine...\n`);

const i18n = new EnterpriseI18nEngine('en-US');

// Scenario 1: New York Office (English)
console.log(`🇺🇸 US Frontend Output:`);
console.log(i18n.translate('welcome_message', { name: 'Alice' }));
console.log(i18n.translate('risk_high', { amount: i18n.formatCurrency(50000) }));

// Scenario 2: Tehran Office (Persian)
i18n.switchLanguage('fa-IR');
console.log(`\n🇮🇷 IR Frontend Output:`);
console.log(i18n.translate('welcome_message', { name: 'سورا' }));
console.log(i18n.translate('risk_high', { amount: i18n.formatCurrency(500000000) }));

// Scenario 3: Berlin Office (German)
i18n.switchLanguage('de-DE');
console.log(`\n🇩🇪 DE Frontend Output:`);
console.log(i18n.translate('button_deploy'));
console.log(i18n.translate('risk_high', { amount: i18n.formatCurrency(45000) }));
console.log("\n");
