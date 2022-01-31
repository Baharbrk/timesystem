import Vue from "vue";
import * as service from "../services";

export default Vue.extend({
  name: "Zeitkorriegieren",
  props: {
    users: [],
  },
  data: () => ({
    leave: null,
    arrive: null,
    date: null,
    timeId: null,
    active: false,
    filterCategory: null,
    filterDate: null,
    selectedUser: sessionStorage.getItem('userId'),
    timeEntries: [],
    bookedDate: null,
    selectedBooking: null,
    user: {
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      isAdmin: sessionStorage.getItem('isAdmin'),
    }
  }),
  methods: {
    correctTime(event) {
      event.preventDefault();
      const userId = this.user.isAdmin == "true" && this.selectedUser !== '' ? this.selectedUser : this.user.userId
      let leave = this.leave;
      let arrive = this.arrive;
      var date = new Date(this.date);
      let timeId = this.timeId;
      //check if leave > arrive, if true, show error and prevent booking

      //time check BEGIN
      //check if leave or arrive has leading 0s - if not add them
      if (arrive == null || arrive === "") {
        alert("Kommen muss ausgefüllt werden");
        return;
      }
      if (arrive.slice(0, 1).includes(":")) {
        arrive = "0" + arrive;
      }
      if (leave.slice(0, 1).includes(":")) {
        leave = "0" + leave;
      }
      let arrive_hour = parseInt(arrive.substring(0, 2));
      let arrive_minute = parseInt(arrive.substring(3, 5));
      let leave_hour = parseInt(leave.substring(0, 2));
      let leave_minute = parseInt(leave.substring(3, 5));
      //wenn leave leer ist, gibt es keine gehenVORkommen prüfung
      if (leave != null) {
        //wenn nicht leer, dann prüfung ob gehen = 00:00, weil sonst Stundenprüfung reversed
        if (leave !== "00:00") {
          if (leave_hour < arrive_hour) {
            alert("Gehen darf nicht vor Kommen sein!");
            return;
          } else if (
            leave_hour === arrive_hour &&
            leave_minute < arrive_minute
          ) {
            alert("Gehen darf nicht vor Kommen sein!");
            return;
          }
        } else {
          if (leave_hour < arrive_hour) {
            alert("Gehen darf nicht vor Kommen sein!");
            return;
          } else if (
            leave_hour === arrive_hour &&
            leave_minute < arrive_minute
          ) {
            alert("Gehen darf nicht vor Kommen sein!");
            return;
          }
        }
      }
      //time check END
      date = date.toISOString();

      if (!(leave.length > 0)) {
        leave = "00:00";
      }

      service
        .correctTime({
          id: parseInt(timeId),
          bookIn: arrive,
          bookOut: leave,
          category: this.filterCategory,
          userId: parseInt(userId),
          date: date,
        })
        .then(() => {
          this.filterDate = this.date;
          alert("Zeiteintrag wurde aktualisiert");
          this.showTimeEntries();
        })
        .catch((e) => {
          console.log(e)
          alert(
            "Der Zeiteintrag kann nicht aktualisiert werden, bitte versuchen Sie es später erneut."
          );
        });
    },
    showTimeEntries(e) {
      e && e.preventDefault();
      const userId = this.user.isAdmin === "true" && this.selectedUser !== '' ? this.selectedUser.id : this.user.userId
      service
        .showTimeEntries(userId, this.filterDate)
        .then((response) => {
          const timeEntries = [];
          response.forEach((value) => {
            timeEntries.push({
              id: value.id,
              bookIn: value.bookIn,
              bookOut: value.bookOut,
              category: value.category,
            });
          });
          this.timeEntries = timeEntries;
        })
        .catch(function (e) {
          console.log(e)
        });
    },
     selectBooking(id) {
      this.selectedBooking = this.timeEntries.find(entry => entry.id === id);
      if (this.selectedBooking) {
        this.arrive = this.selectedBooking.bookIn;
        this.leave = this.selectedBooking.bookOut;
        this.date = this.filterDate;
        this.filterCategory = this.selectedBooking.category;
        this.timeId = this.selectedBooking.id;
      } else {
        this.arrive = "";
        this.leave = "";
        this.date = "";
        this.filterCategory = "";
      }
     },
     removeInput() {
      service
      .removeInput(this.timeId)
      .then((response) => {
        console.log(response);
        alert("Zeiteintrag ist gelöscht");
        this.arrive = "";
        this.leave = "";
        this.date = "";
        this.filterCategory = "";
        this.active = false;
        this.showTimeEntries(event);
      })
      .catch( function(e) {
        console.log(e);
        alert("Löschen ist derzeit nicht möglich!");
      })
    }
  },
});
