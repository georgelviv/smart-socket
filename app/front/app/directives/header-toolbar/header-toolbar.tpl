<md-toolbar class="md-primary">
  <div class="md-toolbar-tools">
    <md-button class="md-icon-button" ng-show="headerToolbar.isLogged" aria-label="Sidebar"
               ng-click="headerToolbar.toggleSidebar()" hide-gt-md>
      <md-icon>menu</md-icon>
    </md-button>
    <h2>
      <a href="/#/" title="Home">
        Smart Socket
      </a>
    </h2>
    <span flex></span>
    <md-button ng-hide="headerToolbar.isLogged" class="md-icon-button" aria-label="Sign in/up"
               href="/#/login">
      <md-icon>person</md-icon>
    </md-button>
    <md-button ng-show="headerToolbar.isLogged" class="md-icon-button" aria-label="Logout"
               ng-click="headerToolbar.showConfirm($event)">
      <md-icon>
        <i class="material-icons">input</i>
      </md-icon>
    </md-button>
  </div>
</md-toolbar>
