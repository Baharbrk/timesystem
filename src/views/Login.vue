<template>
  <div class="container">
    <h1 style="margin-top: 25px" align="left">Welcome to Time system</h1>
    <div id="loginContent" style="float:left;">
        <form id="loginForm" action="#" method="post" v-on:submit="login($event)">
            <div class="form-group">
                <label for="email"><h4>Username:</h4></label>
                <input v-model="email"
                       type="text"
                       class="form-control"
                       id="email"
                       aria-describedby="emailHelp"
                       placeholder="Username"
                       required />
            </div>
            <div class="form-group">
                <label for="password"><h4>Password:</h4></label>
                <input v-model="password"
                       type="password"
                       class="form-control"
                       id="password"
                       placeholder="Password"
                       required />
            </div>
            <button id="loginButton" class="btn btn-primary">Login</button>
            <div><span  v-if="failLogIn" style="color:red">Username or Password is not correct. Please try again!</span></div>
        </form>
    </div>
  </div>
</template>

<script src="./Login.js"></script>
