(function () {
  var Extensions = require("trimble-connect-project-workspace-api");

  async function initializeExtension() {
    this.API = await Extensions.connect(
      window.parent,
      (event, args) => {
        switch (event) {
          case "extension.command":
            // "Command executed by the user: args.data"
            switch (args.data) {
              case "information-clicked":
                window.open("/", "_self")
                break;
              case "manuals-clicked":
                window.open("/manuals", "_self")
                break;
              case "trimble-connect-guide-clicked":
                window.open("https://docs.browser.connect.trimble.com/", "_blank");
                break;
            }
            break;
          case "extension.accessToken":
            //"Accestoken or status: args.data"
            break;
          case "extension.userSettingsChanged":
            //"User settings changed!"
            break;
          default:
        }
      },
      30000
    );

    if (this.API && this.API.ui) {
      this.API.ui.setMenu({
        title: "Powered by BIMhub",
        icon: "http://extension.bimhub.lt/wp-content/uploads/2023/10/bimhub-logo.png",
        command: "main_nav_menu_clicked",
        subMenus: [
          {
            title: "Information",
            command: "information-clicked",
          },
          {
            title: "Manuals",
            command: "manuals-clicked",
          },
          {
            title: "Trimble Connect User Guide",
            icon: `https://web.connect.trimble.com/favicon.ico`,
            command: "trimble-connect-guide-clicked",
          },
        ]
      });
    } else {
      console.warn("API or API.ui is not defined.");
    }
  }

  initializeExtension();
})();
