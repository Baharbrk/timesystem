import Vue from "vue";
import * as service from "../services";

export default Vue.extend({
  name: "Zeitenauswerten",
  data: () => ({
    filterDate: null,
    totalTime: null,
    dates: [],
    user: {
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      isAdmin: sessionStorage.getItem('isAdmin'),
    },
    selectedUser: sessionStorage.getItem('userId'),
  }),
  props: {
    users: [],
  },
  methods: {
    getTimeEvaluate(e) {
      e.preventDefault();
          const userId = this.user.userId
          console.log(this.filterDate);
      service
          .getTimeEvaluate(userId, this.filterDate)
          .then((response) => {
              console.log(response);
          const dates = [];
          response.forEach((value) => {
            const roundedString = Number(value.differenzArbeitsZeit).toFixed(1);
            const rounded = Number(roundedString).toString();
            dates.push({
              date: value.date,
              sollArbeitsZeit: value.sollArbeitsZeit,
              istArbeitsZeit: parseInt(value.istArbeitsZeit),
              differenz: rounded,
            });
          });
          this.dates = dates;
          this.showTotalTime(userId);
        })
        .catch(function () {
          alert(
            "Zeiteinträge in/am können nicht angezeigt werden, bitte versuchen Sie es später erneut!"
          );
        });
    },
    showTotalTime(userId) {
      service
        .showTotalTime(userId, this.filterDate)
        .then((response) => {
          let num = Number(response.istArbeitsZeit);
          let roundedString = num.toFixed(1);
          roundedString = Number(roundedString);
          let num2 = Number(response.differenzArbeitsZeit);
          let roundDifferenz = num2.toFixed(1);
          roundDifferenz = Number(roundDifferenz);
          let num3 = Number(response.totalDifferenzArbeitsZeit);
          let roundedTotal = num3.toFixed(1);
          roundedTotal = Number(roundedTotal);
          roundDifferenz = roundDifferenz.toString();
          roundedTotal = roundedTotal.toString();
          this.totalTime = {
            summeSoll: response.sollArbeitsZeit.toString(),
            summeIst: roundedString.toString(),
            summeDiff: roundDifferenz,
            summeDiffGesamt: roundedTotal,
          };

        })
        .catch(function () {
          alert(
            "Zeiteinträge in/am " +
            this.filterDate +
            "können nicht angezeigt werden, bitte versuchen Sie es später erneut!"
          );
        });
    },
    getRowBackground(dateDifferenz) {
      return {
        backgroundColor: dateDifferenz.includes("-") ? "#FF5722" : "#9CCC65",
      };
    },
    downloadEx() {
      const userId = this.user.isAdmin === "true" && this.selectedUser !== '' ? this.selectedUser : this.user.userId
      const dataType =
        "application/text";

      //Create download link element
      const downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);
      const headRow = ["User", "Monat/Jahr", "Summe SOLL", "Summe IST", "Summe DIFFERENZ", "SUMME DIFFERENZ GESAMT"];
      const dataRow = [userId, this.filterDate, this.totalTime.summeSoll,this.totalTime.summeIst, this.totalTime.summeDiff, this.totalTime.summeDiffGesamt]
      const csvData = `${headRow.join(',')}\n${dataRow.join(',')}`;
      //Specify file name
      const filename = "Zeitauswertung_" + userId + "_" + this.filterDate + ".csv";

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(["\ufeff", csvData], {
          type: dataType,
        });
        console.log(blob);
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = "data:" + dataType + ", " + csvData;

        //Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }
    },
  }
});
