<!doctype html>
<html class="no-js">
  <head>
    <meta charset="utf-8">
    <title><%- title %></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css(.) components/vendor.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="bower_components/codemirror/lib/codemirror.css" />
    <link rel="stylesheet" href="bower_components/codemirror/theme/twilight.css" />
    <link rel="stylesheet" href="bower_components/angular-xeditable/dist/css/xeditable.css" />
    <link rel="stylesheet" href="bower_components/bootstrap-material-design/dist/css/material.css" />
    <link rel="stylesheet" href="bower_components/bootstrap-material-design/dist/css/ripples.css" />
    <link rel="stylesheet" href="bower_components/angular-ui-grid/ui-grid.css" />
    <link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css(.tmp) components/main.css -->
    <link rel="stylesheet" href="components/main/main.css">
    <!-- endbuild -->
  </head>
  <body ng-app="myApp" class="md-default-theme" layout="column" layout-margin layout-fill layout-padding>
    <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <div class="header">
      <div class="container">
        <h3 class="text-muted"><a ng-href="#/view/index"><%- title %></a></h3>
      </div>
    </div>

    <div class="container">
      <div ng-view=""></div>
      <div class="footer">
        <p></p>
      </div>
    </div>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
    <!-- script>
       (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
       })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

       ga('create', '<%- ga %>');
       ga('send', 'pageview');
    </script -->

    <!-- build:js(.) components/oldieshim.js -->
    <!--[if lt IE 9]>
    <script src="bower_components/es5-shim/es5-shim.js"></script>
    <script src="bower_components/json3/lib/json3.js"></script>
    <![endif]-->
    <!-- endbuild -->

    <!-- build:js(.) components/vendor.js -->
    <!-- bower:js -->
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angular-aria/angular-aria.js"></script>
    <script src="bower_components/angular-cookies/angular-cookies.js"></script>
    <script src="bower_components/angular-messages/angular-messages.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
    <script src="bower_components/angular-touch/angular-touch.js"></script>
    <script src="bower_components/codemirror/lib/codemirror.js"></script>
    <script src="bower_components/codemirror/addon/display/placeholder.js"></script>
    <script src="bower_components/codemirror/mode/xml/xml.js"></script>
    <script src="bower_components/codemirror/mode/javascript/javascript.js"></script>
    <script src="bower_components/codemirror/mode/htmlmixed/htmlmixed.js"></script>
    <script src="bower_components/codemirror/mode/css/css.js"></script>
    <script src="bower_components/angular-ui-codemirror/ui-codemirror.js"></script>
    <script src="bower_components/d3/d3.js"></script>
    <script src="bower_components/angular-xeditable/dist/js/xeditable.js"></script>
    <script src="bower_components/papaparse/papaparse.js"></script>
    <script src="bower_components/FileSaver/FileSaver.js"></script>
    <script src="bower_components/angular-downloadsvg-directive/angular-downloadsvg-directive.js"></script>
    <script src="bower_components/d3-tip/index.js"></script>
    <script src="bower_components/_F/_F.js"></script>
    <script src="bower_components/bootstrap-material-design/dist/js/material.js"></script>
    <script src="bower_components/bootstrap-material-design/dist/js/ripples.js"></script>
    <script src="bower_components/angular-ui-grid/ui-grid.js"></script>
    <script src="bower_components/marked/lib/marked.js"></script>
    <script src="bower_components/angular-marked/angular-marked.js"></script>
    <script src="bower_components/hammerjs/hammer.js"></script>
    <script src="bower_components/angular-material/angular-material.js"></script>
    <script src="bower_components/ng-debounce/angular-debounce.js"></script>
    <!-- endbower -->
    <!-- endbuild -->

        <!-- build:js({.tmp,app}) components/scripts.js -->
        <script src="components/app.js"></script>
        <script src="components/config.js"></script>
        <script src="components/main/main-controller.js"></script>
        <script src="components/main/dataservice-factory.js"></script>
        <script src="components/main/mimeType-service.js"></script>
        <script src="components/main/report-directive.js"></script>
        <!-- endbuild -->
</body>
</html>
