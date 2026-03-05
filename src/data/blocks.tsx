import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import all sections
import { introductionBlocks } from "./sections/Introduction";
import { rightTriangleBlocks } from "./sections/RightTriangle";
import { distanceFormulaBlocks } from "./sections/DistanceFormula";
import { practiceBlocks } from "./sections/Practice";

/**
 * ------------------------------------------------------------------
 * DISTANCE FORMULA LESSON
 * ------------------------------------------------------------------
 *
 * This interactive lesson teaches the distance formula by connecting
 * it to the Pythagorean theorem. Students can drag points on a
 * coordinate plane and see how the distance calculation changes.
 *
 * SECTIONS:
 * 1. Introduction - Hook with draggable points
 * 2. Right Triangle Connection - Shows the hidden triangle
 * 3. Distance Formula - Derives and explains the formula
 * 4. Practice - Assessment questions with feedback
 */
export const blocks: ReactElement[] = [
    ...introductionBlocks,
    ...rightTriangleBlocks,
    ...distanceFormulaBlocks,
    ...practiceBlocks,
];
