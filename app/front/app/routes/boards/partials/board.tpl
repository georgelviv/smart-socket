<md-card class="boards__board" layout-padding>
  <md-card-title>
    <md-card-title-text>
      <span class="md-headline">{{board.name}}</span>
    </md-card-title-text>
  </md-card-title>
  <md-card-content class="boards__board-content" layout="column" layout-align="start stretch">
    <p class="boards__board-status" flex="100">
      <md-icon aria-label="Status">lens</md-icon>
      <span>
        Not connected
      </span>
    </p>
    <p flex="100">
      <md-icon aria-label="IP address">network_wifi</md-icon>
      <span>
        {{board.ip}}
      </span>
    </p>
    <p flex="100">
      <md-icon aria-label="Secret key">https</md-icon>
      <span>
        {{board.secret}}
      </span>
    </p>
  </md-card-content>
</md-card>
