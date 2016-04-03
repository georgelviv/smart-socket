<md-list ng-cloak>
  <md-subheader>Control gpio</md-subheader>
  <md-list-item ng-repeat="gpio in vm.gpioArray">
    <p>
      {{gpio.name}}
    </p>
    <md-switch class="md-secondary" ng-change="vm.changeStatus(gpio)" ng-model="gpio.status"></md-switch>
  </md-list-item>
</md-list>
