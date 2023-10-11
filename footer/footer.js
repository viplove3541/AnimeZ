class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer class="footer p-5" style="display: none;">
        <div class="content has-text-centered">
          <p>
            <strong><a href="#">AnimeZ...</a></strong> Stream for free without ads! The source code is by <a
              target="_blank" href="https://github.com/viplove3541">Viplove Kale</a>. Credits to consumet.org for the API.
          </p>
        </div>
      </footer>
        `;
  }
}

customElements.define("app-footer", Footer); // component to use navbar
