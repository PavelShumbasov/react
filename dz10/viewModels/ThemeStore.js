import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ThemeStore {
    theme = 'light';

    constructor() {
        makeAutoObservable(this);
        this.loadTheme();
    }

    async loadTheme() {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme) {
                this.theme = savedTheme;
            }
        } catch (error) {
            console.error("Error loading theme:", error);
        }
    }

    async toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        try {
            await AsyncStorage.setItem('theme', this.theme);
        } catch (error) {
            console.error("Error saving theme:", error);
        }
    }
}

const themeStore = new ThemeStore();
export default themeStore;
