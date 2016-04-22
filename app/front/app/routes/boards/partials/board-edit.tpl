<div layout-padding>
  <md-card-title>
    <md-card-title-text>
      <span class="md-headline">Edit Board</span>
    </md-card-title-text>
  </md-card-title>
  <form name="editBoardForm" ng-submit="vm.submitEditBoard(board, editBoardForm)" novalidate>
    <md-input-container class="md-block">
      <label>Board Name</label>
      <input name="name" type="text" ng-model="board.edit.name" required
             minlength="3" md-maxlength="30">
      <div ng-messages="editBoardForm.name.$error">
        <div ng-message="required">Board name is required.</div>
        <div ng-message="minlength">Minimum length is 3 symbols.</div>
        <div ng-message="md-maxlength">Maximum length is 30 symbols.</div>
      </div>
    </md-input-container>

    <md-input-container class="md-block">
      <label>Broker address </label>
      <input name="broker" type="text" ng-model="board.edit.broker" required
             minlength="5">
      <div ng-messages="editBoardForm.broker.$error">
        <div ng-message="required">Broker address is required.</div>
        <div ng-message="minlength">Minimum length is 5 symbols.</div>
      </div>
    </md-input-container>
    <md-input-container class="md-block">
      <label>Board name value</label>
      <input name="nameValue" type="text" ng-model="board.edit.nameValue" required
             minlength="5">
      <div ng-messages="editBoardForm.nameValue.$error">
        <div ng-message="required">Board name value is required.</div>
        <div ng-message="minlength">Minimum length is 3 symbols.</div>
      </div>
    </md-input-container>
    <md-input-container class="md-block">
      <label>Secret key</label>
      <input name="secret" type="text" ng-model="board.edit.secret" required
             minlength="4" md-maxlength="30">
      <div ng-messages="editBoardForm.secret.$error">
        <div ng-message="required">Secret key is required.</div>
        <div ng-message="minlength">Minimum length is 3 symbols.</div>
        <div ng-message="md-maxlength">Maximum length is 30 symbols.</div>
      </div>
    </md-input-container>
    <div layout="row" layout-align="end center" layout-wrap>
      <md-button ng-click="vm.editBoard(board, false)">
        Cancel
      </md-button>
      <md-button class="md-raised md-primary" type="submit"  ng-disabled="editBoardForm.$invalid">
        Edit
      </md-button>
    </div>
</form>
</div>
