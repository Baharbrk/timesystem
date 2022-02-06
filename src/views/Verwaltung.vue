<template>
    <div class="container">
        <div class="row" style="margin-top: 20px; margin-bottom: 20px">
            <div class="col-md-2">
                <button class="btn btn-primary mb-2 newUsers verwaltung"
                        style="width: 190px; margin-right: 30px"
                        @click="addUserModal=true;">
                    Neuen User anlegen
                </button>
            </div>
            <div class="col-md-2">
                <button class="btn btn-primary mb-2 changeUsers verwaltung"
                        style="margin-left: 20px"
                        @click="changeUsers($event)">
                    User bearbeiten
                </button>
            </div>
            <div v-if="showModal">
                <transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Edit User</h4>
                                        <button type="button" class="close" @click="showEditUser=false">
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
                                                    <label for="Kommen">Firstname</label>
                                                    <input v-model="arrive" type="time" class="form-control arrive" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="Gehen">Lastname</label>
                                                    <input v-model="leave" type="time" class="form-control leave" />
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
            <div v-if="addUserModal">
                <transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Add new User</h4>
                                        <button class="close" type="button" @click="addUserModal=false">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            <form id="adduserForm"
                                                  action="#"
                                                  method="post"
                                                  @submit="addUsers($event)">
                                                <div class="form-group">
                                                    <label for="firstname">Firstname:</label>
                                                    <input v-model="userFirstName" class="form-control arrive" type="text" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for="lastname">Lastname</label>
                                                    <input v-model="userlastName" class="form-control leave" type="text" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for="passwort">Password</label>
                                                    <input v-model="userPassword" class="form-control leave" type="password" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for="workHours">Work hours</label>
                                                    <input v-model="workHours" class="form-control leave" type="text" required />
                                                </div>
                                                <button class="btn btn-primary zeitErfassungsButton">Add user</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="col-md-6 mb-2">
                <label for="fname" style="margin-right: 7px"><b>Suche</b></label>
                <input id="searchField"
                       v-model="searchparameter"
                       name="searchField"
                       style="margin-right: 10px"
                       type="text" />
                <button class="btn btn-primary mb-2 searchUsers verwaltung"
                        v-on:click="searchUsers($event)">
                    User suchen
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 timeSelect">
                <div id="showUserTable">
                    <table class="table UserTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Vorname</th>
                                <th scope="col">Nachname</th>
                                <th scope="col">Arbeitstunden</th>
                                <th scope="col">Aktiv</th>
                            </tr>
                        </thead>
                        <tbody class="verwaltungTable">
                            <tr v-for="user in users"
                                :key="user.id"
                                :class="selectedUser && selectedUser.id === user.id ? 'highlight' : ''"
                                @click="selectUser(user)">
                                <td>{{ user.id }}</td>
                                <td>{{ user.username }}</td>
                                <td>{{ user.vorname }}</td>
                                <td>{{ user.nachname }}</td>
                                <td>{{ user.arbeitstunden }}</td>
                                <td>{{ user.aktiv }}</td>
                                <td><img style="width:25px" src="../assets/pics/edit.png" @click="selectBooking(entry.id); showCorrectModal=true"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./Verwaltung.js"></script>
<template>
    <div class="container">
        <div class="row w-80">
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary d-flex align-items-center"
                        @click="addUserModal=true;">
                    <i class="bi bi-plus fs-4 pe-1" />Add New User
                </button>
                <div class="input-group w-25">
                    <span class="input-group-text"><i class="bi bi-funnel-fill" /></span>
                    <input type="text"
                           class="form-control"
                           v-model="searchparameter"
                           placeholder="select User to filter"
                           @keyup.enter="searchUsers($event)" />
                    <button class="btn btn-primary" v-on:click="searchUsers($event)">Search</button>
                </div>
            </div>
            <div v-if="showEditUser">
                <transition name="showEditUser">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Edit User</h4>
                                        <button type="button" class="close" @click="showEditUser=false">
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
                                                    <label for="username">Username</label>
                                                    <input v-model="username" type="text" class="form-control" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="firstname">Firstname</label>
                                                    <input v-model="userFirstName" type="text" class="form-control" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="lastname">Lastname</label>
                                                    <input v-model="userlastName" type="text" class="form-control" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="workinghours">Working hours</label>
                                                    <input v-model="workHours" type="text" class="form-control" />
                                                </div>
                                                <div>
                                                    <label for="active">Active User?</label>
                                                    <select v-model="activeUser"
                                                            class="form-control"
                                                            required>
                                                        >
                                                        <option value=true>Active</option>
                                                        <option value=false>Not Active</option>
                                                    </select>
                                                </div>

                                                <button class="btn btn-primary zeitErfassungsButton" @click="changeUsers($event)">Edit User</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div v-if="addUserModal">
                <transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Add new User</h4>
                                        <button class="close" type="button" @click="addUserModal=false">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            <form id="adduserForm"
                                                  action="#"
                                                  method="post"
                                                  @submit="addUsers($event)">
                                                <div class="form-group">
                                                    <label for="firstname">Firstname:</label>
                                                    <input v-model="userFirstName" class="form-control arrive" type="text" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for="lastname">Lastname</label>
                                                    <input v-model="userlastName" class="form-control leave" type="text" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for="passwort">Password</label>
                                                    <input v-model="userPassword" class="form-control leave" type="password" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for="workHours">Work hours</label>
                                                    <input v-model="workHours" class="form-control leave" type="text" required />
                                                </div>
                                                <button class="btn btn-primary zeitErfassungsButton">Add user</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div class="row">
            <div id="timeSelect">
                <div id="showUserTable" class="mt-2">
                    <table class="table UserTable table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Firstname</th>
                                <th scope="col">Lastname</th>
                                <th scope="col">Work hours</th>
                                <th scope="col">active</th>
                            </tr>
                        </thead>
                        <tbody class="verwaltungTable">
                            <tr v-for="user in users"
                                :key="user.id"
                                @click="selectUser(user)">
                                <td>{{ user.username }}</td>
                                <td>{{ user.vorname }}</td>
                                <td>{{ user.nachname }}</td>
                                <td>{{ user.arbeitstunden }}</td>
                                <td>{{ user.aktiv }}</td>
                                <td>
                                    <div class="d-flex btn-group btn-group-sm">
                                        <button class="btn btn-outline-primary fw-bold"
                                                @click="selectUser(user); showEditUser=true">
                                            <i class="bi bi-pencil" />
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./Verwaltung.js"></script>
