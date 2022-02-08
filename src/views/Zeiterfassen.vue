<template>
    <div class="container" style="margin-top: 2%; width:75%">
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
                                            aria-label="Close"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            type="button"
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
                                            class="btn-close"
                                            type="button"
                                            @click="showModal = false"
                                        />
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            <form
                                                id="timeEntryForm"
                                                action="#"
                                                method="post"
                                                @submit="bookTime($event)"
                                            >
                                                <div class="form-group">
                                                    <label for="Kommen">Start:</label>
                                                    <input
                                                        v-model="arrive"
                                                        class="form-control arrive"
                                                        type="time"
                                                    />
                                                </div>
                                                <div class="form-group">
                                                    <label for="Gehen">End:</label>
                                                    <input
                                                        v-model="leave"
                                                        class="form-control leave"
                                                        type="time"
                                                    />
                                                </div>
                                                <div class="form-group">
                                                    <label for="Datum">Date:</label>
                                                    <input
                                                        id="chooseDate"
                                                        v-model="date"
                                                        class="form-control dateone"
                                                        required
                                                        type="date"
                                                    />
                                                </div>
                                                <label for="Kategorie">Category:</label>
                                                <select
                                                    v-model="filterCategory"
                                                    class="form-select filterCategory"
                                                    required
                                                >
                                                    <option disabled selected value="Choose-a-category">
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
                                            aria-label="Close"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            type="button"
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
                                                    :value="
                            selectedBooking && selectedBooking.id
                              ? selectedBooking.id
                              : '---'
                          "
                                                    class="form-control"
                                                    disabled
                                                    type="text"
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="Kommen">Start:</label>
                                                <input
                                                    v-model="arrive"
                                                    :disabled="!selectedBooking"
                                                    class="form-control arrive"
                                                    required
                                                    type="time"
                                                />
                                            </div>
                                            <input id="custId" v-model="timeId" type="hidden"/>
                                            <div class="form-group">
                                                <label for="Gehen">End:</label>
                                                <input
                                                    v-model="leave"
                                                    :disabled="!selectedBooking"
                                                    class="form-control leave"
                                                    required
                                                    type="time"
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="Datum">Date:</label>
                                                <input
                                                    id="correctDate"
                                                    v-model="date"
                                                    :disabled="!selectedBooking"
                                                    class="form-control dateone"
                                                    required
                                                    type="date"
                                                />
                                            </div>
                                            <label for="Kategorie">Category:</label>
                                            <select
                                                v-model="filterCategory"
                                                :disabled="!selectedBooking"
                                                class="form-select filterCategory"
                                                required
                                            >
                                                <option selected value="Choose-a-category">
                                                    Choose a category
                                                </option>
                                                <option value="Arbeitszeit">Worktime</option>
                                                <option value="Pause">Break</option>
                                            </select>
                                            <div class="modal-footer">
                                                <button
                                                    :disabled="!selectedBooking"
                                                    class="btn btn-secondary zeitErfassungsButton"
                                                    @click="showCorrectModal = false"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    :disabled="!selectedBooking"
                                                    class="btn btn-primary zeitErfassungsButton"
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
                    <i class="bi bi-plus fs-4 pe-1"/>Add booking
                </button>
                <div class="input-group w-25">
                    <span class="input-group-text"><i class="bi bi-funnel-fill"/></span>
                    <input
                        v-model="filterDate"
                        class="form-control"
                        placeholder="select date to filter"
                        type="date"
                    />
                    <button class="btn btn-primary" @click="showTimeEntries($event)">
                        filter
                    </button>
                </div>
            </div>
            <div id="showTimeTable" class="mt-2">
                <table
                    class="
            table  table-striped table-responsive
            zeitErfassenTable
          "
                    style="margin-top: 18px;"
                >
                    <thead>
                    <tr>
                        <th scope="col" style="height:40%;">Date</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col">Category</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody class="timeTable">
                    <tr
                        v-for="entry of timeEntries"
                        :id="entry.id"
                        :key="entry.id"
                        @click="selectBooking(entry.id)"
                    >
                        <td>
                            <div
                                class="d-flex justify-content-between align-items-center p-1"
                            >
                                <div>
                                    <div>{{ entry.filterDate }}</div>
                                </div>
                            </div>
                        </td>
                        <td>{{ entry.bookIn }}</td>
                        <td>{{ entry.bookOut }}</td>
                        <td>{{ entry.category }}</td>
                        <td v-if="showTimeId">{{ entry.id }}</td>
                        <td class="w-25">
                            <div class="d-flex justify-content-sm-end">
                                <div class="btn-group btn-group-sm">
                                <button
                                    class="btn btn-outline-primary fw-bold"
                                    @click="
                        selectBooking(entry.id);
                        showCorrectModal = true;
                      ">
                                    <i class="bi bi-pencil"/>
                                </button>
                                <button
                                    class="btn btn-outline-danger fw-bold"
                                    @click="
                        removeInput(entry.id);
                        showDeleteModal = true;
                      ">
                                    <i class="bi bi-trash"/>
                                </button></div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script src="./Zeiterfassen.js"></script>
