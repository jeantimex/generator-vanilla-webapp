const Generator = require("yeoman-generator");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the smashing vanilla-webapp generator!`));

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname,
      },
      {
        type: "input",
        name: "desc",
        message: "Description",
        default: "About this project",
      },
      {
        type: "input",
        name: "version",
        message: "Version",
        default: "1.0.0",
      },
      {
        type: "input",
        name: "author",
        message: "Author",
        default: "",
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Make the name dash-separated
    let name = this.props.name.toLocaleLowerCase().split(" ").join("-");

    // Copy all non-dotfiles in common
    this.fs.copy(this.templatePath("**/*"), this.destinationRoot());

    // Copy package.json
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        name: name,
        desc: this.props.desc,
        author: this.props.author,
        version: this.props.version,
      }
    );
  }
};
