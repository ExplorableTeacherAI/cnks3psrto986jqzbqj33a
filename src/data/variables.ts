/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 *
 * USAGE:
 * 1. Define variables here with their default values and metadata
 * 2. Use them in any section with: const x = useVar('variableName', defaultValue)
 * 3. Update them with: setVar('variableName', newValue)
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

/**
 * =====================================================
 * 🎯 DISTANCE FORMULA LESSON VARIABLES
 * =====================================================
 */
export const variableDefinitions: Record<string, VariableDefinition> = {
    // ─────────────────────────────────────────
    // SECTION 1: Introduction - Point Coordinates
    // ─────────────────────────────────────────
    x1: {
        defaultValue: 1,
        type: 'number',
        label: 'x₁',
        description: 'x-coordinate of point A',
        min: -8,
        max: 8,
        step: 1,
        color: '#ef4444', // red
    },
    y1: {
        defaultValue: 2,
        type: 'number',
        label: 'y₁',
        description: 'y-coordinate of point A',
        min: -8,
        max: 8,
        step: 1,
        color: '#ef4444', // red
    },
    x2: {
        defaultValue: 5,
        type: 'number',
        label: 'x₂',
        description: 'x-coordinate of point B',
        min: -8,
        max: 8,
        step: 1,
        color: '#3b82f6', // blue
    },
    y2: {
        defaultValue: 6,
        type: 'number',
        label: 'y₂',
        description: 'y-coordinate of point B',
        min: -8,
        max: 8,
        step: 1,
        color: '#3b82f6', // blue
    },

    // ─────────────────────────────────────────
    // SECTION 2: Right Triangle Connection
    // ─────────────────────────────────────────
    showTriangle: {
        defaultValue: false,
        type: 'boolean',
        label: 'Show Triangle',
        description: 'Toggle to show/hide the right triangle',
    },
    triangleHighlight: {
        defaultValue: '',
        type: 'linkedHighlight',
        label: 'Triangle Part Highlight',
        description: 'Active highlight for triangle parts',
        color: '#8b5cf6',
    },

    // ─────────────────────────────────────────
    // SECTION 3: Distance Formula
    // ─────────────────────────────────────────
    deltaX: {
        defaultValue: 4,
        type: 'number',
        label: 'Δx',
        description: 'Horizontal distance (x2 - x1)',
        color: '#f97316', // orange
    },
    deltaY: {
        defaultValue: 4,
        type: 'number',
        label: 'Δy',
        description: 'Vertical distance (y2 - y1)',
        color: '#8b5cf6', // violet
    },

    // ─────────────────────────────────────────
    // SECTION 4: Practice Questions
    // ─────────────────────────────────────────
    answer_horizontal_distance: {
        defaultValue: '',
        type: 'text',
        label: 'Horizontal Distance Answer',
        correctAnswer: '4',
        placeholder: '?',
        color: '#f97316',
    },
    answer_vertical_distance: {
        defaultValue: '',
        type: 'text',
        label: 'Vertical Distance Answer',
        correctAnswer: '4',
        placeholder: '?',
        color: '#8b5cf6',
    },
    answer_distance_squared: {
        defaultValue: '',
        type: 'text',
        label: 'Distance Squared Answer',
        correctAnswer: '32',
        placeholder: '?',
        color: '#3cc499',
    },
    answer_final_distance: {
        defaultValue: '',
        type: 'text',
        label: 'Final Distance Answer',
        correctAnswer: '5.66',
        placeholder: '?',
        color: '#6366f1',
    },
    answer_practice_1: {
        defaultValue: '',
        type: 'text',
        label: 'Practice 1 Answer',
        correctAnswer: '5',
        placeholder: '?',
        color: '#3b82f6',
    },
    answer_practice_2: {
        defaultValue: '',
        type: 'text',
        label: 'Practice 2 Answer',
        correctAnswer: '10',
        placeholder: '?',
        color: '#3b82f6',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze input props for InlineClozeInput from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 * Extracts the `color` field.
 *
 * @example
 * <InlineSpotColor
 *     varName="radius"
 *     {...spotColorPropsFromDefinition(getVariableInfo('radius'))}
 * >
 *     radius
 * </InlineSpotColor>
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 * Extracts the `color` and `bgColor` fields.
 *
 * @example
 * <InlineLinkedHighlight
 *     varName="activeHighlight"
 *     highlightId="radius"
 *     {...linkedHighlightPropsFromDefinition(getVariableInfo('activeHighlight'))}
 * >
 *     radius
 * </InlineLinkedHighlight>
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 *
 * Takes an array of variable names and returns the config map expected by
 * `<FormulaBlock variables={...} />`.
 *
 * @example
 * import { scrubVarsFromDefinitions } from './variables';
 *
 * <FormulaBlock
 *     latex="\scrub{mass} \times \scrub{accel}"
 *     variables={scrubVarsFromDefinitions(['mass', 'accel'])}
 * />
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
