export function preventDefault(fn: (event: Event) => void) {
    return (event: Event) => {
        event.preventDefault();
        fn(event);
    };
}

export function stopPropagation(fn: (event: Event) => void) {
    return (event: Event) => {
        event.stopPropagation();
        fn(event);
    };
}
