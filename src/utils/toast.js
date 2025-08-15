/**
 * emits a toast event with title, description and type,
    * @param {string} title
    * @param {string} description
    * @param {string} type
    */
export default function toast(title, description, type) {
    document.dispatchEvent(new CustomEvent('toast', {detail: {title: title, description: description, type:type}}));
}
