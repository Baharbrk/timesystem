import Vue from "vue";
import {
  getOneDayEntry as getoneDayEntryService,
  showAllTime as showAllTimeService,
} from "../services";
import "../assets/js/calendar.min";
/* global caleandar */


export default Vue.extend({
  name: "Calendar",
  data: () => ({
    showEvents: [],
    month: null,
    selectedUser: sessionStorage.getItem('userId'),
    user: {
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      isAdmin: sessionStorage.getItem('isAdmin'),
    },
    events: []
  }),
  props: {
    users: [],
  },
  methods: {
    loadCalendar(events = []) {
      const calendarSetting = {
        Color: "#999", //(string - color) font color of whole calendar.
        LinkColor: "#333", //(string - color) font color of event titles.
        NavShow: true, //(bool) show navigation arrows.
        NavVertical: false, //(bool) show previous and coming months.
        NavLocation: "#foo", //(string - element) where to display navigation, if not in default position.
        DateTimeShow: true, //(bool) show current date.
        DateTimeFormat: "mmm, yyyy", //(string - dateformat) format previously mentioned date is shown in.
        DatetimeLocation: "", //(string - element) where to display previously mentioned date, if not in default position.
        EventClick: "", //(function) a function that should instantiate on the click of any event. parameters passed in via data link attribute.
        EventTargetWholeDay: false, //(bool) clicking on the whole date will trigger event action, as opposed to just clicking on the title.
        DisabledDays: [], //(array of numbers) days of the week to be slightly transparent. ie: [1,6] to fade Sunday and Saturday.
      };

      const newEvents = events.reduce((prev, current) => {
        if (!prev.find((event) => event.date === current.date)) {
          prev.push(current);
        }
        return prev;
      }, []);

      let eventsCalendar = [];

      newEvents.forEach((value) => {
        let year = new Date(value.date).getFullYear();
        let day = new Date(value.date).getDate();
        let month = new Date(value.date).getMonth();
        let eventColor = "#5f9ea0";
        let title =
          '<div class="event" style="background-color:' +
          eventColor +
          '"><b>Zeiteintrag</b></div>';
        eventsCalendar.push({
          Date: new Date(year, month, day),
          Title: title,
          Link: function () {
            this.getoneDayEntry(
              year + "-" + String(parseInt(month) + 1) + "-" + day
            );
          },
        });
      });

      caleandar(
        document.querySelector("#calendar"),
        eventsCalendar,
        calendarSetting
      );
    },
    getoneDayEntry(filterDate) {
      const userId = this.user.isAdmin === "true" && this.selectedUser !== '' ? this.selectedUser : this.user.userId
      getoneDayEntryService(filterDate, userId)
        .then((response) => {
          this.$data.events = response.map((value) => ({
            date: value.date.split("T")[0],
            bookIn: value.bookIn,
            bookOut: value.bookOut,
            category: value.category,
          }));
        })
        .catch((e) => {
          console.log(e)
          alert(
            "Zeiteinträge in/am " +
            filterDate +
            "können nicht angezeigt werden, bitte versuchen Sie es später erneut!"
          );
        });
    },

    showAllTime(e) {
      e.preventDefault();
      const userId = this.user.isAdmin === "true" && this.selectedUser !== '' ? this.selectedUser : this.user.userId

      showAllTimeService(this.month, userId)
        .then((response) => {
          this.events = []
          this.showEvents.splice(0);
          response.forEach((v) => {
            this.events.push({
              Date: new Date(v.date),
            })
            this.showEvents.push(v);
          });
          this.loadCalendar(this.events);
        })
        .catch(() => {
          alert(
            "Zeiteinträge in/am " +
            this.month +
            "können nicht angezeigt werden, bitte versuchen Sie es später erneut!"
          );
        });
    },
  },
  mounted() {
    this.loadCalendar();
  },
});
