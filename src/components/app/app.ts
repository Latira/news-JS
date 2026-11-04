import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data))
            );
        } else {
            console.error('Container .sources not found in DOM');
        }             
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
