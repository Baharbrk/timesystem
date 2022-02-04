import Vue from "vue";
import * as service from "../services";
export default Vue.extend({
    name: "Verwaltung",
    data: () => ({
        searchparameter: null,
        userFirstName: '',
        userlastName: '',
        userPassword: '',
        workHours: '',
        addUserModal: false,
        users: [],
        selectedUser: null,
        workTime: [10, 20, 30, 40]
    }),
    methods: {
        selectUser(user) {
            this.selectedUser = user;
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

            var userName = prompt(
                "Bitte geben Sie den Username an!\n\nBisheriger Wert: " +
                this.selectedUser.username,
                this.selectedUser.username
            );

            var vorname = prompt(
                "Bitte geben Sie den Vornamen an!\n\nBisheriger Wert: " + this.selectedUser.vorname,
                this.selectedUser.vorname
            );
            var nachname = prompt(
                "Bitte geben Sie den Nachnamen an!\n\nBisheriger Wert: " + this.selectedUser.nachname,
                this.selectedUser.nachname
            );
            var passwort = prompt(
                "Bitte geben Sie das Passwort an!\n\nBisheriger Wert: " + this.selectedUser.passwort,
                this.selectedUser.passwort
            );
            var arbeitspensum = prompt(
                "Bitte geben Sie das Arbeitspensum an!\nGeringfügig = 10\nTeilzeit = 20 oder 30\nVollzeit = 40\n\nBisheriger Wert: " +
                this.selectedUser.arbeitstunden,
                this.selectedUser.arbeitstunden
            );

            arbeitspensum = parseInt(arbeitspensum);

            var istadmin = prompt(
                "Soll der User Rechte als Admin haben?\nTrue\nFalse\n\nBisheriger Wert: " +
                this.selectedUser.istAdmin,
                this.selectedUser.istAdmin
            ).toLowerCase();

            istadmin = istadmin === "true";

            var aktiv = prompt(
                "Soll der User aktiv sein?\nTrue\nFalse\n\nBisheriger Wert: " + this.selectedUser.aktiv,
                this.selectedUser.aktiv
            ).toLowerCase();

            aktiv = aktiv === "true";

            if (!(vorname !== '' && nachname !== '' && passwort !== '' && (this.workTime.includes(arbeitspensum)))) {
                alert(
                    "Sie haben eine Eingabe vergessen oder den Vorgang abgebrochen!\n\nVorgang abgebrochen!"
                );
                return;
            }

            service
                .changeUsers({
                    id: this.selectedUser.id,
                    firstname: vorname,
                    lastname: nachname,
                    password: passwort,
                    targethours: arbeitspensum,
                    admin: istadmin,
                    isActive: aktiv,
                    Username: userName,
                })
                .then(() => {
                    alert("User erfolgreich bearbeitet!");
                    this.showUsers();
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
