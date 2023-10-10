module.exports = [
  {
    type: "input",
    name: "name",
    message: "Enter theme name",
    required: true,
    result(value) {
      return value.replace(/[.:-]/g, '_');
    },
  },
  {
    type: "confirm",
    name: "has_storybook",
    message: "Do you need storybook installed?",
    required: true,
    initial: true,
  },
];
