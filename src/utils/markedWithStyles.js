import { marked } from "marked";
const styleRenderer = new marked.Renderer();

styleRenderer.heading = function(token) {
    let className = '';
    if(token.depth === 1) {
        className = 'text-6xl'
    }
    if(token.depth === 2) {
        className = 'text-5xl'
    }
    if(token.depth === 3) {
        className = 'text-4xl'
    }
    if(token.depth === 4) {
        className = 'text-3xl'
    }
    if(token.depth === 5) {
        className = 'text-2xl'
    }
    if(token.depth === 6) {
        className = 'text-xl'
    }
    return `<h${token.depth} class='${className} capitalize font-semibold'>${token.text}</h${token.depth}>`
}
styleRenderer.listitem = (token) => {
    const innerHtml = this.parser.inlineTokens(token.tokens)
    return `<li>${innerHtml}</li>`
}
styleRenderer.list = (token) => {
    const innerHtml = this.parser.inlineTokens(token.tokens)
    const ele = ordered ? 'ol' : 'ul';
    return `<${ele} class=''>${innerHtml}</${ele}>`
}
styleRenderer.blockquote = function() {
}

export default styleRenderer;
