<md-toolbar class="sidebar" hide-gt-md>
  <h2 class="md-toolbar-tools">
    <a href="/#/" title="Home">
      Smart Socket
    </a>
  </h2>
</md-toolbar>
<md-content>
  <md-toolbar class="sidebar__header" ng-show="sidebar.user" layout-padding>
    <div layout="column" layout-align="center start">
      <p class="md-body-1">
        Welcome, {{sidebar.user.username}}!
      </p>
      <p class="md-body-1">
        {{sidebar.user.email}}
      </p>
    </div>
  </md-toolbar>
  <md-list layout-align="left center">
    <md-list-item ng-repeat="item in sidebar.navigation" ng-href="{{item.url}}"
                  ng-disabled="sidebar.current === item.name">
      <md-icon>{{item.icon}}</md-icon>
      <p>
        {{item.title}}
      </p>
    </md-list-item>
  </md-list>
</md-content>
