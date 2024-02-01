/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
import {
    useFloating,
    inline,
    offset,
    shift,
    arrow,
    autoUpdate,
    useHover,
    useFocus,
    useClick,
    useDelayGroupContext,
    useDelayGroup,
    useInteractions,
    FloatingDelayGroup,
} from "@floating-ui/react-dom-interactions";

/**
 * @type {import("react").FC<{ content: string, placement?: 'top' | 'bottom' | 'right' | 'left', className?: string, triggers?: ('click' | 'hover' | 'focus')[] }>}
 */
export default function Tooltip({
    content,
    children,
    className,
    delay = [0, 0],
    placement = "top",
    triggers = ["hover", "click"],
}) {
    const { _delay, setCurrentId } = useDelayGroupContext();
    const [open, setOpen] = useState(false);
    const arrowRef = useRef(null);
    const {
        x,
        y,
        reference,
        floating,
        context,
        placement: floatingPlacement,
        middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    } = useFloating({
        placement,
        strategy: "absolute",
        middleware: [
            inline(),
            offset(10),
            shift({ padding: 2 }),
            arrow({ element: arrowRef, padding: 4 }),
        ],
        open,
        onOpenChange: (open) => (setOpen(open), open && setCurrentId(content)),
        whileElementsMounted: autoUpdate,
    });

    const { getFloatingProps } = useInteractions([
        useHover(context, {
            enabled: triggers.includes("hover"),
            move: false,
            delay: _delay,
        }),
        useFocus(context, { enabled: triggers.includes("focus") }),
        useClick(context, { enabled: triggers.includes("click") }),
    ]);
    useDelayGroup(context, { id: content });

    const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
    }[floatingPlacement.split("-")[0]];

    return (
        <FloatingDelayGroup delay={{ open: delay[0], close: delay[1] }}>
            <>
                <div ref={reference}>{children}</div>
                <div
                    {...getFloatingProps({
                        ref: floating,
                        className: `tooltip ${
                            open ? "tooltip-open" : ""
                        } ${className}`,
                        style: { top: y ?? 0, left: x ?? 0 },
                    })}
                >
                    {content}
                    <div
                        ref={arrowRef}
                        className="arrow"
                        style={{
                            top: arrowY ?? "",
                            left: arrowX ?? "",
                            right: "",
                            bottom: "",
                            [staticSide]: -4,
                        }}
                    />
                </div>
            </>
        </FloatingDelayGroup>
    );
}

export const Arrow = () => {};


