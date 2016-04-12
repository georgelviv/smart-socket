<md-content layout="column" layout-padding>
  <form name="signInForm" ng-submit="vm.onSignInSubmit()" novalidate>

    <md-input-container class="md-block">
      <label>Username</label>
      <input name="username" type="text" ng-model="vm.forms.signIn.username" required
             minlength="4" md-maxlength="30">
      <div ng-messages="signInForm.username.$error">
        <div ng-message="required">Username is required.</div>
        <div ng-message="minlength">Minimum length is 4 symbols.</div>
        <div ng-message="md-maxlength">Maximum length is 30 symbols.</div>
      </div>
    </md-input-container>

    <md-input-container class="md-block">
      <label>Password</label>
      <input name="password" type="password" ng-model="vm.forms.signIn.password"
             required minlength="6">
      <div ng-messages="signInForm.password.$error">
        <div ng-message="required">Password is required.</div>
        <div ng-message="minlength">Minimum length is 6 symbols.</div>
      </div>
    </md-input-container>

    <div layout="row" layout-align="end center" layout-wrap>
      <md-button class="md-raised" type="submit"  ng-disabled="signInForm.$invalid">
        Sign In
      </md-button>
    </div>
  </form>
</md-content>
