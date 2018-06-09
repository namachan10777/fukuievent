export function calcTotalPage(articleNumber: number, articlePerPage: number) {
	return Math.floor(((articleNumber-1) / articlePerPage))
}
