const PROXY     = 'http://localhost/ICM/www/';
const APP_DIR   = './';
const SRC_DIR   = 'src/';
const DEST_DIR  = 'assets/';

const config = {

  // paths
  paths: {
    base    : process.cwd(),
    proxy   : PROXY,
    app_dir : APP_DIR,
    src_dir : SRC_DIR,
    dest_dir: DEST_DIR,

    src: {
      js    : [
              `${SRC_DIR}js/vendor/slick.min.js`,
              `${SRC_DIR}js/vendor/jquery.fancybox.min.js`,
              `${SRC_DIR}js/vendor/wow.min.js`,
              `${SRC_DIR}js/nav.js`,
              `${SRC_DIR}js/slider.js`,
              // `${SRC_DIR}js/interface.js`,
            ],
      css   : [`${SRC_DIR}scss/**/*.scss`],
      images: [`${SRC_DIR}images/**/*.{png,jpg,jpeg,gif,svg}`,
              `!${SRC_DIR}images/icons/*.svg`],
      svg   : `${SRC_DIR}images/icons/*.svg`,
      html  : `${APP_DIR}**/*.{html,php}`,
      copy  : [`${SRC_DIR}fonts/**/*`,
               `${SRC_DIR}favicon/**/*`,
               // `${SRC_DIR}*.*`
             ],   // only files at the root of src folder
      template_pages  : [`${SRC_DIR}template-pages/*.hbs`],
      template_partials  : [`${SRC_DIR}template-partials/includes/_*.hbs`],
      template_data  : [`${SRC_DIR}template-data/*.js`],
    },

    dest: {
      js    : `${DEST_DIR}js`,
      css   : `${DEST_DIR}css`,
      images: `${DEST_DIR}images`,
      svg   : `${DEST_DIR}images/icons`,
      copy  : DEST_DIR,
    }
  },


  plugins: {

  }


};


module.exports = config;
