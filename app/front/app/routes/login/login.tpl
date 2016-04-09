<md-card ng-cloak>
  <md-tabs md-dynamic-height md-border-bottom>

    <md-tab label="Sign In">
      <div ng-include="'routes/login/partials/sign-in.tpl'"></div>
    </md-tab>

    <md-tab label="Sign Up">
      <div ng-include="'routes/login/partials/sign-up.tpl'"></div>
    </md-tab>

  </md-tabs>
</md-card>
