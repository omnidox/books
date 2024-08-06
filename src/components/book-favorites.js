import{html,css,PageViewElement,repeat,connect,updateMetadata,BookButtonStyle,closeIcon,store,refreshPage,signIn,fetchFavorites,saveFavorite,favorites,favoriteListSelector}from"./book-app.js";export{fetchFavorites}from"./book-app.js";store.addReducers({favorites});class BookFavorites extends connect(store)(PageViewElement){static get styles(){return[BookButtonStyle,css`
      :host {
        display: block;
      }

      .books {
        max-width: 432px;
        margin: 0 auto;
        padding: 8px;
        box-sizing: border-box;
        /* remove margin between inline-block nodes */
        font-size: 0;
      }

      li {
        display: inline-block;
        position: relative;
        width: calc(100% - 16px);
        max-width: 400px;
        min-height: 240px;
        margin: 8px;
        font-size: 14px;
        vertical-align: top;
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        list-style: none;
      }

      li::after {
        content: '';
        display: block;
        padding-top: 65%;
      }

      h3 {
        text-align: center;
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 0;
      }

      .signin-section {
        text-align: center;
      }

      .fav-button {
        width: 32px;
        height: 32px;
        padding: 2px;
        margin: 0;
        border: 2px solid;
        background: transparent;
        -webkit-appearance: none;
        cursor: pointer;
      }

      .fav-button > svg {
        width: 24px;
        height: 24px;
      }

      .favorites-empty {
        text-align: center;
      }

      [hidden] {
        display: none !important;
      }

      /* Wide Layout */
      @media (min-width: 648px) {
        li {
          height: 364px;
        }
      }

      /* Wider layout: 2 columns */
      @media (min-width: 872px) {
        .books {
          width: 832px;
          max-width: none;
          padding: 16px 0;
        }
      }
      `]}render(){const{_items,_authInitialized,_user,_showOffline}=this;updateMetadata({title:"My Favorites - Books",description:"My Favorites"});return html`
      <section ?hidden="${_showOffline}">
        <div class="favorites-section" ?hidden="${!_authInitialized||!_user}">
          <div class="favorites-empty" ?hidden="${!_authInitialized||!_items||_items.length}">
            <h3>Your favorites are empty</h3>
            <p>Go <a href="/explore">find some books</a> and add to your favorites</p>
          </div>
          <ul class="books">
            ${_items&&repeat(_items,item=>html`
              <li>
                <book-item .item="${item}">
                  <button class="fav-button" title="Remove favorite" @click="${e=>this._removeFavorite(e,item)}">${closeIcon}</button>
                </book-item>
              </li>
            `)}
          </ul>
        </div>

        <div class="signin-section" ?hidden="${!_authInitialized||_user}">
          <p>Please sign in to see the favorites.</p>
          <button class="book-button" @click="${()=>store.dispatch(signIn())}">Sign in</button>
        </div>
      </section>

      <book-offline ?hidden="${!_showOffline}" @refresh="${()=>store.dispatch(refreshPage())}"></book-offline>
    `}static get properties(){return{_items:{type:Array},_authInitialized:{type:Boolean},_user:{type:Object},_showOffline:{type:Boolean}}}stateChanged(state){this._items=favoriteListSelector(state);this._authInitialized=state.auth.initialized;this._user=state.auth.user;this._showOffline=state.app.offline&&state.favorites.failure}_removeFavorite(e,item){e.preventDefault();store.dispatch(saveFavorite(item,!0))}}window.customElements.define("book-favorites",BookFavorites);var bookFavorites={fetchFavorites:fetchFavorites};export{bookFavorites as $bookFavorites};