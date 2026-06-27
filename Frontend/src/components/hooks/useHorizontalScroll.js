import { useEffect, useRef } from 'react';

export const useHorizontalScroll = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // --- 1. INSTANT MOUSE WHEEL LOGIC ---
        const onWheel = (e) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            // Real-time bina jhatke ke scroll ke liye direct += operation
            el.scrollLeft += e.deltaY * 1.0;
        };
        el.addEventListener('wheel', onWheel, { passive: false });

        // --- 2. REAL-TIME MOUSE CLICK & DRAG LOGIC ---
        let isDown = false;
        let startX;
        let scrollLeft;

        const onMouseDown = (e) => {
            isDown = true;
            startX = e.pageX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
        };

        const onMouseLeave = () => {
            isDown = false;
        };

        const onMouseUp = () => {
            isDown = false;
        };

        const onMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            // 1-to-1 immediate movement ke liye multiplier 1.2 best hai
            const walk = (x - startX) * 1.2;
            el.scrollLeft = scrollLeft - walk;
        };

        // Events Attach Karein
        el.addEventListener('mousedown', onMouseDown);
        el.addEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseup', onMouseUp);
        el.addEventListener('mousemove', onMouseMove);

        // Cleanup (Memory safety)
        return () => {
            el.removeEventListener('wheel', onWheel);
            el.removeEventListener('mousedown', onMouseDown);
            el.removeEventListener('mouseleave', onMouseLeave);
            el.removeEventListener('mouseup', onMouseUp);
            el.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    // Yeh ref hum component ke div par lagayenge
    return scrollRef;
};