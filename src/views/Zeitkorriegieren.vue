<template>
  <div class="container" style="margin-top: 20px;">
    <div class="row">
      <div class="col-md-3" style="margin-top: 40px;">
        <form
          id="timeEntryFormCorrect"
          action="#"
          method="post"
          @submit="correctTime($event)"
        >
          <div class="form-group">
            <label>Selected booking:</label>
            <input type="text" :value="selectedBooking && selectedBooking.id  ? selectedBooking.id : '---'" disabled class="form-control"/>
          </div>
          <div class="form-group">
            <label for="Kommen">Kommen:</label>
            <input
              v-model="leave"
              type="time"
              class="form-control arrive"
              :disabled="!selectedBooking"
            />
          </div>
          <input v-model="timeId" type="hidden" id="custId" />
          <div class="form-group">
            <label for="Gehen">Gehen:</label>
            <input
              v-model="arrive"
              type="time"
              class="form-control leave"
              :disabled="!selectedBooking"
            />
          </div>
          <div class="form-group">
            <label for="Datum">Datum:</label>
            <input
              v-model="date"
              type="date"
              class="form-control dateone"
              id="correctDate"
              required
              :disabled="!selectedBooking"
            />
          </div>
          <label for="Kategorie">Kategorie:</label>
          <select
            v-model="filterCategory"
            class="form-control filterCategory"
            required
            :disabled="!selectedBooking"
          >
            <option selected value="Choose-a-category">
              Choose a category
            </option>
            <option value="Arbeitszeit">Arbeitszeit</option>
            <option value="Pause">Pause</option>
            <option value="Krankheit">Krankheit</option>
          </select>
          <div class="form-check timeCheck">
            <input
              type="checkbox"
              class="form-check-input"
              id="deleteCheck"
              v-model="active"
              @click="removeInput()"
              :disabled="!selectedBooking"
            />
            <label class="form-check-label" for="zeiteinträge"
              >Zeiteinträge löschen</label
            >
          </div>
          <button
            class="btn btn-primary zeitErfassungsButton"
            :disabled="!selectedBooking"
          >
            Korrigieren
          </button>
        </form>
      </div>
      <div class="col-md-8 timeSelect">
        <form
          class="form-inline showTime"
          method="post"
          action="#"
          @submit="showTimeEntries($event)"
        >
          <div class="form-group mb-2">
            <label for="datum">Datum: </label>
            <input
              v-model="filterDate"
              type="date"
              class="form-control date filterDate"
              placeholder="dd/mm/yyyy"
              required
            />
          </div>
          <button class="btn btn-primary mb-2 showAddedTimes">Anzeigen</button>
        </form>
        <div id="showTimeTable">
          <table class="table zeitErfassenTable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Kommen</th>
                <th scope="col">Gehen</th>
                <th scope="col">Kategorie</th>
              </tr>
            </thead>
            <tbody class="timeTable">
              <tr
                v-for="entry of timeEntries"
                :key="entry.id"
                :id="entry.id"
                @click="selectBooking(entry.id)"
                :class="selectedBooking && selectedBooking.id === entry.id ? 'highlight' : ''"
              >
                <td>{{ entry.id }}</td>
                <td>{{ entry.bookIn }}</td>
                <td>{{ entry.bookOut }}</td>
                <td>{{ entry.category }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Zeitkorriegieren.js" />
