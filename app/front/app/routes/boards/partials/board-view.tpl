<div layout="row" layout-sm="column" layout-align="space-between" layout-wrap>
  <div flex-sm="60" flex-gt-sm="70">
    <md-card-title>
      <md-card-title-text>
        <span class="md-headline">{{board.name}}</span>
      </md-card-title-text>
    </md-card-title>
  </div>
  <div flex-sm="40" flex-gt-sm="30">
    <md-card-actions layout="row" layout-align="end center" layout-align-sm="start center">
      <md-button class="md-icon-button md-primary" aria-label="Edit"
                 ng-click="vm.editBoard(board, true)">
          <md-icon>edit</md-icon>
      </md-button>
      <md-button class="md-icon-button md-warn" aria-label="Delete"
                 ng-click="vm.confirmDelete($event, board)">
          <md-icon>delete</md-cion>
      </md-button>
    </md-card-actions>
  </div>
  <div flex="100">
    <md-card-content class="boards__board-content md-body-1" layout="column" layout-align="start stretch">
      <p class="boards__board-status" flex="100"
         ng-class="{'boards__board-status--connected': board.connected}">
        <md-icon class="boards__board-status-icon" aria-label="Status">lens</md-icon>
        <span ng-hide="board.connected">
          Not connected
        </span>
        <span ng-show="board.connected">
          Connected
        </span>
        <md-button class="md-icon-button" ng-click="vm.getStatus(board)">
          <md-icon>autorenew</md-icon>
        </md-button>
      </p>
      <p flex="100">
        <md-icon aria-label="Broker address">network_wifi</md-icon>
        <span>
          {{board.broker}}
        </span>
      </p>
      <p flex="100">
        <md-icon aria-label="Secret key">https</md-icon>
        <span>
          {{board.secret}}
        </span>
      </p>
    </md-card-content>
  </div>
</div>
