import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;
        if (!apiUrl || !apiKey) {
            throw new Error('Missing API_URL or API_KEY in environment variables');
        }
        super('https://rss-news-api.onrender.com/', {
            apiKey: '873023679dbc4fa0b12693f66be88561',
        });
    }
}

export default AppLoader;