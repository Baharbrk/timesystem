<template>
  <div id="app">
    <nav
      v-if="username"
      id="navbar"
      class="navbar navbar-expand-lg navbar-light bg-light"
    >
      <div class="container">
        <router-link class="navbar-brand" to="/zeiterfassen"
          ><h1>TIME SYSTEM</h1>
        </router-link>
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
            <li class="nav-item">
              <router-link to="/zeiterfassen" class="nav-link"
                >Zeiten erfassen</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/zeitenauswerten" class="nav-link"
                >Zeiten auswerten</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/Verwaltung" v-show="isAdmin" class="nav-link"
                >Verwaltung</router-link
              >
            </li>
          </ul>
        </div>
          <span id="label_user">{{ username || "nicht eingeloggt" }}</span>
          <a
            v-if="username"
            class="nav-link d-md-none d-lg-block logout"
            v-on:click="logOutUser"
            href="#"
            title="Log out"
            ><i class="bi bi-box-arrow-right fs-3"></i
          ></a>
      </div>
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