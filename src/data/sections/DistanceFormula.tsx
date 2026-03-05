import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineFormula,
    InlineSpotColor,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { useVar } from "@/stores";

/**
 * Displays the step-by-step calculation with current values.
 */
function CalculationSteps() {
    const x1 = useVar("x1", 1) as number;
    const y1 = useVar("y1", 2) as number;
    const x2 = useVar("x2", 5) as number;
    const y2 = useVar("y2", 6) as number;

    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const deltaXSquared = deltaX * deltaX;
    const deltaYSquared = deltaY * deltaY;
    const sumSquares = deltaXSquared + deltaYSquared;
    const distance = Math.sqrt(sumSquares);

    return (
        <div className="space-y-3 py-4 px-6 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-600 w-32">Horizontal:</span>
                <span style={{ color: "#f97316", fontWeight: 500 }}>
                    {x2} − {x1} = {deltaX}
                </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-600 w-32">Vertical:</span>
                <span style={{ color: "#8b5cf6", fontWeight: 500 }}>
                    {y2} − {y1} = {deltaY}
                </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-600 w-32">Sum of squares:</span>
                <span style={{ color: "#3cc499", fontWeight: 500 }}>
                    {deltaX}² + {deltaY}² = {deltaXSquared} + {deltaYSquared} = {sumSquares}
                </span>
            </div>
            <div className="flex items-center gap-2 text-sm border-t border-slate-200 pt-3">
                <span className="text-slate-600 w-32">Distance:</span>
                <span style={{ color: "#6366f1", fontWeight: 600, fontSize: "1.1em" }}>
                    √{sumSquares} = {distance.toFixed(2)}
                </span>
            </div>
        </div>
    );
}

/**
 * Distance Formula Section Blocks
 *
 * Derives and presents the distance formula, showing the calculation
 * step by step with the current point values.
 */
export const distanceFormulaBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-formula-title" maxWidth="xl">
        <Block id="block-formula-title" padding="md">
            <EditableH2 id="h2-formula-title" blockId="block-formula-title">
                The Distance Formula
            </EditableH2>
        </Block>
    </StackLayout>,

    // Derivation explanation
    <StackLayout key="layout-formula-derivation" maxWidth="xl">
        <Block id="block-formula-derivation" padding="sm">
            <EditableParagraph id="para-formula-derivation" blockId="block-formula-derivation">
                Starting from the Pythagorean theorem, we can derive a formula that works
                for any two points. If point A is at coordinates (
                <InlineSpotColor varName="x1" color="#ef4444">x₁</InlineSpotColor>,{" "}
                <InlineSpotColor varName="y1" color="#ef4444">y₁</InlineSpotColor>) and
                point B is at (
                <InlineSpotColor varName="x2" color="#3b82f6">x₂</InlineSpotColor>,{" "}
                <InlineSpotColor varName="y2" color="#3b82f6">y₂</InlineSpotColor>), then
                the horizontal distance is{" "}
                <InlineSpotColor varName="deltaX" color="#f97316">x₂ − x₁</InlineSpotColor>{" "}
                and the vertical distance is{" "}
                <InlineSpotColor varName="deltaY" color="#8b5cf6">y₂ − y₁</InlineSpotColor>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The formula itself
    <StackLayout key="layout-formula-main" maxWidth="xl">
        <Block id="block-formula-main" padding="lg">
            <FormulaBlock
                latex="d = \sqrt{(\clr{dx}{x_2 - x_1})^2 + (\clr{dy}{y_2 - y_1})^2}"
                colorMap={{
                    dx: "#f97316",
                    dy: "#8b5cf6",
                }}
            />
        </Block>
    </StackLayout>,

    // Explanation of formula parts
    <StackLayout key="layout-formula-parts" maxWidth="xl">
        <Block id="block-formula-parts" padding="sm">
            <EditableParagraph id="para-formula-parts" blockId="block-formula-parts">
                This formula captures the entire process in one expression: subtract the
                x-coordinates and square the result, subtract the y-coordinates and square
                that result, add those two squares together, and finally take the square root.
                The square root "undoes" the squaring from the Pythagorean theorem, giving us
                the actual distance rather than its square.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Live calculation
    <StackLayout key="layout-formula-calculation" maxWidth="xl">
        <Block id="block-formula-calculation" padding="md">
            <EditableParagraph id="para-formula-calculation-intro" blockId="block-formula-calculation">
                With the current point positions, the calculation unfolds like this:
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-formula-steps" maxWidth="xl">
        <Block id="block-formula-steps" padding="sm">
            <CalculationSteps />
        </Block>
    </StackLayout>,

    // Key insight
    <StackLayout key="layout-formula-insight" maxWidth="xl">
        <Block id="block-formula-insight" padding="sm">
            <EditableParagraph id="para-formula-insight" blockId="block-formula-insight">
                Notice that the formula always gives a positive result, regardless of which
                point you call A and which you call B. Squaring eliminates any negative signs,
                and the square root of a sum of squares is always positive. Distance, after all,
                is never negative.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
