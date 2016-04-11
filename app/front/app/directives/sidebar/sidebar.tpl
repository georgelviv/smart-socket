<md-toolbar class="sidebar" hide-gt-md>
  <h2 class="md-toolbar-tools">
    <a href="/#/" title="Home">
      Smart Socket
    </a>
  </h2>
</md-toolbar>
<md-content>
  <md-toolbar class="sidebar__header" ng-show="user" layout-padding>
    <div layout="column" layout-align="center start">
      <p class="md-body-1">
        Welcome, {{user.username}}!
      </p>
      <p class="md-body-1">
        {{user.email}}
      </p>
    </div>
  </md-toolbar>
  <md-list layout="row" layout-align="left center" flex>
    <md-list-item ng-href="/#/dashboard" flex>
      <md-icon>dashboard</md-icon>
      <p>
        Dashboard
      </p>
    </md-list-item>
  </md-list>
</md-content>
