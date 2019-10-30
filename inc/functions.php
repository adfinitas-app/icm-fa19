<?php

//        Embed SVG file
// ==============================================

function _svg ($file) {
  $path =  __DIR__ .'/../assets/images/icons/' .$file;
  return file_get_contents($path);
}

//        Add srcset and sizes to resonsive images
// ==============================================

function _resp ($file, $img_name) {


  //  Add srcset attribute
  // -----------------------------------------------
  // get image name and image extension
  $file_base = substr($file, 0, strrpos($file, '.'));
  $file_ext  = '.' .pathinfo($file, PATHINFO_EXTENSION);

  // $srcset = $file_ext."-".$file_base;
  $srcset = $file_base .'_lg' .$file_ext .' 960w, ';
  $srcset .= $file_base .'_md' .$file_ext .' 768w, ';
  $srcset .= $file_base .'_sm' .$file_ext .' 330w';
  $srcset = 'srcset="' .$srcset .'"';

  //  Add sizes attribute
  // -----------------------------------------------
  switch ( $img_name ) {
    case 'restaurant__image-big':
      $sizes = '(min-width: 960px) 560px,
                100vw';
                break;

    case 'cuisine__image-big':
      $sizes = '(min-width: 960px) 560px,
                100vw';
                break;

    case 'contact__map':
      $sizes = '(min-width: 960px) 480px,
                100vw';
                break;
  }
  $sizes = 'sizes="' .$sizes .'"';

  $output = $srcset . " " . $sizes;
  return $output;
}

?>
