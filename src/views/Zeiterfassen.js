import Vue from "vue";
import * as service from "../services";

export default Vue.extend({
    name: "Zeiterfassen",
    props: {
        users: [],
    },
    data: () => ({
        leave: null,
        arrive: null,
        date: null,
        showModal: false,
        showCorrectModal: false,
        showDeleteModal: false,
        filterCategory: null,
        filterDate: null,
        showTimeId: false,
        selectedUser: sessionStorage.getItem('userId'),
        timeEntries: [],
        timeId: null,
        showSelectedId: false,
        selectedBooking: null,
        currentDate: '',
        bookedDate: null,
        user: {
            userId: sessionStorage.getItem('userId'),
            userName: sessionStorage.getItem('userName'),
            isAdmin: sessionStorage.getItem('isAdmin'),
        }
    }),
    methods: {
        bookTime(e, userId) {
            e.preventDefault();
            if (this.user.isAdmin == "true" && this.selectedUser !== '') {
                userId = parseInt(this.selectedUser);
            } else {
                userId = parseInt(this.user.userId);
            }


            let leave = this.leave;
            let arrive = this.arrive;
            var date = new Date(this.date);

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

            if (arrive === leave) {
                alert("Kommen darf nicht denselben Wert wie Gehen haben!");
                return;
            }

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
                .bookTime({
                    BookIn: this.arrive,
                    BookOut: leave,
                    category: this.filterCategory,
                    Date: date,
                    UserID: userId,
                })

                .then(() => {
                    this.filterDate = this.date;
                    this.showModal = false;
                    this.showTimeEntries();
                })
                .catch(function (result) {
                    alert(result);
                });
        },
        showTimeEntries(e) {
            e && e.preventDefault();
         
            const userId = this.user.userId
            if (this.filterDate === undefined) {
                this.filterDate = this.currentDate;
            }
            service
                .showTimeEntries(userId, this.filterDate)
                .then((response) => {
                    const timeEntries = [];
                    response.forEach((value) => {
                        timeEntries.push({
                            id: value.id,
                            filterDate: this.filterDate,
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
        showTimeEntriesCurrent() {
            if (this.filterDate == undefined) {
                this.filterDate = this.currentDate;
                
            }
            service
                .showTimeEntriesCurrent(this.user.userId, this.currentDate)
                .then((response) => {
                    const timeEntries = [];
                    response.forEach((value) => {
                        timeEntries.push({
                            id: value.id,
                            filterDate: this.filterDate,
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
                if (this.filterDate !== undefined) {
                    this.date = this.filterDate;
                } else {
                    this.date = this.currentDate;
                }
              
            } else {
                this.arrive = "";
                this.leave = "";
                this.date = "";
                this.filterCategory = "";
            }
        },
        correctTime(event) {
                event.preventDefault();
                const userId = this.user.userId
                let leave = this.leave;
                let arrive = this.arrive;
                var date = new Date(this.date);
                let timeId = this.selectedBooking.id;
                //check if leave > arrive, if true, show error and prevent booking

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
                        this.showCorrectModal = false;
                        this.showTimeEntriesCurrent();
                    })
                    .catch((e) => {
                        console.log(e)
                        alert(
                            "Der Zeiteintrag kann nicht aktualisiert werden, bitte versuchen Sie es später erneut."
                        );
                    });
        },

        removeInput(entryId) {
            this.deleteEntryId = entryId;
        },
        removeInput2() {
            service
                .removeInput(this.deleteEntryId)
                .then(() => {
                    this.showDeleteModal = false;
                    this.arrive = "";
                    this.leave = "";
                    this.date = "";
                    this.filterCategory = "";
                    this.active = false;
                    this.showTimeEntries();
                })
                .catch(function (e) {
                    console.log(e);
                    alert("Löschen ist derzeit nicht möglich!");
                })
        }
    },
    mounted() {
        var currDate = new Date(),
            month = '' + (currDate.getMonth() + 1),
            day = '' + currDate.getDate(),
            year = currDate.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        this.currentDate = year + '-' + month + '-' + day;
        this.showTimeEntriesCurrent();
        console.log(this.date)
    }
});
