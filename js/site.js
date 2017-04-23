(function () {
    'use strict';
    angular.module('theIoTWorldApp', ['ngMaterial', 'ngRoute', 'ngMessages', 'material.svgAssetsCache'])
      .controller('AppCtrl', function ($scope, $mdDialog, $mdToast, $mdMedia, $timeout, $mdSidenav, $log) {
          var self = this;
          self.hidden = false;
          self.isOpen = false;
          self.hover = false;
          var last = {
              bottom: false,
              top: true,
              left: false,
              right: true
          };
          $scope.toggleLeft = buildDelayedToggler('left');
          $scope.toggleRight = buildToggler('right');
          $scope.isOpenRight = function () {
              return $mdSidenav('right').isOpen();
          };

          $scope.closeLeft = function () {
          $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
          };

          $scope.closeRight = function () {
              $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
          };
          /**
            * Supplies a function that will continue to operate until the
            * time is up.
            */
          function debounce(func, wait, context) {
              var timer;
              return function debounced() {
                  var context = $scope,
                      args = Array.prototype.slice.call(arguments);
                  $timeout.cancel(timer);
                  timer = $timeout(function() {
                      timer = undefined;
                      func.apply(context, args);
                  }, wait || 10);
              };
          }
          /**
           * Build handler to open/close a SideNav; when animation finishes
           * report completion in console
           */
          function buildDelayedToggler(navID) {
              return debounce(function() {
                  $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
              }, 200);
          }
          function buildToggler(navID) {
              return function() {
                  $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
              }
          }


          $scope.demo = {
              isOpen: true,
              count: 0,
              selectedDirection: 'right'
          };


          $scope.tabCourse= {
              selectedIndex: 1
          };

          $scope.toastPosition = angular.extend({}, last);


          $scope.showWelcomeToast = function () {
              var pinTo = $scope.getToastPosition();
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Welcome to The IoT World!')
                  .position(pinTo)
                  .hideDelay(1500)
              );
          };

          $scope.getToastPosition = function () {
              sanitizePosition();

              return Object.keys($scope.toastPosition)
                .filter(function (pos) { return $scope.toastPosition[pos]; })
                .join(' ');
          };

          function sanitizePosition() {
              var current = $scope.toastPosition;

              if (current.bottom && last.top) current.top = false;
              if (current.top && last.bottom) current.bottom = false;
              if (current.right && last.left) current.left = false;
              if (current.left && last.right) current.right = false;

              last = angular.extend({}, current);
          };

          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
          // On opening, add a delayed property which shows tooltips after the speed dial has opened
          // so that they have the proper position; if closing, immediately hide the tooltips
          $scope.$watch('mainToolbar.isOpen', function (isOpen) {
              if (isOpen) {
                  $timeout(function () {
                      $scope.tooltipVisible = self.isOpen;
                  }, 600);
              } else {
                  $scope.tooltipVisible = self.isOpen;
              }
          });
          self.openDialog = function ($event, item) {
              $scope.tabCourse.selectedIndex = 0;

              if (item === 'advanced.html') {
                  item = "courses.html";
                  $scope.tabCourse.selectedIndex = 1;
              }

              // Show the dialog
             $mdDialog.show({
                 controllerAs: 'dialog',
                 templateUrl: item,
                 parent: angular.element(document.body),
                 clickOutsideToClose:true,
                 fullscreen: useFullScreen,
                 targetEvent: $event
              });
          }
      });
})();



$(document).ready(function () {

    // Add "loaded" class when a section has been loaded
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        $(".section").each(function () {
            var elementTop = $(this).offset().top - $('#header').outerHeight();
            if (scrollTop >= elementTop) {
                $(this).addClass('loaded');
            }
        });
    });


    // Sticky Navbar Affix
    $('#navbar').affix({
        offset: {
            top: $('#topbar').outerHeight(),
        }
    });

    // Smooth Hash Link Scroll
    $('.smooth-scroll').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $('.nav a').on('click touchstart', function () {
        if ($('.navbar-toggle').css('display') != 'none') {
            $(".navbar-toggle").click();
        }
    });
});

(function ($) {
//Sharebox Settings//

$('.show-share-bottom').click(function () {
    $('.share-bottom').toggleClass('active-share-bottom');
    return false;
});

$('.close-share-bottom').click(function () {
    $('.share-bottom').removeClass('active-share-bottom');
    return false;
});

//Close Sharebox//

$('.open-sharebox').click(function () {
    $('.sharebox-wrapper').fadeIn(200);
});

$('.close-sharebox').click(function () {
    $('.sharebox-wrapper').fadeOut(200);
});

$('.open-loginbox').click(function () {
    $('.loginbox-wrapper').fadeIn(200);
});

$('.close-loginbox').click(function () {
    $('.loginbox-wrapper').fadeOut(200);
});

}(jQuery));


