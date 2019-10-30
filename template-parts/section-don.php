<section class="don wow fadeIn" data-wow-duration="1s"  data-wow-delay="0s">
  <div class="wrapper">

    <header class="don__header">
      <svg class="don__logo-decouvreur wow fadeIn"data-wow-duration="1s" data-wow-delay="0s">
        <use xlink:href='#logo-decouvreur'></use></svg>
      <h2 class="don__title wow fadeInUp" data-wow-duration="1s" data-wow-delay="0s">Rejoignez les découvreurs d’espoir 2019 <a href="<?= _l('url_don'); ?>" target="_blank">en faisant un don avant le 31 décembre 2019</a></h2>
      <p class="don__subtitle wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">et bénéficiez de vos avantages fiscaux.</p>
    </header>

    <div class="don__choices">

      <div class="don__choice" data-amount="50">
        <span class="don__choice__digit">50€</span>
        <p>soit <strong>17 €</strong> après la déduction fiscale</p>
        <div class="don__choice__shadow"></div>
      </div>

      <div class="don__choice" data-amount="80">
        <span class="don__choice__digit">80€</span>
        <p>soit <strong>27,80 €</strong> après la déduction fiscale</p>
        <div class="don__choice__shadow"></div>
      </div>

      <div class="don__choice" data-amount="200">
        <span class="don__choice__digit">200€</span>
        <p>soit <strong>68 €</strong> après la déduction fiscale</p>
        <div class="don__choice__shadow"></div>
      </div>

      <div class="don__choice is-input" data-amount="">
        <input name="amount" placeholder="....." type="number">
        <p>Autre montant</p>
        <div class="don__choice__shadow"></div>
      </div>

    </div>

    <button class="btn-donate" id="don__btn-valid" disabled>
      <span>Je fais un don</span>
      <div class="icon__round-wrapper">
        <svg class='icon'><use xlink:href='#icon-chevron'></use></svg>
      </div>
    </button>


  </div>
</section>
