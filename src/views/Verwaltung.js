import Vue from "vue";
import * as service from "../services";
export default Vue.extend({
    name: "Verwaltung",
    data: () => ({
        searchparameter: null,
        userFirstName: '',
        userlastName: '',
        username: '',
        userPassword: '',
        workHours: '',
        activeUser: '',
        addUserModal: false,
        users: [],
        showEditUser:false,
        selectedUser: null,
        workTime: [10, 20, 30, 40]
    }),
    methods: {
        selectUser(user) {
            this.selectedUser = user;
            this.userFirstName = user.vorname;
            this.userlastName = user.nachname;
            this.workHours = user.arbeitstunden;
            this.username = user.username;
            this.activeUser = user.aktiv;
            this.addInfoToInputsVerwaltung();
        },
        addInfoToInputsVerwaltung() {
            if (!this.selectedUser) {
                return;
            }

            sessionStorage.setItem("clicked_Userverwaltung_ID", this.selectedUser.id);
            sessionStorage.setItem(
                "clicked_Userverwaltung_Username",
                this.selectedUser.username
            );
            sessionStorage.setItem(
                "clicked_Userverwaltung_Vorname",
                this.selectedUser.vorname
            );
            sessionStorage.setItem(
                "clicked_Userverwaltung_Nachname",
                this.selectedUser.nachname
            );
            sessionStorage.setItem(
                "clicked_Userverwaltung_Passwort",
                this.selectedUser.passwort
            );
            sessionStorage.setItem(
                "clicked_Userverwaltung_Arbeitsstunden",
                this.selectedUser.arbeitstunden
            );
            sessionStorage.setItem(
                "clicked_Userverwaltung_IstAdmin",
                this.selectedUser.istAdmin
            );
            sessionStorage.setItem(
                "clicked_Userverwaltung_Aktiv",
                this.selectedUser.aktiv
            );
        },
        searchUsers(e) {
            e.preventDefault();
            service
                .searchUsers()
                .then((response) => {
                    const users = [];
                    response.forEach((value) => {
                        if (
                            value.username.toLowerCase().includes(this.searchparameter.toLowerCase()) ||
                            value.firstname.toLowerCase().includes(this.searchparameter.toLowerCase()) ||
                            value.lastname.toLowerCase().includes(this.searchparameter.toLowerCase())
                        ) {
                            users.push({
                                id: value.id,
                                username: value.username,
                                vorname: value.firstname,
                                nachname: value.lastname,
                                passwort: value.password,
                                arbeitstunden: value.targetHours,
                                istAdmin: value.admin,
                                aktiv: value.isActive,
                            });
                        }
                    });
                    this.users = users;
                })
                .catch(() => {
                    alert(
                        "User suchen funktioniert gerade nicht, bitte versuchen Sie es später erneut!"
                    );
                });
        },
        showUsers() {
            service
                .showUsers()
                .then((response) => {
                    const users = [];
                    response.forEach(function (value) {
                        if (value.isActive === true) {
                            value.isActive = 'Active';
                        } else {
                            value.isActive = 'Not Active';
                        }
                        users.push({
                            id: value.id,
                            username: value.username,
                            vorname: value.firstname,
                            nachname: value.lastname,
                            passwort: value.password,
                            arbeitstunden: value.targetHours,
                            istAdmin: value.admin,
                            aktiv: value.isActive,
                        });
                    });
                    this.users = users;
                })
                .catch(() => {
                    alert(
                        "User anzeigen funktioniert gerade nicht, bitte versuchen Sie es später erneut!"
                    );
                });
        },
        addUsers(e) {
            e.preventDefault();
            this.workHours = parseInt(this.workHours);
            var istadmin = true;
            let aktiv = true;
            service
                .addUsers({
                    firstname: this.userFirstName,
                    lastname: this.userlastName,
                    password: this.userPassword,
                    targethours: this.workHours,
                    admin: istadmin,
                    isActive: aktiv,
                })
                .then(() => {
                    this.addUserModal = false;
                    this.showUsers();
                })
                .catch(() => {
                    alert(
                        "Neuen User anlegen funktioniert gerade nicht, bitte versuchen Sie es später erneut!"
                    );
                });
        },
        changeUsers(e) {
            e && e.preventDefault();

            if (sessionStorage.getItem("clicked_Userverwaltung_Username") == null) {
                alert("Bitte selektieren Sie die zu ändernde Zeile in der Tabelle!");

                return;
            }

            var userName = this.username;
            var vorname = this.userFirstName;
            var nachname = this.userlastName;
            var arbeitspensum = this.workHours;
            arbeitspensum = parseInt(arbeitspensum);
            var aktiv = this.activeUser;

            aktiv = aktiv === "true";

            service
                .changeUsers({
                    id: this.selectedUser.id,
                    firstname: vorname,
                    lastname: nachname,
                    password: this.selectedUser.passwort,
                    targethours: arbeitspensum,
                    admin: this.selectedUser.istadmin,
                    isActive: aktiv,
                    Username: userName,
                })
                .then(() => {
                    this.showUsers();
                    this.showEditUser = false;
                    this.username = '';
                    this.userFirstName = '';
                    this.userlastName = '';
                    this.workHours = '';
                    this.activeUser = '';
                   
                })
                .catch(() => {
                    alert(
                        "User anzeigen funktioniert gerade nicht, bitte versuchen Sie es später erneut!"
                    );
                });

            sessionStorage.removeItem("clicked_Userverwaltung_Username");
            sessionStorage.removeItem("clicked_Userverwaltung_Vorname");
            sessionStorage.removeItem("clicked_Userverwaltung_Nachname");
            sessionStorage.removeItem("clicked_Userverwaltung_Passwort");
            sessionStorage.removeItem("clicked_Userverwaltung_Arbeitsstunden");
            sessionStorage.removeItem("clicked_Userverwaltung_IstAdmin");
            sessionStorage.removeItem("clicked_Userverwaltung_Aktiv");
            sessionStorage.removeItem("clicked_Userverwaltung_ID");
        },
    },
    mounted() {
        this.showUsers();
    }
});
