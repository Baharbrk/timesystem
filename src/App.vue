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
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    class="navbar-toggler"
                    data-target="#navbarSupportedContent"
                    data-toggle="collapse"
                    type="button"
                    @click="toggleMenu()"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div id="navbarSupportedContent" class="collapse navbar-collapse">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/zeiterfassen"
                            >Add Time
                            </router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/zeitenauswerten"
                            >Evaluate Time
                            </router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link v-show="isAdmin" class="nav-link" to="/Verwaltung"
                            >User Administration
                            </router-link
                            >
                        </li>
                    </ul>
                </div>
                <span id="label_user">{{ username || 'nicht eingeloggt' }}</span>
                <a
                    v-if="username"
                    class="nav-link d-md-none d-lg-block logout"
                    href="#"
                    title="Log out"
                    v-on:click="logOutUser"
                >
                    <i class="bi bi-box-arrow-right fs-3"
                    /></a>
            </div>
        </nav>
        <router-view :users="users" name="Zeiterfassen"></router-view>
        <router-view :users="users" name="Zeitkorriegieren"></router-view>
        <router-view :users="users" name="Zeitenauswerten"></router-view>
        <router-view :users="users" name="Calendar"></router-view>
        <router-view/>
        <div :class="`bg ${bgLight}`"/>
    </div>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>