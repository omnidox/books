import{html,css,updateMetadata,PageViewElement}from"./book-app.js";class Book404 extends PageViewElement{static get styles(){return[css`
      :host {
        padding: 16px;
        text-align: center;
        line-height: 1.5;
      }
      `]}render(){updateMetadata({title:`Page Not Found - Books`,description:"Page not found"});return html`
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>The page you're looking for doesn't seem to exist. Head back
           <a href="/">home</a> and try again?
        </p>
      </section>
    `}}window.customElements.define("book-404",Book404);