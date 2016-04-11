<section class="dashboard">
  <md-card class="dashboard__top-card" layout-padding ng-clock>
    <h2 class="md-headline">
      Dashboard
    </h2>
    <p ng-show="vm.username">
      Welcome, {{vm.username}} !
    </p>
  </md-card>
  <gpio-list></gpio-list>
</section>
