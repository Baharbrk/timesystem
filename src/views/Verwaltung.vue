<template>
    <div class="container" style="margin-top:2%; width:75%">
        <div class="row w-80">
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary d-flex align-items-center"
                        @click="addUserModal=true;">
                    <i class="bi bi-plus fs-4 pe-1"/>Add New User
                </button>
                <div class="input-group w-25">
                    <span class="input-group-text"><i class="bi bi-funnel-fill"/></span>
                    <input v-model="searchparameter"
                           class="form-control"
                           placeholder="Filter User"
                           type="text"
                           @keyup.enter="searchUsers($event)"/>
                    <button class="btn btn-primary" v-on:click="searchUsers($event)">Filter</button>
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
                                        <button class="close" type="button" @click="showEditUser=false">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            <form id="timeEntryForm"
                                                  action="#"
                                                  method="post"
                                                  @submit="changeUsers($event)">
                                                <div class="form-group">
                                                    <label for="username">Username</label>
                                                    <input v-model="username" class="form-control" type="text"/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="firstname">Firstname</label>
                                                    <input v-model="userFirstName" class="form-control" type="text"/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="lastname">Lastname</label>
                                                    <input v-model="userlastName" class="form-control" type="text"/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="workinghours">Working hours</label>
                                                    <input v-model="workHours" class="form-control" type="text"/>
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
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button
                                                class="btn btn-secondary zeitErfassungsButton"
                                                @click="showEditUser=false"
                                            >
                                                Cancel
                                            </button>
                                            <button class="btn btn-primary zeitErfassungsButton"
                                                    @click="changeUsers($event)"
                                            >Edit user</button>
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
                                        <div class="modal-title">
                                            <span>Add new User</span>
                                        </div>
                                        <button
                                            class="btn-close"
                                            type="button"
                                            @click="addUserModal=false">
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
                                                    <input v-model="userFirstName" class="form-control arrive"
                                                           required type="text"/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="lastname">Lastname</label>
                                                    <input v-model="userlastName" class="form-control leave" required
                                                           type="text"/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="passwort">Password</label>
                                                    <input v-model="userPassword" class="form-control leave"
                                                           required type="password"/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="workHours">Work hours</label>
                                                    <input v-model="workHours" class="form-control leave"
                                                           placeholder="Monthly Working Hours" required type="text"/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button
                                            class="btn btn-secondary zeitErfassungsButton"
                                            @click="showModal = false"
                                        >
                                            Cancel
                                        </button>
                                        <button class="btn btn-primary zeitErfassungsButton">Add user</button>
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
                    <table class="table UserTable table table-striped table-responsive" style="margin-top: 18px;">
                        <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Work hours</th>
                            <th scope="col">Active</th>
                            <th></th>
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
                                        <i class="bi bi-pencil"/>
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
