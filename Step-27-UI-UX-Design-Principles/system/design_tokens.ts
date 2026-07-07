/**
 * Architecture: Enterprise Design System (Design Tokens)
 * Domain: UI/UX Engineering
 * Objective: Enforcing UI consistency, Accessibility (a11y), and Theming at the compiler level.
 */

// 1. Spacing System (Based on 8pt Grid Principle for Cognitive Consistency)
export const Spacing = {
    xxs: '4px',
    xs: '8px',
    sm: '16px',
    md: '24px',   // Default padding for interactive components
    lg: '32px',
    xl: '48px',
    xxl: '64px',
} as const;

// 2. Color Palette & Semantic Meaning (UX Psychology)
// Ensuring minimum 4.5:1 contrast ratio for WCAG 2.1 AA compliance
export const SemanticColors = {
    primary: {
        base: '#0A58CA',    // Actionable items (Buttons, Links)
        hover: '#084298',   // Visual feedback on interaction
        surface: '#E7F1FF', // Background for primary-focused containers
    },
    feedback: {
        success: '#198754', // Positive reinforcement
        warning: '#FFC107', // Cautionary actions
        critical: '#DC3545',// Destructive actions (e.g., Delete Project)
    },
    surface: {
        background: '#F8F9FA', // Low cognitive load background
        textPrimary: '#212529',// High contrast for readability
        textMuted: '#6C757D',  // Secondary information
    }
} as const;

// 3. Typography Hierarchy (Information Architecture)
export const Typography = {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    scale: {
        h1: { fontSize: '2.5rem', lineHeight: '1.2', fontWeight: 700 }, // Page Titles
        h2: { fontSize: '2.0rem', lineHeight: '1.3', fontWeight: 600 }, // Section Headers
        bodyMain: { fontSize: '1rem', lineHeight: '1.5', fontWeight: 400 }, // Standard Text
        caption: { fontSize: '0.875rem', lineHeight: '1.4', fontWeight: 400 }, // Helper Text
    }
} as const;

// 4. Type Definitions for Strict Engineering Enforcement
export type ThemeSpacing = keyof typeof Spacing;
export type ThemeColors = keyof typeof SemanticColors;
export type ThemeTypography = keyof typeof Typography.scale;
