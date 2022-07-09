export interface History {
    date: string;
    url: string;
    data: {
        Events: HistoryData[];
        Births: HistoryData[];
        Deaths: HistoryData[];
    }
}

export interface HistoryData {
    year: string;
    text: string;
    html: string;
    no_year_html: string;
    links: HistoryLinks[]
}

export interface HistoryLinks {
    title: string;
    link: string;
}