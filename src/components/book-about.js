import{html,css,PageViewElement,updateMetadata}from"./book-app.js";class BookAbout extends PageViewElement{static get styles(){return[css`
      :host {
        padding: 16px;
        text-align: center;
        line-height: 1.5;
      }
      `]}render(){updateMetadata({title:"About - Books",description:"About page"});return html`
      <p>Google Books PWA</p>
      <p><a href="http://books.google.com" target="_blank" rel="noopener">Visit the regular Google Books site</a></p>
    `}}window.customElements.define("book-about",BookAbout);