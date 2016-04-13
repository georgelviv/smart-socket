<md-card class="boards__board">
  <div ng-show="board.isEdit" ng-include="'routes/boards/partials/board-edit.tpl'"></div>
  <div ng-hide="board.isEdit" ng-include="'routes/boards/partials/board-view.tpl'"></div>
</md-card>
