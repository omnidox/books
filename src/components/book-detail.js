import{html,css,PageViewElement,repeat,unsafeHTML,connect,updateMetadata,BookButtonStyle,favoriteIcon,favoriteBorderIcon,store,refreshPage,fetchBook,fetchFavorites,saveFavorite,book,bookSelector,favorites}from"./book-app.js";export{fetchBook}from"./book-app.js";export{fetchFavorites}from"./book-app.js";store.addReducers({book,favorites});class BookDetail extends connect(store)(PageViewElement){static get styles(){return[BookButtonStyle,css`
      :host {
        display: block;
        padding: 24px 16px;
      }

      section {
        max-width: 748px;
        box-sizing: border-box;
        font-weight: 300;
      }

      .info {
        display: flex;
        padding-bottom: 16px;
        border-bottom: 1px solid #c5c5c5;
      }

      .cover {
        position: relative;
      }

      .cover::after {
        content: '';
        display: block;
        padding-top: 160%;
        width: 100px;
      }

      .cover > book-image {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        margin: 0 auto;
      }

      .info-desc {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: 16px;
        font-size: 14px;
      }

      .flex {
        flex: 1;
      }

      .title {
        margin: 0 0 4px;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.2;
      }

      .info-item {
        padding-top: 8px;
      }

      .desc {
        padding: 8px 0;
        font-size: 15px;
        line-height: 1.8;
      }

      .desc > h3 {
        font-size: 15px;
        font-weight: 500;
      }

      .desc > ul {
        margin-bottom: 0;
      }

      book-rating {
        margin-right: 6px;
      }

      .rating-container {
        display: flex;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #c5c5c5;
        font-size: 14px;
      }

      .fav-btn-container,
      .preview-btn-container {
        padding-top: 16px;
      }

      .fav-btn-container {
        height: 32px;
      }

      .fav-button {
        display: flex;
        align-items: center;
        width: 156px;
        margin: 0 8px 0 0;
        padding: 0;
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        font-size: 12px;
        cursor: pointer;
      }

      .fav-button > svg {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }

      [hidden] {
        display: none !important;
      }

      /* desktop screen */
      @media (min-width: 648px) {
        :host {
          padding: 48px 24px 24px;
        }

        section {
          margin: 0 auto;
        }

        .info {
          padding-bottom: 24px;
        }

        .cover::after {
          width: 128px;
        }

        .info-desc {
          margin-left: 24px;
        }

        .title {
          margin-bottom: 8px;
          font-size: 24px;
          line-height: 1.3;
        }

        .fav-btn-container,
        .preview-btn-container {
          display: flex;
          justify-content: flex-end;
        }

        .preview-btn-container {
          padding-bottom: 24px;
        }

        .rating-container {
          padding: 24px 0;
        }

        .desc {
          padding: 16px 0;
        }
      }
      `]}render(){const{_item,_favorites,_lastVisitedListPage,_showOffline,_isSignedIn}=this;if(!_item){return}const info=_item.volumeInfo,accessInfo=_item.accessInfo,title=info.title,author=info.authors&&info.authors.join(", "),date=new Date(info.publishedDate).getFullYear(),pageCount=info.pageCount,rating=info.averageRating,ratingsCount=info.ratingsCount,publisher=info.publisher,thumbnail=info.imageLinks.thumbnail.replace("http","https").replace("&edge=curl",""),categories=info.categories||[],identifiers=info.industryIdentifiers||[],isFavorite=_favorites&&!!_favorites[_item.id];updateMetadata({title:`${title} - Books`,description:info.description,image:thumbnail});return html`
      <section ?hidden="${_showOffline}">
        <div class="info">
          <div class="cover" hero>
            <book-image .src="${thumbnail}" .alt="${title}"></book-image>
          </div>
          <div class="info-desc">
            <h2 class="title">${title}</h2>
            <div class="info-item" ?hidden="${!author}">${author} - ${date}</div>
            <div class="info-item" ?hidden="${!pageCount}" desktop>${pageCount} pages</div>
            <div class="info-item" ?hidden="${!publisher}" desktop>${publisher} - publisher</div>
            <div class="flex"></div>
            <div class="fav-btn-container" ?hidden="${"favorites"===_lastVisitedListPage}">
              <button class="fav-button" @click="${()=>store.dispatch(saveFavorite(_item,isFavorite))}" ?hidden="${!_isSignedIn}">
                ${isFavorite?favoriteIcon:favoriteBorderIcon} ${isFavorite?"Added to Favorites":"Add to Favorites"}
              </button>
            </div>
            <div class="preview-btn-container">
              <a href="/viewer/${_item.id}" class="book-button" ?hidden="${!accessInfo.embeddable}">PREVIEW</a>
            </div>
          </div>
        </div>
        <div class="rating-container">
          <book-rating .rating="${rating}"></book-rating>
          <span>(${ratingsCount||0} ${1==ratingsCount?"review":"reviews"})</span>
        </div>
        <div class="desc">
          <h3>Description</h3>
          ${unsafeHTML(info.description||info.subtitle||"None")}
        </div>
        <div class="desc" ?hidden="${0===categories.length}">
          <h3>Categories</h3>
          <ul>
            ${repeat(categories,item=>html`
              <li>${item}</li>
            `)}
          </ul>
        </div>
        <div class="desc" ?hidden="${0===identifiers.length}">
          <h3>ISBN</h3>
          <ul>
            ${repeat(identifiers,item=>html`
              <li>${item.type}: ${item.identifier}</li>
            `)}
          </ul>
        </div>
        <div class="desc">
          <h3>Additional Info</h3>
          <ul>
            <li>Country: ${accessInfo.country}</li>
            <li>Viewability: ${accessInfo.viewability}</li>
          </ul>
        </div>
      </section>

      <book-offline ?hidden="${!_showOffline}" @refresh="${()=>store.dispatch(refreshPage())}"></book-offline>
    `}static get properties(){return{_item:{type:Object},_favorites:{type:Object},_lastVisitedListPage:{type:Boolean},_showOffline:{type:Boolean},_isSignedIn:{type:Boolean}}}stateChanged(state){this._item=bookSelector(state);this._favorites=state.favorites&&state.favorites.items;this._lastVisitedListPage=state.app.lastVisitedListPage;this._showOffline=state.app.offline&&state.book.failure;this._isSignedIn=!!state.auth.user}}window.customElements.define("book-detail",BookDetail);var bookDetail={fetchBook:fetchBook,fetchFavorites:fetchFavorites};export{bookDetail as $bookDetail};