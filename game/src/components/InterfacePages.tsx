type Page = 'start' | 'selectlevel' | 'play' | 'credits' | 'MapGenerator';
export interface SelectPageProps {
    onPageChange: (page: Page) => void;
}
export interface SelectLevelProps {
    onPageChange: (page: Page) => void;
    mapCount: number;
    currentLevel: number;
    onLevelChange: () => void;
}
