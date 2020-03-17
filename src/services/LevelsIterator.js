import {LevelSaver} from "./LevelSaver";

const r = require.context("../levels", false, /json/);
const levelsFiles = r
    .keys().sort(compare)
    .map(fileName => r(fileName));

function compare(first, second) {
    const firstLevelNumber = /level-(.+)\.config/.exec(first)[1];
    const secondLevelNumber = /level-(.+)\.config/.exec(second)[1];

    return Math.sign(Number(firstLevelNumber) - Number(secondLevelNumber));
}

export class LevelsIterator {
    constructor() {
        function* levelIteratorMaker(files, currentLevel) {
            for (let i = currentLevel; i < files.length; i++) {
                yield {file: files[i], levelIndex: i};
            }
        }

        this.levelIterator = levelIteratorMaker(levelsFiles, this.currentLevel);
    }

    get levelsCount() {
        return levelsFiles.length;
    }

    get currentLevel() {
        return LevelSaver.getLevel() || 0;
    }

    get currentLevelFile() {
        return levelsFiles[this.currentLevel];
    };

    isLastLevel() {
        return (Number(this.levelsCount) - Number(this.currentLevel) < 2);
    };

    getNextLevel() {
        const file = this.levelIterator.next();
        if (!file.value) {
            LevelSaver.removeLevel();

            return null;
        }
        LevelSaver.setLevel(file.value.levelIndex);

        return file.value.file;
    }
}
