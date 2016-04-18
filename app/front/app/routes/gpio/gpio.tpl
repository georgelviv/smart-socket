<section class="gpio">
  <md-card class="gpio__top-card"  flex="100" layout-padding ng-clock>
    <md-card-title-text>
      <h2 class="md-headline">GPIO</h2>
      <div layout="row" layout-wrap layout-align="center center" ng-show="vm.boards.length">
        <p flex="60" flex-xs="100" class="md-subhead">
          Please select board from list
        </p>
        <md-input-container flex="40" flex-xs="100">
          <label>Board</label>
          <md-select ng-model="vm.currentBoard">
            <md-optgroup label="Boards">
              <md-option ng-repeat="board in vm.boards" value="{{board.id}}">
                {{board.name}}
              </md-option>
            </md-optgroup>
          </md-select>
        </md-input-container>
      </div>
      <div ng-show="vm.boards.length === 0">
        Currently you don't have any boardі. Please add using
        <a href="/#/boards">
          board manager.
        </a>
      </div>
    </md-card-title-text>
  </md-card>

  <md-card ng-show="vm.currentBoard">
    <md-content layout-padding>
      <div layout="row"  layout-align="space-between center">
        <h3 class="md-title">
          Control GPIO
        </h3>
        <md-button class="md-raised md-primary" ng-click="vm.updateStatus()">
          <span ng-show="!vm.gpioArray.length">
            Get status
          </span>
          <span ng-show="vm.gpioArray.length">
            Update status
          </span>
        </md-button>
      </div>
    </md-content>
    <md-divider ng-show="vm.gpioArray.length"></md-divider>
    <md-list ng-show="vm.gpioArray.length" ng-cloak>
      <md-list-item ng-repeat="gpio in vm.gpioArray" class="md-2-line">
        <div class="md-list-item-text">
          <h3>{{gpio.name}}</h3>
          <p>{{gpio.digitPin}}</p>
        </div>
        <md-switch class="md-secondary" ng-change="vm.changeStatus(gpio)" ng-model="gpio.status"></md-switch>
      </md-list-item>
    </md-list>
  </md-card>

</section>
