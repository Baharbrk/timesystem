<template>
  <div class="container" id="app">
    <nav
      v-if="username"
      id="navbar"
      class="navbar navbar-expand-lg navbar-light"
    >
      <router-link class="navbar-brand nav-link" to="/"
        ><img width="140" src="./assets/pics/house.png"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleMenu()"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item" :class="currentRoute === '/zeiterfassen' && 'highlight'">
            <router-link to="/zeiterfassen" class="nav-link"
              >Zeiten erfassen</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/zeitenauswerten" class="nav-link" :class="currentRoute === '/zeitenauswerten' && 'highlight'"
              >Zeiten auswerten</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/Verwaltung" v-show="isAdmin" class="nav-link" :class="currentRoute === '/Verwaltung' && 'highlight'"
              >Verwaltung</router-link
            >
          </li>
        </ul>
      </div>
      <a class="nav-link" id="label_user">{{
        username || "nicht eingeloggt"
      }}</a>
      <a
        v-if="username"
        class="nav-link d-md-none d-lg-block logout"
        v-on:click="logOutUser"
        href="#"
        ><img width="45" style="margin-right:30px" src="./assets/pics/logout.png"
      /></a>
    </nav>
    <router-view name="Zeiterfassen" :users="users"></router-view>
    <router-view name="Zeitkorriegieren" :users="users"></router-view>
    <router-view name="Zeitenauswerten" :users="users"></router-view>
    <router-view name="Calendar" :users="users"></router-view>
    <router-view />
  </div>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>