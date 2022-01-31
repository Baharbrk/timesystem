<template>
  <div class="container" style="margin-top:20px">
      <div class="row" style="width:80%">
          <div class="col-md-8">
              <form class="form showTime"
                    method="post"
                    action="#"
                    @submit="showTimeEntries($event)">
                  <div class="form-group mb-2">
                      <label for="datum">Filter Date: </label>
                      <input v-model="filterDate"
                             type="date"
                             class="form-control date filterDate"
                             placeholder="dd/mm/yyyy" />
                  </div>
                  <button class="btn btn-primary mb-2" type="submit">Anzeigen</button>
              </form>
          </div>
          <div class="col-md-4">
              <button class="btn btn-primary mb-2" @click="showModal=true">log time</button>
          </div>
          <div v-if="showDeleteModal">
              <transition name="modal">
                  <div class="modal-mask">
                      <div class="modal-wrapper">
                          <div class="modal-dialog">
                              <div class="modal-content">
                             
                                  <div class="modal-body">
                                      <div>
                                          <p sytle="color:red">Do you really want to delete your time entry?</p>
                                          <button class="btn btn-primary" style="float: right" @click="showDeleteModal=false">No</button>
                                          <button class="btn btn-primary" style="float:right" @click="removeInput2()">Yes</button>
                                      </div>
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
                                      <h4 class="modal-title">Add time</h4>
                                      <button type="button" class="close" @click="showModal=false">
                                          <span aria-hidden="true">&times;</span>
                                      </button>
                                  </div>
                                  <div class="modal-body">
                                      <div>
                                          <form id="timeEntryForm"
                                                method="post"
                                                action="#"
                                                @submit="bookTime($event)">
                                              <div class="form-group">
                                                  <label for="Kommen">Kommen:</label>
                                                  <input v-model="arrive" type="time" class="form-control arrive" />
                                              </div>
                                              <div class="form-group">
                                                  <label for="Gehen">Gehen:</label>
                                                  <input v-model="leave" type="time" class="form-control leave" />
                                              </div>
                                              <div class="form-group">
                                                  <label for="Datum">Datum:</label>
                                                  <input v-model="date"
                                                         type="date"
                                                         class="form-control dateone"
                                                         id="chooseDate"
                                                         required />
                                              </div>
                                              <label for="Kategorie">Kategorie:</label>
                                              <select v-model="filterCategory"
                                                      class="form-control filterCategory"
                                                      required>
                                                  <option selected value="Choose-a-category">
                                                      Choose a category
                                                  </option>
                                                  <option value="Arbeitszeit">Worktime</option>
                                                  <option value="Pause">Break</option>
                                              </select>
                                              <button class="btn btn-primary zeitErfassungsButton">Log</button>
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
                                      <h4 class="modal-title">Correct time</h4>
                                      <button type="button" class="close" @click="showCorrectModal=false">
                                          <span aria-hidden="true">&times;</span>
                                      </button>
                                  </div>
                                  <div class="modal-body">
                                      <form id="timeEntryFormCorrect"
                                            action="#"
                                            method="post"
                                            @submit="correctTime($event)">
                                          <div v-if="showSelectedId" class="form-group">
                                              <label>Selected booking:</label>
                                              <input type="text" :value="selectedBooking && selectedBooking.id  ? selectedBooking.id : '---'" disabled class="form-control" />
                                          </div>
                                          <div class="form-group">
                                              <label for="Kommen">Kommen:</label>
                                              <input v-model="arrive"
                                                     type="time"
                                                     required
                                                     class="form-control arrive"
                                                     :disabled="!selectedBooking" />
                                          </div>
                                          <input v-model="timeId" type="hidden" id="custId" />
                                          <div class="form-group">
                                              <label for="Gehen">Gehen:</label>
                                              <input v-model="leave"
                                                     type="time"
                                                     required
                                                     class="form-control leave"
                                                     :disabled="!selectedBooking" />
                                          </div>
                                          <div class="form-group">
                                              <label for="Datum">Datum:</label>
                                              <input v-model="date"
                                                     type="date"
                                                     class="form-control dateone"
                                                     id="correctDate"
                                                     required
                                                     :disabled="!selectedBooking" />
                                          </div>
                                          <label for="Kategorie">Kategorie:</label>
                                          <select v-model="filterCategory"
                                                  class="form-control filterCategory"
                                                  required
                                                  :disabled="!selectedBooking">
                                              <option selected value="Choose-a-category">
                                                  Choose a category
                                              </option>
                                              <option value="Arbeitszeit">Worktime</option>
                                              <option value="Pause">Break</option>
                                          </select>

                                          <button class="btn btn-primary zeitErfassungsButton"
                                                  :disabled="!selectedBooking">
                                              Korrigieren
                                          </button>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </transition>
          </div>
      </div>
      <div class="row" style="width:80%">
          <div id="showTimeTable">
              <table class="table zeitErfassenTable">
                  <thead>
                      <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Kommen</th>
                          <th scope="col">Gehen</th>
                          <th scope="col">Kategorie</th>
                      </tr>
                  </thead>
                  <tbody class="timeTable">
                      <tr v-for="entry of timeEntries"
                          :key="entry.id"
                          :id="entry.id"
                          @click="selectBooking(entry.id)"
                          :class="selectedBooking && selectedBooking.id === entry.id ? 'highlight' : ''">
                          <td>{{ entry.filterDate }}</td>
                          <td>{{ entry.bookIn }}</td>
                          <td>{{ entry.bookOut }}</td>
                          <td>{{ entry.category }}</td>
                          <td><img style="width:25px" src="../assets/pics/edit.png" @click="selectBooking(entry.id); showCorrectModal=true"></td>
                          <td><img style="width:25px" src="../assets/pics/delete.png" @click="removeInput(entry.id); showDeleteModal=true"></td>
                          <td v-if="showTimeId">{{ entry.id }}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
      </div>
</template>

<script src="./Zeiterfassen.js"></script>
