<md-list ng-cloak>
  <md-subheader>Control gpio</md-subheader>
  <md-list-item ng-repeat="gpio in vm.gpioArray" class="md-2-line">
    <div class="md-list-item-text">
      <h3>{{gpio.name}}</h3>
      <p>{{gpio.digitPin}}</p>
    </div>
    <md-switch class="md-secondary" ng-change="vm.changeStatus(gpio)" ng-model="gpio.status"></md-switch>
  </md-list-item>
</md-list>
