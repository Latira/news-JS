import AppLoader from './appLoader';

export enum ResponseStatus {
    Ok = 'ok',
    Error = 'error'
}

export interface NewsArticle {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface NewsResp {
    status: 'ok' | 'error';
    totalResults: number;
    articles: NewsArticle[];
}

export  interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface SourcesResp {
    status: 'ok' | 'error';
    sources: NewsSource[];
}

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResp) => void): void {
        super.getResp<SourcesResp>(
            {
                endpoint: 'sources',
            },
            (data) => {
                if (data.status === ResponseStatus.Ok) {
                    callback(data);
                }
            }
        );
    }

    getNews(e: Event, callback: (data: NewsResp) => void): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement | null;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResp>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        (data) => {
                            if (data.status === ResponseStatus.Ok) {
                                callback(data);
                            }
                        }   
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement | null;
        }
    }
}

export default AppController;
