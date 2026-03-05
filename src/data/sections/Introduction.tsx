import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableParagraph,
    InlineScrubbleNumber,
} from "@/components/atoms";
import { Cartesian2D } from "@/components/atoms/visual/Cartesian2D";
import { useVar } from "@/stores";
import {
    getVariableInfo,
    numberPropsFromDefinition,
} from "../variables";

/**
 * Reactive visualization that shows two draggable points and the distance between them.
 * Reads point coordinates from the global variable store.
 */
function DistanceVisualization() {
    const x1 = useVar("x1", 1) as number;
    const y1 = useVar("y1", 2) as number;
    const x2 = useVar("x2", 5) as number;
    const y2 = useVar("y2", 6) as number;

    // Calculate distance
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    return (
        <Cartesian2D
            height={380}
            viewBox={{ x: [-10, 10], y: [-10, 10] }}
            plots={[
                // The direct distance line
                {
                    type: "segment",
                    point1: [x1, y1],
                    point2: [x2, y2],
                    color: "#6366f1",
                    weight: 3,
                },
                // Point A
                {
                    type: "point",
                    x: x1,
                    y: y1,
                    color: "#ef4444",
                },
                // Point B
                {
                    type: "point",
                    x: x2,
                    y: y2,
                    color: "#3b82f6",
                },
            ]}
            movablePoints={[
                {
                    initial: [x1, y1],
                    color: "#ef4444",
                    constrain: (point) => [
                        Math.round(point[0]),
                        Math.round(point[1]),
                    ],
                },
                {
                    initial: [x2, y2],
                    color: "#3b82f6",
                    constrain: (point) => [
                        Math.round(point[0]),
                        Math.round(point[1]),
                    ],
                },
            ]}
            dynamicPlots={([p1, p2]) => {
                if (!p1 || !p2) return [];
                return [
                    {
                        type: "segment",
                        point1: p1,
                        point2: p2,
                        color: "#6366f1",
                        weight: 3,
                    },
                ];
            }}
        />
    );
}

/**
 * Component that displays the computed distance value reactively.
 */
function DistanceDisplay() {
    const x1 = useVar("x1", 1) as number;
    const y1 = useVar("y1", 2) as number;
    const x2 = useVar("x2", 5) as number;
    const y2 = useVar("y2", 6) as number;

    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    return (
        <span
            style={{
                color: "#6366f1",
                fontWeight: 600,
                fontSize: "1.1em",
            }}
        >
            {distance.toFixed(2)}
        </span>
    );
}

/**
 * Introduction Section Blocks
 *
 * Opens with a hook about finding exact distances, then presents
 * an interactive coordinate plane where students can drag two points.
 */
export const introductionBlocks: ReactElement[] = [
    // Title
    <StackLayout key="layout-intro-title" maxWidth="xl">
        <Block id="block-intro-title" padding="md">
            <EditableH1 id="h1-intro-title" blockId="block-intro-title">
                The Distance Formula
            </EditableH1>
        </Block>
    </StackLayout>,

    // Hook paragraph
    <StackLayout key="layout-intro-hook" maxWidth="xl">
        <Block id="block-intro-hook" padding="sm">
            <EditableParagraph id="para-intro-hook" blockId="block-intro-hook">
                Imagine you're looking at a city map. You can see two locations marked on it,
                and you want to know exactly how far apart they are. Not the walking distance
                along the streets, but the straight-line distance, as the crow flies. How would
                you measure that? It turns out there's a beautiful connection between this everyday
                question and one of the oldest theorems in mathematics.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive visualization with description
    <SplitLayout key="layout-intro-interactive" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="block-intro-explanation" padding="sm">
                <EditableParagraph id="para-intro-explanation" blockId="block-intro-explanation">
                    On the coordinate plane, point A sits at ({" "}
                    <InlineScrubbleNumber
                        varName="x1"
                        {...numberPropsFromDefinition(getVariableInfo("x1"))}
                    />
                    ,{" "}
                    <InlineScrubbleNumber
                        varName="y1"
                        {...numberPropsFromDefinition(getVariableInfo("y1"))}
                    />{" "}
                    ) and point B sits at ({" "}
                    <InlineScrubbleNumber
                        varName="x2"
                        {...numberPropsFromDefinition(getVariableInfo("x2"))}
                    />
                    ,{" "}
                    <InlineScrubbleNumber
                        varName="y2"
                        {...numberPropsFromDefinition(getVariableInfo("y2"))}
                    />{" "}
                    ). The straight-line distance between them is exactly{" "}
                    <DistanceDisplay /> units.
                </EditableParagraph>
            </Block>
            <Block id="block-intro-question" padding="sm">
                <EditableParagraph id="para-intro-question" blockId="block-intro-question">
                    But how do we calculate this distance? We can't just count grid squares
                    because the line cuts diagonally across them. The answer lies in a theorem
                    you may already know: the Pythagorean theorem.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="block-intro-viz" padding="sm" hasVisualization>
            <DistanceVisualization />
        </Block>
    </SplitLayout>,
];
