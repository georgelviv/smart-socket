<section class="main" layout="column" ng-cloak>

  <md-toolbar class="md-primary">
    <div class="md-toolbar-tools">
      <h3>
        Smart Socket
      </h3>
    </div>
  </md-toolbar>


  <md-content flex>
    <div class="main__content-wrapper" layout="row" layout-align="center center">
      <div class="main__content" flex-gt-sm="90" flex-gt-md="80" flex="90">
        <gpio-list></gpio-list>
      </div>
    </div>
    <spinner></spinner>
  </md-content>

</section>