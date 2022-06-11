class Modal extends HTMLElement {
    constructor() {
      super();
  
      this.attachShadow({mode:"open"});
      this.shadowRoot.innerHTML = `
        <style>
          #backdrop {
            backdrop-filter: blur(7px);
            background: rgba(0,0,0,0.7);
            bottom: 0;
            left: 0;
            opacity: 0;
            pointer-events: none;
            position: fixed;
            right: 0;
            top: 0;
            transition: all ease-in-out 0.1s;
            z-index: -1;
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
          }
  
          #modal {
            transition: all ease-in-out 0.25s 0.1s;
            opacity: 0;
            position:fixed;
            border-radius: 3px;
            filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
            pointer-events: none;
            margin: 1em;
          }
  
          #closeButton {
            align-items: center;
            background-color: #000;
            background-color: rgba(0,0,0,0.25);
            border-radius: 50%;
            border: none;
            color: #fff;
            color: rgba(255,255,255,0.8);
            cursor: pointer;
            display: flex;
            height: 25px;
            justify-content: center;
            position: absolute;
            right: 10px;
            top: 10px;
            transition: all 0.5s ease-in-out;
            width: 25px;
            z-index: 101;
          }
  
          #closeButton:hover {
            background-color: #000;
            background-color: rgba(0,0,0,0.5);
            color: #fff;
          }
  
          #closeButton > svg {
            height: 25px;
            margin-left: 1px;
            width: 25px;
          }
  
          :host([opened]) #backdrop,
          :host([opened]) #modal {
            opacity: 1;
            pointer-events: all;
            z-index: 100;
          }
  
        </style>
        <div id="backdrop">
            <div id="modal">
              <slot></slot>
              <button id="closeButton">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"/></svg>
              </button>
            </div>
        </div>
      `;
  
  
      const closeButton = this.shadowRoot.getElementById('closeButton');
      const backDrop = this.shadowRoot.getElementById('backdrop');
      closeButton.addEventListener('click', this._closeButtonPressed.bind(this));
      backDrop.addEventListener('click', this._backdropPressed.bind(this), );
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "opened") {
        if (this.hasAttribute('opened')) {
          this.isOpen = true;
        } else {
          this.isOpen = false;
        }
      }
    }
  
    static get observedAttributes() {
      return ['opened'];
    }
  
    open() {
      this.setAttribute('opened', '');
      this.isOpen = true;
    }
  
    close(event) {
      if (this.hasAttribute('opened')) {
        this.removeAttribute('opened');
      }
      this.isOpen = false;
    }
  
    _closeButtonPressed(event) {
      this.close();
      const closeButtonEvent = new Event('closeButton', {bubbles:true, composed:true});
      event.target.dispatchEvent(closeButtonEvent);
    }
    
    _backdropPressed(event) {
      if(event.target == event.currentTarget) {
          this.close();
      }
    }
  }
  
  window.customElements.define('modal-popup', Modal);
  