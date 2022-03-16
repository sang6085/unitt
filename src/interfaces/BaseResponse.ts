// export interface BaseResponse<T> {
// 	codeStatus: number;
// 	data: T;
// 	description: string;
// 	messageStatus: string;
// 	resultCode: number;
// 	resultDescription: string;
// 	time: Date;
// 	took: number;
// }

export interface BaseResponse<T> {
	data: T,
	status: number,
	statusText: string,
	headers: any,
	config: any,
	request: any,
	success: boolean
}