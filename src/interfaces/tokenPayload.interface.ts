export interface RTOPayload extends TokenPayload {
	refresh: boolean
}

// export interface ATOPayload extends TokenPayload {
// }

export interface TokenPayload {
	role: string
	_id: string
}
