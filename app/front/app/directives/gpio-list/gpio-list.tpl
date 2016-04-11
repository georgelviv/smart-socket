<md-card>
  <md-content layout-padding>
    <div layout="row"  layout-align="space-between center">
      <h3 class="md-title">
        Control GPIO
      </h3>
      <md-button class="md-raised md-primary" ng-click="updateStatus()" ng-disabled="isGettingStatus">
        <span ng-show="!gpioArray.length && !isGettingStatus">
          Get status
        </span>
        <span ng-show="gpioArray.length && !isGettingStatus">
          Update status
        </span>
        <span ng-show="isGettingStatus">
          Loading...
        </span>
      </md-button>
    </div>
  </md-content>
  <md-divider ng-show="gpioArray.length"></md-divider>
  <md-list ng-show="gpioArray.length" ng-cloak>
    <md-list-item ng-repeat="gpio in gpioArray" class="md-2-line">
      <div class="md-list-item-text">
        <h3>{{gpio.name}}</h3>
        <p>{{gpio.digitPin}}</p>
      </div>
      <md-switch class="md-secondary" ng-change="changeStatus(gpio)" ng-model="gpio.status"></md-switch>
    </md-list-item>
  </md-list>
</md-card>
