/**
 * emits a toast event with title, description and type,
    * @param {string} title
    * @param {string} description
    * @param {string} type
    */
export default function toast({title, description, type}) {
    if(!title) title = 'Notification';
    if(!description) description = '';
    if(!type) type = 'neutral';
    document.dispatchEvent(new CustomEvent('toast', {detail: {title: title, description: description, type:type}}));
}
