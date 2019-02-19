const chalk = require('chalk');
const helper = require('./helper');
const CONSTANTS = require('./constants');

class SiccProgressBar {
  constructor({
    size,
    stream = process.stdout,
    complete_char = '\u2588',
    incomplete_char = '\u2591',
  } = {}) {
    this.stream = stream;
    this.MAX = size | stream.columns;
    this.DONE_CHAR = chalk.green(complete_char);
    this.TODO_CHAR = chalk.green(incomplete_char);
    this.MESSAGE_LENGTH = 20;
    this.PERCENTAGE_LENGTH = 4;
    this.OUTPUT_PADDING = 7;
  }

  getProgressBarWidth() {
    return this.MAX - this.PERCENTAGE_LENGTH - this.MESSAGE_LENGTH - this.OUTPUT_PADDING;
  }

  getPercentageString(currentPercent) {
    return helper.padStringLeft(currentPercent, this.PERCENTAGE_LENGTH - 1).concat('%');
  }

  getCurrentTaskString(message) {
    return helper.padStringRight(message, this.MESSAGE_LENGTH);
  }

  getFinishedTasksString() {
    const str = `${CONSTANTS.SPACE_CHAR}Done!`;

    return helper.padStringRight(str, this.MESSAGE_LENGTH);
  }

  start() {    
    this.draw();
  }

  mapToWidth(percent) {
    return this.getProgressBarWidth() / 100 * percent;
  }

  composeLine(currentPercent = 0, message = '') {
    const isFinished = currentPercent === 100;
    const progressPoint = currentPercent ? this.mapToWidth(currentPercent) : 0;
    const percentageString = this.getPercentageString(currentPercent);
    const currentTaskString = isFinished
      ? this.getFinishedTasksString('Done!')
      : this.getCurrentTaskString(message);
    const progressBarWidth = this.getProgressBarWidth();
    const progressBar = new Array(progressBarWidth)
      .fill(this.DONE_CHAR, 0, progressPoint)
      .fill(this.TODO_CHAR, progressPoint, progressBarWidth)
      .join('');
    
    return `${percentageString} | ${progressBar} | ${currentTaskString}`;
  }
  
  draw(currentPercent, message) {
    const toDraw = this.composeLine(currentPercent, message);
  
    this.stream.cursorTo(0);
    this.stream.write(toDraw);
  }

  stop() {
    this.draw(100);
    this.stream.write('\n');
  }
}

module.exports = SiccProgressBar;