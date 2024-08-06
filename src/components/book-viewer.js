import{html,css,PageViewElement,connect,updateMetadata,store,fetchBook,book,bookSelector}from"./book-app.js";export{fetchBook}from"./book-app.js";store.addReducers({book});let initCalled;const callbackPromise=new Promise(r=>window.__initGoogleBooks=r);function loadGoogleBooks(){if(!initCalled){const script=document.createElement("script");script.src="//www.google.com/books/api.js?callback=__initGoogleBooks";document.head.appendChild(script);initCalled=!0}return callbackPromise}class BookViewer extends connect(store)(PageViewElement){static get styles(){return[css`
      :host {
        display: block;
      }

      #viewer {
        width: 100%;
        height: 100%;
      }

      #viewer > div > div > div:nth-child(2) {
        display: none;
      }

      #viewer .overflow-scrolling {
        -webkit-overflow-scrolling: touch;
      }
      `]}render(){const{_item}=this;if(_item){const info=_item.volumeInfo;updateMetadata({title:`${info.title} - Books`,description:info.description,image:info.imageLinks.thumbnail.replace("http","https")})}return html`
      <div id="viewer"></div>
    `}static get properties(){return{_bookId:{type:String},_item:{type:Object}}}stateChanged(state){this._bookId=state.book.id;this._item=bookSelector(state)}updated(changedProps){if((changedProps.has("active")||changedProps.has("_bookId"))&&this.active&&this._bookId){loadGoogleBooks().then(()=>{this._viewer=new google.books.DefaultViewer(this.shadowRoot.querySelector("#viewer"));this._viewer.load(this._bookId)})}}}window.customElements.define("book-viewer",BookViewer);var bookViewer={fetchBook:fetchBook};export{bookViewer as $bookViewer};