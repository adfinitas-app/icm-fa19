const PROXY     = 'http://local.decouvreursdespoir.fr';
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
              `${SRC_DIR}js/vendor/jquery.min.js`,
              `${SRC_DIR}js/vendor/jquery.easing.min.js`,
              `${SRC_DIR}js/vendor/jquery.fancybox.min.js`,
              `${SRC_DIR}js/vendor/slick.min.js`,
              `${SRC_DIR}js/nav.js`,
              `${SRC_DIR}js/slider.js`,
            ],
      css   : [`${SRC_DIR}scss/**/*.scss`],
      images: [`${SRC_DIR}images/**/*.{png,jpg,jpeg,gif,svg}`,
              `!${SRC_DIR}images/icons/*.svg`],
      svg   : `${SRC_DIR}images/icons/*.svg`,
      html  : `${APP_DIR}**/*.{html,php}`,
      copy  : [`${SRC_DIR}favicon/**/*`,
               `${SRC_DIR}medias/**/*`
              ],
      template_pages    : [`${SRC_DIR}templates/pages/*.hbs`],
      template_partials : [`${SRC_DIR}templates/partials/includes/_*.hbs`],
      template_datas    : [`${SRC_DIR}templates/datas/*.{json,js}`],
      template          : [`${SRC_DIR}templates/**/*.{hbs,json,js}`],
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
