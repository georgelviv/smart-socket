<section class="boards">
  <md-card class="boards__top-card" flex="100" layout-padding ng-clock>
    <md-card-title-text>
      <h2 class="md-headline">Manage your boards!</h2>
      <p class="md-subhead">
        <span ng-show="vm.boards && vm.boards.length === 0">
          At the moment, you don't have any boards, please add one.
        </span>
        <span ng-show="vm.boards && vm.boards.length">
          You have {{vm.boards.length}} boards.
        </span>
        <span ng-show="vm.boards && vm.boards.length === 1">
          You have 1 board.
        </span>
      </p>
    </md-card-title-text>
  </md-card>
  <section layout-xs="column" layout="row" layout-wrap>
    <div ng-show="vm.newBoardForm" flex-xs flex-gt-xs="50" layout="column">
      <div ng-include="'routes/boards/partials/new.tpl'"></div>
    </div>
    <div ng-repeat="board in vm.boards" flex-xs flex-gt-xs="50" layout="column">
      <div ng-include="'routes/boards/partials/board.tpl'"></div>
    </div>
  </section>
  <md-button class="boards__add-btn md-fab md-fab-bottom-right" aria-label="Add board"
             ng-hide="vm.newBoardForm" ng-click="vm.showNewBoard(true)">
    <md-icon>add</md-icon>
  </md-button>
</section>
