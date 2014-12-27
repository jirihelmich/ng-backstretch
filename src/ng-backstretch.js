angular.module('ng-backstretch', []).

directive('backstretch', ['$window', '$log', function($window, $log) {
  return {
    restrict: 'A',
    scope: {
        backgroundUrl: '=backstretchUrl'
    },
    template: '<div class="backstretch"><img ng-src="{{backgroundUrl}}" /></div>',
    link: function(scope, element, attributes) {

        // set some default styles for the wrapper and image
        var styles = {
          wrapper: {
            left: 0,
            top: 0,
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            height: '100%',
            width: '100%',
            zIndex: -999998,
            position: 'fixed'
          },
          image: {
            position: 'fixed',
            display: 'none',
            margin: 0,
            padding: 0,
            border: 'none',
            width: 'auto',
            height: 'auto',
            maxHeight: 'none',
            maxWidth: 'none',
            zIndex: -999999
          }
        };

        element.css(styles.wrapper);

        scope.image = angular.element(element.find('img'));
        scope.image.css(styles.image);

        scope.load = function(e) {
          // figure out what the width:height ratio is
          scope.ratio = this.width / this.height;

          // show the image since it's finished loading
          scope.image.css({display:'block'});

          // perform an initial sizing
          scope.resize();
        };

        scope.resize = function(e) {

          // set some default css
          var background_css = {left: 0, top: 0, width: 'auto', height: 'auto'};

          // set some initial calculations
          var root_width = element[0].offsetWidth,
              background_width = root_width,

              root_height = element[0].offsetHeight,
              background_height = background_width / scope.ratio,

              background_offset;

          // make adjustments based on image ratio
          if (background_height >= root_height) {
            background_offset = (background_height - root_height) / 2;
            background_css.top = '-' + background_offset + 'px';

          } else {
            background_height = root_height;
            background_width = background_height * scope.ratio;
            background_offset = (background_width - root_width) / 2;

            background_css.left = '-' + background_offset + 'px';
          }

          // set the css for the width and height
          background_css.width = background_width + 'px';
          background_css.height = background_height + 'px';

          // apply the appropriate styles to the wrapper and image
          element.css({width: root_width, height: root_height});
          scope.image.css(background_css);
        };

      // don't do anything until the image has finished loading
      scope.image.bind('load', scope.load);

      // make sure to update the image sizes when the page scales/changes
      angular.element($window).bind('resize', scope.resize);
    }
  };
}]);
