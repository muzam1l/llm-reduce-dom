"use client";

type SimplifiedElement = {
    role: string;
    text?: string;
    children?: SimplifiedElement[];
} | string

export const simplifyHTML = (html: string): SimplifiedElement | undefined => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const root = doc.querySelector("main") || doc.body
    return simplifyElement(root);
}


const roleMaps: Record<string, string> = {
    'ul': 'list',
    'ol': 'list',
    'a': 'link',
    'textarea': 'input',
}
export const simplifyElement = (element: Node): SimplifiedElement | undefined => {
    if (!shouldBeVisible(element)) {
        return
    }

    if (element instanceof Text) {
        return element.textContent?.trim()
    }

    if (element.getAttribute("aria-label")) {
        return element.getAttribute("aria-label") || undefined
    }

    const role = element.getAttribute("aria-role") || element.getAttribute("role") || element.tagName.toLowerCase()
    let children: SimplifiedElement[] = [];
    for (let node of element.childNodes) {
        const child = simplifyElement(node);
        if (child) {
            children.push(child);
        }
    }
    if (role === "header") {
        console.log('header', element, children)
    }
    if (!children.length) {
        return
    }

    if (children.length === 1) {
        return children[0]
    }
    return {
        role: roleMaps[role] || role,
        children: children,
    };
}

const hiddenTags = ['script', 'svg', 'style', 'meta', 'head', 'noscript', 'iframe', 'audio', 'video', 'canvas', 'map', 'object', 'embed', 'param', 'source', 'track', 'wbr', 'br', 'legend', 'meter', 'progress', 'slot', 'template', 'applet', 'basefont', 'bgsound', 'command', 'font', 'frame', 'frameset', 'image', 'isindex', 'keygen', 'menu', 'noembed', 'noframes', 'shadow', 'spacer']

export const shouldBeVisible = (node: Node): node is Element | Text => {
    if (!(node instanceof Element) && !(node instanceof Text)) {
        return false
    }

    if (!node.textContent?.trim()) {
        return false
    }

    if (hiddenTags.includes(node.nodeName.toLowerCase())) {
        return false
    }

    if (node instanceof Element) {
        if (node.getAttribute("aria-hidden") === 'true') {
            return false
        }
        if (node.getAttribute("hidden") !== null) {
            return false
        }
    }

    return true
}