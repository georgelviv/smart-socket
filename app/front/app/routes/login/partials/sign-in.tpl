<md-content layout="column" layout-padding>
  <form name="signInForm" ng-submit="vm.onSignInSubmit()" novalidate>

    <md-input-container class="md-block">
      <label>Email</label>
      <input name="email" type="email" ng-model="vm.forms.signIn.email" required
             ng-pattern="/^.+@.+\..+$/">
      <div ng-messages="signInForm.email.$error">
        <div ng-message="required">Email is required.</div>
        <div ng-message="pattern">Email should be correct.</div>
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
