import Vue from "vue";
import * as service from "./services";

export default Vue.extend({
    name: "App",
    data: function () {return ({
        username: null,
        isAdmin: false,
        users: [],
        currentRoute: this.$route.path
    })},
    beforeUpdate() {
        this.checkLoginState();
        this.currentRoute = this.$route.path;
    },
    beforeMount() {
        this.checkLoginState();
    },
    methods: {
        checkLoginState() {
            this.$data.username = sessionStorage.getItem("userName");
            sessionStorage.removeItem("clicked_Userverwaltung_Username");
            sessionStorage.removeItem("clicked_Userverwaltung_Vorname");
            sessionStorage.removeItem("clicked_Userverwaltung_Nachname");
            sessionStorage.removeItem("clicked_Userverwaltung_Passwort");
            sessionStorage.removeItem("clicked_Userverwaltung_Arbeitsstunden");
            sessionStorage.removeItem("clicked_Userverwaltung_IstAdmin");
            sessionStorage.removeItem("clicked_Userverwaltung_Aktiv");
            sessionStorage.removeItem("clicked_Userverwaltung_ID");

            if (this.$data.username) {
                this.$data.isAdmin = sessionStorage.getItem("isAdmin") == "true";
                this.$route.path === "/" && this.$router.push("/Zeiterfassen");
            } else {
                this.$route.path !== "/" && this.$router.push("/");
            }

            //mache das feld disabled, wenn kein admin
            if (this.isAdmin && this.users && this.users.length === 0) {
                //loop durch alle angelegten user
                service
                    .showUsers()
                    .then((response) => {
                        this.users = response;
                    })
                    .catch(function () {
                        alert("not working");
                    });
            }
        },
        logOutUser: function (e) {
            e.preventDefault();
            sessionStorage.clear();
            this.$route.path !== "/" && this.$router.push("/");
        },
        toggleMenu() {
            const isCollapsed = document.querySelector(".navbar-collapse.collapse");
            const isExtended = document.querySelector(".navbar-collapse");
            if (isCollapsed) {
                isCollapsed.classList.remove("collapse");
            } else if (isExtended) {
                isExtended.classList.add("collapse");
            }
        },
    },
});
