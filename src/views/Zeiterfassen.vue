<template>
  <div class="container" style="margin-top: 20px">
    <div class="row" style="width: 80%">
      <!-- <div class="col-md-8">
        <form
          class="form showTime"
          method="post"
          action="#"
          @submit="showTimeEntries($event)"
        >
          <div class="form-group mb-2">
            <label for="datum">Filter Date: </label>
            <input
              v-model="filterDate"
              type="date"
              class="form-control date filterDate"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <button class="btn btn-primary mb-2" type="submit">Anzeigen</button>
        </form>
      </div> -->

      <div v-if="showDeleteModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <i
                      class="
                        bi bi-exclamation-triangle-fill
                        fs-3
                        text-warning
                        pe-2
                      "
                    ></i>
                    <span>Confirm deleting the following item</span>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      @click="showDeleteModal = false"
                    />
                  </div>
                  <div class="modal-body">
                    <div>Do you really want to delete your time entry?</div>
                  </div>
                  <div class="modal-footer">
                    <button
                      class="btn btn-secondary"
                      @click="showDeleteModal = false"
                    >
                      Cancel
                    </button>
                    <button class="btn btn-primary" @click="removeInput2()">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="modal-title">
                      <span>Add Time</span>
                    </div>
                    <button
                      type="button"
                      class="btn-close"
                      @click="showModal = false"
                    />
                  </div>
                  <div class="modal-body">
                    <div>
                      <form
                        id="timeEntryForm"
                        method="post"
                        action="#"
                        @submit="bookTime($event)"
                      >
                        <div class="form-group">
                          <label for="Kommen">Kommen:</label>
                          <input
                            v-model="arrive"
                            type="time"
                            class="form-control arrive"
                          />
                        </div>
                        <div class="form-group">
                          <label for="Gehen">Gehen:</label>
                          <input
                            v-model="leave"
                            type="time"
                            class="form-control leave"
                          />
                        </div>
                        <div class="form-group">
                          <label for="Datum">Datum:</label>
                          <input
                            v-model="date"
                            type="date"
                            class="form-control dateone"
                            id="chooseDate"
                            required
                          />
                        </div>
                        <label for="Kategorie">Kategorie:</label>
                        <select
                          v-model="filterCategory"
                          class="form-select filterCategory"
                          required
                        >
                          <option selected value="Choose-a-category" disabled>
                            Choose a category
                          </option>
                          <option value="Arbeitszeit">Worktime</option>
                          <option value="Pause">Break</option>
                        </select>
                        <div class="modal-footer">
                          <button
                            class="btn btn-secondary zeitErfassungsButton"
                            @click="showModal = false"
                          >
                            Cancel
                          </button>
                          <button class="btn btn-primary zeitErfassungsButton">
                            Log
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div v-if="showCorrectModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="modal-title">
                      <i class="bi bi-pencil pe-2"></i><span>Correct time</span>
                    </div>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      @click="showCorrectModal = false"
                    />
                  </div>
                  <div class="modal-body">
                    <form
                      id="timeEntryFormCorrect"
                      action="#"
                      method="post"
                      @submit="correctTime($event)"
                    >
                      <div v-if="showSelectedId" class="form-group">
                        <label>Selected booking:</label>
                        <input
                          type="text"
                          :value="
                            selectedBooking && selectedBooking.id
                              ? selectedBooking.id
                              : '---'
                          "
                          disabled
                          class="form-control"
                        />
                      </div>
                      <div class="form-group">
                        <label for="Kommen">Kommen:</label>
                        <input
                          v-model="arrive"
                          type="time"
                          required
                          class="form-control arrive"
                          :disabled="!selectedBooking"
                        />
                      </div>
                      <input v-model="timeId" type="hidden" id="custId" />
                      <div class="form-group">
                        <label for="Gehen">Gehen:</label>
                        <input
                          v-model="leave"
                          type="time"
                          required
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
                        class="form-select filterCategory"
                        required
                        :disabled="!selectedBooking"
                      >
                        <option selected value="Choose-a-category">
                          Choose a category
                        </option>
                        <option value="Arbeitszeit">Worktime</option>
                        <option value="Pause">Break</option>
                      </select>
                      <div class="modal-footer">
                        <button
                          class="btn btn-secondary zeitErfassungsButton"
                          :disabled="!selectedBooking"
                          @click="showCorrectModal = false"
                        >
                          Cancel
                        </button>
                        <button
                          class="btn btn-primary zeitErfassungsButton"
                          :disabled="!selectedBooking"
                        >
                          Korrigieren
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="row w-80">
      <div class="d-flex justify-content-between">
        <button
          class="btn btn-primary d-flex align-items-center"
          @click="showModal = true"
        >
          <i class="bi bi-plus fs-4 pe-1" />Add booking
        </button>
        <div class="input-group w-25">
          <span class="input-group-text"><i class="bi bi-funnel-fill" /></span>
          <input
            v-model="filterDate"
            type="date"
            class="form-control"
            placeholder="select date to filter"
          />
          <button class="btn btn-primary" @click="showTimeEntries($event)">
            filter
          </button>
        </div>
      </div>
      <div id="showTimeTable" class="mt-2">
        <table
          class="
            table table-bordered table-striped table-responsive
            zeitErfassenTable
          "
        >
          <thead>
            <tr>
              <th scope="col">Date</th>
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
            >
              <td>
                <div
                  class="d-flex justify-content-between align-items-center p-1"
                >
                  <div>
                    <div>{{ entry.filterDate }}</div>
                  </div>
                  <div class="d-flex btn-group btn-group-sm">
                    <button
                      class="btn btn-outline-danger fw-bold"
                      @click="
                        removeInput(entry.id);
                        showDeleteModal = true;
                      "
                    >
                      <i class="bi bi-trash" />
                    </button>
                    <button
                      class="btn btn-outline-primary fw-bold"
                      @click="
                        selectBooking(entry.id);
                        showCorrectModal = true;
                      "
                    >
                      <i class="bi bi-pencil" />
                    </button>
                  </div>
                </div>
              </td>
              <td>{{ entry.bookIn }}</td>
              <td>{{ entry.bookOut }}</td>
              <td>{{ entry.category }}</td>
              <td v-if="showTimeId">{{ entry.id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script src="./Zeiterfassen.js"></script>
