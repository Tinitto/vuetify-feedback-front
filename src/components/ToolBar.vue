<template>
  <v-toolbar app color="primary" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>App Ratings</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <!--<v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>-->
      <v-btn flat to='/'>
        <v-icon class="hidden-md-and-up">home</v-icon>
        <v-spacer class="hidden-md-and-up"/>
        <span class="hidden-sm-and-down">Home</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>