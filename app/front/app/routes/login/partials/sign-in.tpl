<md-content layout="column" layout-padding>
  <form name="sign-in" ng-submit="vm.onSignInSubmit()">
    <md-input-container class="md-block">
      <label>Email</label>
      <input name="email" type="email" required>
    </md-input-container>
    <md-input-container class="md-block">
      <label>Password</label>
      <input name="password" type="password" required>
    </md-input-container>
    <div layout="row" layout-align="end center">
      <md-button class="md-raised" type="submit">
        Sign In
      </md-button>
    </div>
  </form>
</md-content>
