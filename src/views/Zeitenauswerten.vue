<template>
  <div class="container" style="margin-top:2%; width:75%">
    <div class="d-flex justify-content-start" style="margin-top: 40px">
      <div class="form-group mb-2 w-30">
        <div class="input-group">
          <input
            type="text"
            v-if="user.isAdmin !== 'true'"
            :value="user.userName"
            disabled
            class="form-control input-group-text"
          />
          <label for="datum" class="input-group-text">Search (Month/Year):</label>
          <input
            v-model="filterDate"
            type="month"
            class="form-control"
            id="zeitErfassenDate"
            required
            @keyup.enter="getTimeEvaluate($event)"
          />
          <button
            class="btn btn-primary showAddedTimes"
            @click="getTimeEvaluate($event)"
          >
              <i class="bi bi-list-check me-1" /><span>Show Result</span>
          </button>
        </div>
      </div>
      <button class="btn btn-primary mb-2 showAddedTimes" @click="downloadEx()">
          <i class="bi bi-download me-1" />
          <span>Download in CSV</span>
      </button>
    </div>
    <div id="showZeitAuswerten">
      <table class="table zeitErfassenTable" id="zeiterfassenTabelle">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Target Working Hours</th>
            <th scope="col">Actual Working Hours</th>
            <th scope="col">Difference</th>
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
      <table v-if="totalTime" class="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">Sum of Target Hours</th>
            <th scope="col">Sum of Actual Hours</th>
            <th scope="col">Sum of Difference</th>
            <th scope="col">Summ of Total Difference</th>
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
