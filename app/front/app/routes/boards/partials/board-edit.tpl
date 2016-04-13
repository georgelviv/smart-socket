<div layout-padding>
  <md-card-title>
    <md-card-title-text>
      <span class="md-headline">Edit Board</span>
    </md-card-title-text>
  </md-card-title>
  <form name="editBoardForm" ng-submit="vm.submitEditBoard(board)" novalidate>
    <md-input-container class="md-block">
      <label>Board Name</label>
      <input name="name" type="text" ng-model="board.edit.name" required
             minlength="3" md-maxlength="30">
      <div ng-messages="editBoard.name.$error">
        <div ng-message="required">Board name is required.</div>
        <div ng-message="minlength">Minimum length is 3 symbols.</div>
        <div ng-message="md-maxlength">Maximum length is 30 symbols.</div>
      </div>
    </md-input-container>

    <md-input-container class="md-block">
      <label>IP address</label>
      <input name="ip" type="text" ng-model="board.edit.ip" required
             pattern="^(([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)\.){3}([1-9]?\d|1\d\d|2[0-5][0-5]|2[0-4]\d)$">
      <div ng-messages="editBoard.ip.$error">
        <div ng-message="required">IP address is required.</div>
        <div ng-message="pattern">IP address should be correct.</div>
      </div>
    </md-input-container>
    <md-input-container class="md-block">
      <label>Secret key</label>
      <input name="secret" type="text" ng-model="board.edit.secret" required
             minlength="4" md-maxlength="30">
      <div ng-messages="editBoard.ip.$error">
        <div ng-message="required">Secret key is required.</div>
        <div ng-message="minlength">Minimum length is 3 symbols.</div>
        <div ng-message="md-maxlength">Maximum length is 30 symbols.</div>
      </div>
    </md-input-container>
    <div layout="row" layout-align="end center" layout-wrap>
      <md-button ng-click="vm.editBoard(board, false)">
        Cancel
      </md-button>
      <md-button class="md-raised md-primary" type="submit"  ng-disabled="true">
        Edit
      </md-button>
      <!-- ng-disabled="editBoardForm.$invalid" -->
    </div>
</form>
</div>
