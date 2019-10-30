<section>

  <?php
    $json_source = '{
      "nom":"Adriana",
      "naissance":"1981-06-12"
    }';

    // Décode le JSON
    $json_data = json_decode($json_source);

    // Affiche la valeur des attributs du JSON
    echo $json_data->nom.' '.$json_data->naissance;

    echo "<br/>";
    $json_data = json_decode($json_source, true);
    echo $json_data['nom'].' '.$json_data['naissance'];

  ?>

</section>


// video
<video autoplay="true" loop muted class="restaurant__video wow slideInUp" data-wow-duration="1s" data-wow-offset="150">
  <source src="assets/medias/restaurant-light.mp4" type="video/mp4">
</video>
