import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineClozeInput,
} from "@/components/atoms";
import { BlockFeedback } from "@/components/organisms";
import {
    getVariableInfo,
    clozePropsFromDefinition,
} from "../variables";

/**
 * Practice Section Blocks
 *
 * Contains assessment questions with inline feedback to check
 * student understanding of the distance formula.
 */
export const practiceBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-practice-title" maxWidth="xl">
        <Block id="block-practice-title" padding="md">
            <EditableH2 id="h2-practice-title" blockId="block-practice-title">
                Check Your Understanding
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction to practice
    <StackLayout key="layout-practice-intro" maxWidth="xl">
        <Block id="block-practice-intro" padding="sm">
            <EditableParagraph id="para-practice-intro" blockId="block-practice-intro">
                Let's apply the distance formula to some concrete examples.
                For these questions, we'll find the distance between points
                A(0, 0) and B(3, 4).
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 1: Find distance for (0,0) to (3,4)
    <StackLayout key="layout-practice-q1" maxWidth="xl">
        <Block id="block-practice-q1" padding="md">
            <BlockFeedback
                varName="answer_practice_1"
                correctValue="5"
                successMessage="Exactly right! The distance from (0,0) to (3,4) is 5 units. This is one of the most famous right triangles in mathematics: the 3-4-5 triangle."
                failureMessage="Not quite. Remember the formula: d = √((x₂−x₁)² + (y₂−y₁)²)."
                hint="With points at (0,0) and (3,4), the calculation is √(3² + 4²) = √(9 + 16) = √25. What's the square root of 25? Review"
                reviewBlockId="block-formula-main"
                reviewLabel="the distance formula."
            >
                <EditableParagraph id="para-practice-q1" blockId="block-practice-q1">
                    For points A(0, 0) and B(3, 4), the horizontal distance is 3 and
                    the vertical distance is 4. Using the distance formula, d = √(3² + 4²) = √(9 + 16) = √25 ={" "}
                    <InlineClozeInput
                        varName="answer_practice_1"
                        correctAnswer="5"
                        {...clozePropsFromDefinition(getVariableInfo("answer_practice_1"))}
                    />{" "}
                    units.
                </EditableParagraph>
            </BlockFeedback>
        </Block>
    </StackLayout>,

    // Question 2: Harder example
    <StackLayout key="layout-practice-q2" maxWidth="xl">
        <Block id="block-practice-q2" padding="md">
            <BlockFeedback
                varName="answer_practice_2"
                correctValue="10"
                successMessage="Perfect! You've mastered the distance formula. Notice this is just the 3-4-5 triangle scaled up by a factor of 2: the 6-8-10 triangle."
                failureMessage="Take another look at the calculation."
                hint="The horizontal distance is |8−2| = 6 and the vertical distance is |9−1| = 8. So d = √(6² + 8²) = √(36 + 64) = √100. Review"
                reviewBlockId="block-formula-main"
                reviewLabel="the distance formula."
            >
                <EditableParagraph id="para-practice-q2" blockId="block-practice-q2">
                    Now find the distance between points C(2, 1) and D(8, 9).
                    The horizontal distance is |8−2| = 6 and the vertical distance is |9−1| = 8.
                    The distance is √(6² + 8²) = √(36 + 64) = √100 ={" "}
                    <InlineClozeInput
                        varName="answer_practice_2"
                        correctAnswer="10"
                        {...clozePropsFromDefinition(getVariableInfo("answer_practice_2"))}
                    />{" "}
                    units.
                </EditableParagraph>
            </BlockFeedback>
        </Block>
    </StackLayout>,

    // Closing insight
    <StackLayout key="layout-practice-closing" maxWidth="xl">
        <Block id="block-practice-closing" padding="sm">
            <EditableParagraph id="para-practice-closing" blockId="block-practice-closing">
                The distance formula is one of the most useful tools in coordinate geometry.
                It connects algebra to geometry, letting us calculate precise measurements
                from numerical coordinates. Every time you use a map app to find the
                straight-line distance between two places, this ancient theorem from
                Pythagoras is working behind the scenes.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
