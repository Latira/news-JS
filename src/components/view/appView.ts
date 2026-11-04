import News from './news/news';
import Sources from './sources/sources';
import { NewsResp, SourcesResp } from '../controller/controller'

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: Partial<NewsResp> | null): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data?: Partial<SourcesResp> | null): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
