<?php
  include('inc/lg.php');
  include('inc/functions.php');
?>

<?php include('template-parts/head.php'); ?>

<body>
    <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5S5GSHV"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <?= _svg ('pack-icons.svg'); ?>

  <?php include('template-parts/header.php'); ?>

  <?php include('template-parts/section-home.php'); ?>

  <?php include('template-parts/section-interview.php'); ?>

  <?php include('template-parts/section-don.php'); ?>

  <?php include('template-parts/section-fondation.php'); ?>

  <?php include('template-parts/footer.php'); ?>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="assets/js/bundle.min.js"></script>

</body>

</html>
