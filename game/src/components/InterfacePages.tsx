type Page = "start" | "selectlevel" | "play" | "credits";
export interface SelectPageProps {
	onPageChange: (page: Page) => void;
}
