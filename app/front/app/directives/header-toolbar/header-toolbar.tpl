<md-toolbar class="md-primary">
  <div class="md-toolbar-tools">
    <a href="/#/main" title="Home">
      <h3>
        Smart Socket
      </h3>
    </a>
    <span flex></span>
    <md-button ng-hide="isLogged" class="md-icon-button" aria-label="Sign in/up"  href="/#/login">
      <md-icon>person</md-icon>
    </md-button>
    <md-button ng-show="isLogged" class="md-icon-button" aria-label="Logout"  
               ng-click="showConfirm($event)">
      <md-icon><i class="material-icons">input</i></md-icon>
    </md-button>
  </div>
</md-toolbar>
