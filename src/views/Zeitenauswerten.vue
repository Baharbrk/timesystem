<template>
  <div class="container">
    <div class="d-flex justify-content-between" style="margin-top: 40px">
      <div class="form-group mb-2 w-75">
        <div class="input-group">
          <label for="Username" id="showUsername" class="input-group-text"
            >Username:</label
          >
          <select
            v-if="user.isAdmin === 'true'"
            class="form-select"
            id="showUserName2"
            v-model="selectedUser"
          >
            <option v-for="user of users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>
          <input
            type="text"
            v-if="user.isAdmin !== 'true'"
            :value="user.userName"
            disabled
            class="form-control input-group-text"
          />
          <label for="datum" class="input-group-text">Monat / Jahr :</label>
          <input
            v-model="filterDate"
            type="month"
            class="form-control"
            id="zeitErfassenDate"
            required
          />
          <button
            class="btn btn-primary showAddedTimes"
            @click="getTimeEvaluate($event)"
          >
            Auswerten
          </button>
        </div>
      </div>
      <button class="btn btn-primary mb-2 showAddedTimes" @click="downloadEx()">
        Monat drucken
      </button>
    </div>
    <div id="showZeitAuswerten">
      <table class="table zeitErfassenTable" id="zeiterfassenTabelle">
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">SOLL Arbeitszeit</th>
            <th scope="col">IST Arbeitszeit</th>
            <th scope="col">Differenz</th>
          </tr>
        </thead>
        <tbody class="showTimeTable">
          <tr v-for="date of dates" :key="date.date">
            <td>{{ date.date }}</td>
            <td>{{ date.sollArbeitsZeit }}</td>
            <td>{{ date.istArbeitsZeit }}</td>
            <td :style="getRowBackground(date.differenz)">
              {{ date.differenz }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="totalTime">
      <table v-if="totalTime">
        <thead>
          <tr>
            <th scope="col">Summe SOLL</th>
            <th scope="col">Summe IST</th>
            <th scope="col">Summe DIFFERENZ</th>
            <th scope="col">Summe DIFFERENZ GESAMT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ totalTime.summeSoll }}</td>
            <td :style="getRowBackground(totalTime.summeIst)">
              {{ totalTime.summeIst }}
            </td>
            <td :style="getRowBackground(totalTime.summeDiff)">
              {{ totalTime.summeDiff }}
            </td>
            <td :style="getRowBackground(totalTime.summeDiffGesamt)">
              {{ totalTime.summeDiffGesamt }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./Zeitenauswerten.js"></script>
