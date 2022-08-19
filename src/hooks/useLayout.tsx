import React, { useRef, useEffect, useState } from "react";

interface CSSSize {
    width: number;
    height: number;
}

interface PaddingOffset {
    hor?: number;
    ver?: number;
}

const useLayoutCSSSize = (
    offset?: PaddingOffset
): [CSSSize, React.RefObject<HTMLDivElement>] => {
    const layoutRef = useRef<HTMLDivElement>(null);
    const [layoutSize, setLayoutSize] = useState<CSSSize>({
        width: 0,
        height: 0,
    });
    const { current } = layoutRef;

    const getLayoutCSSSize = () => {
        if (layoutRef.current !== null) {
            setLayoutSize({
                width: layoutRef.current.clientWidth - (offset?.hor ?? 0),
                height: layoutRef.current.clientHeight - (offset?.ver ?? 0),
            });
        }
    };

    useEffect(() => {
        window.addEventListener("resize", getLayoutCSSSize);
        return () => {
            window.removeEventListener("resize", getLayoutCSSSize);
        };
    }, []);

    useEffect(() => {
        getLayoutCSSSize();
    }, [current]);

    useEffect(() => {
        console.log(`height: ${layoutSize.height}, width: ${layoutSize.width}`);
    }, [layoutSize]);

    return [layoutSize, layoutRef];
};

export default useLayoutCSSSize;
