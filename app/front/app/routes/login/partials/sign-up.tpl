<md-content layout="column" layout-padding>
  <form name="signUpForm" ng-submit="vm.onSignUpSubmit()" novalidate>

    <md-input-container class="md-block">
      <label>Username</label>
      <input name="username" type="text" ng-model="vm.forms.signUp.username" required
             minlength="4" md-maxlength="30">
      <div ng-messages="signUpForm.username.$error">
        <div ng-message="required">Username is required.</div>
        <div ng-message="minlength">Minimum length is 4 symbols.</div>
        <div ng-message="md-maxlength">Maximum length is 30 symbols.</div>
      </div>
    </md-input-container>

    <md-input-container class="md-block">
      <label>Email</label>
      <input name="email" type="email" ng-model="vm.forms.signUp.email" required
             ng-pattern="/^.+@.+\..+$/">
      <div ng-messages="signUpForm.email.$error">
        <div ng-message="required">Email is required.</div>
        <div ng-message="pattern">Email should be correct.</div>
      </div>
    </md-input-container>

    <md-input-container class="md-block">
      <label>Password</label>
      <input name="password" type="password" ng-model="vm.forms.signUp.password"
             required minlength="6">
      <div ng-messages="signUpForm.password.$error">
        <div ng-message="required">Password is required.</div>
        <div ng-message="minlength">Minimum length is 6 symbols.</div>
      </div>
    </md-input-container>
    <md-input-container class="md-block">
      <label>Confirm Password</label>
      <input name="confirmPassword" type="password" ng-model="vm.forms.signUp.confirmPassword"
             required minlength="3" compare-to="vm.forms.signUp.password">
      <div ng-messages="signUpForm.confirmPassword.$error">
        <div ng-message="required">Please confirm passwords.</div>
        <div ng-message="compareTo">Password should be equals.</div>
      </div>
    </md-input-container>

    <div layout="row" layout-align="end center" layout-wrap>
      <md-button class="md-raised md-primary" type="submit"  ng-disabled="signUpForm.$invalid">
        Sign Up
      </md-button>
    </div>
  </form>
</md-content>
