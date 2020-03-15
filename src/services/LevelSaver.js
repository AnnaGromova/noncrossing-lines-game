const CURRENT_LEVEL_KEY = "currentLevel";

export class LevelSaver {
    static getLevel() {
        return sessionStorage.getItem(CURRENT_LEVEL_KEY);
    }

    static setLevel(levelIndex) {
        sessionStorage.setItem(CURRENT_LEVEL_KEY, levelIndex);
    }

    static removeLevel() {
        sessionStorage.removeItem(CURRENT_LEVEL_KEY);
    }
}
