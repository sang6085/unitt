export interface BaseResponse<T> {
	data: T,
	status: number,
	statusText: string,
	headers: any,
	config: any,
	request: any,
	success: boolean
}
