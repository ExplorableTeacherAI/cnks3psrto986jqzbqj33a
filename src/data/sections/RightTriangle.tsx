import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineLinkedHighlight,
    InlineFormula,
} from "@/components/atoms";
import { Cartesian2D } from "@/components/atoms/visual/Cartesian2D";
import { useVar } from "@/stores";

/**
 * Visualization showing the right triangle formed by two points.
 * Highlights the horizontal leg, vertical leg, and hypotenuse.
 */
function RightTriangleVisualization() {
    const x1 = useVar("x1", 1) as number;
    const y1 = useVar("y1", 2) as number;
    const x2 = useVar("x2", 5) as number;
    const y2 = useVar("y2", 6) as number;
    const activeHighlight = useVar("triangleHighlight", "") as string;

    // The third point that completes the right triangle
    const cornerX = x2;
    const cornerY = y1;

    return (
        <Cartesian2D
            height={380}
            viewBox={{ x: [-10, 10], y: [-10, 10] }}
            highlightVarName="triangleHighlight"
            plots={[
                // Horizontal leg (base)
                {
                    type: "segment",
                    point1: [x1, y1],
                    point2: [cornerX, cornerY],
                    color: "#f97316",
                    weight: 3,
                    highlightId: "horizontal",
                },
                // Vertical leg (height)
                {
                    type: "segment",
                    point1: [cornerX, cornerY],
                    point2: [x2, y2],
                    color: "#8b5cf6",
                    weight: 3,
                    highlightId: "vertical",
                },
                // Hypotenuse (distance)
                {
                    type: "segment",
                    point1: [x1, y1],
                    point2: [x2, y2],
                    color: "#6366f1",
                    weight: 3,
                    highlightId: "hypotenuse",
                },
                // Right angle indicator
                {
                    type: "segment",
                    point1: [cornerX - 0.5, cornerY],
                    point2: [cornerX - 0.5, cornerY + 0.5],
                    color: "#94a3b8",
                    weight: 1,
                },
                {
                    type: "segment",
                    point1: [cornerX - 0.5, cornerY + 0.5],
                    point2: [cornerX, cornerY + 0.5],
                    color: "#94a3b8",
                    weight: 1,
                },
                // Points
                {
                    type: "point",
                    x: x1,
                    y: y1,
                    color: "#ef4444",
                },
                {
                    type: "point",
                    x: x2,
                    y: y2,
                    color: "#3b82f6",
                },
                {
                    type: "point",
                    x: cornerX,
                    y: cornerY,
                    color: "#94a3b8",
                },
            ]}
        />
    );
}

/**
 * Displays the horizontal distance (Δx) reactively.
 */
function HorizontalDistance() {
    const x1 = useVar("x1", 1) as number;
    const x2 = useVar("x2", 5) as number;
    const deltaX = Math.abs(x2 - x1);

    return (
        <span style={{ color: "#f97316", fontWeight: 600 }}>
            {deltaX}
        </span>
    );
}

/**
 * Displays the vertical distance (Δy) reactively.
 */
function VerticalDistance() {
    const y1 = useVar("y1", 2) as number;
    const y2 = useVar("y2", 6) as number;
    const deltaY = Math.abs(y2 - y1);

    return (
        <span style={{ color: "#8b5cf6", fontWeight: 600 }}>
            {deltaY}
        </span>
    );
}

/**
 * Right Triangle Connection Section Blocks
 *
 * Explains how the distance between two points forms a right triangle,
 * connecting to the Pythagorean theorem.
 */
export const rightTriangleBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-triangle-title" maxWidth="xl">
        <Block id="block-triangle-title" padding="md">
            <EditableH2 id="h2-triangle-title" blockId="block-triangle-title">
                The Hidden Right Triangle
            </EditableH2>
        </Block>
    </StackLayout>,

    // Explanation with linked highlights
    <SplitLayout key="layout-triangle-main" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="block-triangle-insight" padding="sm">
                <EditableParagraph id="para-triangle-insight" blockId="block-triangle-insight">
                    Here's the key insight: between any two points on a coordinate plane,
                    there's a hidden right triangle waiting to be discovered. The{" "}
                    <InlineLinkedHighlight
                        varName="triangleHighlight"
                        highlightId="hypotenuse"
                        color="#6366f1"
                    >
                        straight-line distance
                    </InlineLinkedHighlight>{" "}
                    we want to find is actually the{" "}
                    <InlineLinkedHighlight
                        varName="triangleHighlight"
                        highlightId="hypotenuse"
                        color="#6366f1"
                    >
                        hypotenuse
                    </InlineLinkedHighlight>{" "}
                    of this triangle.
                </EditableParagraph>
            </Block>
            <Block id="block-triangle-legs" padding="sm">
                <EditableParagraph id="para-triangle-legs" blockId="block-triangle-legs">
                    The two legs of this triangle are easy to measure. The{" "}
                    <InlineLinkedHighlight
                        varName="triangleHighlight"
                        highlightId="horizontal"
                        color="#f97316"
                    >
                        horizontal leg
                    </InlineLinkedHighlight>{" "}
                    measures the difference in x-coordinates: <HorizontalDistance /> units.
                    The{" "}
                    <InlineLinkedHighlight
                        varName="triangleHighlight"
                        highlightId="vertical"
                        color="#8b5cf6"
                    >
                        vertical leg
                    </InlineLinkedHighlight>{" "}
                    measures the difference in y-coordinates: <VerticalDistance /> units.
                </EditableParagraph>
            </Block>
            <Block id="block-triangle-pythagoras" padding="sm">
                <EditableParagraph id="para-triangle-pythagoras" blockId="block-triangle-pythagoras">
                    The Pythagorean theorem tells us that for any right triangle,
                    the square of the hypotenuse equals the sum of the squares of the
                    other two sides. This ancient relationship, known for over 2,500 years,
                    is exactly what we need.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="block-triangle-viz" padding="sm" hasVisualization>
            <RightTriangleVisualization />
        </Block>
    </SplitLayout>,

    // Pythagorean theorem formula
    <StackLayout key="layout-triangle-formula" maxWidth="xl">
        <Block id="block-triangle-formula" padding="lg">
            <div className="text-center py-4">
                <InlineFormula
                    latex="a^2 + b^2 = c^2"
                    colorMap={{}}
                />
            </div>
        </Block>
    </StackLayout>,

    // Connection to distance
    <StackLayout key="layout-triangle-connection" maxWidth="xl">
        <Block id="block-triangle-connection" padding="sm">
            <EditableParagraph id="para-triangle-connection" blockId="block-triangle-connection">
                In our triangle, the horizontal distance is one leg, the vertical distance
                is the other leg, and the direct distance between the points is the hypotenuse.
                By applying the Pythagorean theorem, we can calculate the exact distance
                even though it runs diagonally across the grid.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
