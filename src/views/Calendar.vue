<template>
  <div class="container">
     <div class="row" style="margin-top: 40px">
      <div class="form-group">
        <label for="Username" id="showUsername">Username:</label>
        <select  v-if="user.isAdmin === 'true'" class="form-control" id="showUserName2" v-model="selectedUser">
          <option selected disabled hidden style="display: none" value="">
            Select user
          </option>
          <option v-for="user of users" :key="user.id" :value="user.id">
            {{ user.username }}
          </option>
        </select>
        <input type="text" v-if="user.isAdmin !== 'true'" :value="user.userName" disabled class="form-control" /> 
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <form
          class="form-inline showTime"
          action="#"
          method="post"
          v-on:submit="showAllTime($event)"
        >
          <div class="form-group mb-2">
            <label for="datum">Monat / Jahr :</label>
            <input
              type="month"
              class="form-control"
              id="zeitErfassenDate"
              v-model="month"
            />
          </div>
          <button class="btn btn-primary mb-2 showAddedTimes">Anzeigen</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6" id="showTimeTable">
        <table class="table zeitCalendarTable">
          <thead>
            <tr>
              <th scope="col">Datum</th>
              <th scope="col">Kommen</th>
              <th scope="col">Gehen</th>
              <th scope="col">Kategorie</th>
            </tr>
          </thead>
          <tbody class="calendarTable">
            <tr v-for="event of showEvents" v-bind:key="event.bookIn">
              <td>{{ event.date }}</td>
              <td>{{ event.bookIn }}</td>
              <td>{{ event.bookOut }}</td>
              <td>{{ event.category }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6" id="calendar"></div>
    </div>
    <div></div>
  </div>
</template>
<script src="./Calendar.js"></script>
