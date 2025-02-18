import type { HttpRequest, HttpResponse } from '@/infrastructure/http/interfaces'

export interface Controller<I = HttpRequest, O = HttpResponse> {
  handle(input: I): Promise<O>
}
