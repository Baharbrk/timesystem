const path = require("path");
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          include: [path.resolve(__dirname, "./src/assets/js/calendar.min.js")],
          loader: ["script-loader"],
        },
      ],
    },
  },
};
