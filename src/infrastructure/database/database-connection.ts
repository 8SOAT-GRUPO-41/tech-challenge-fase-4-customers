export interface DatabaseConnection {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>
  transaction<T>(fn: (client: any) => Promise<T>): Promise<T>
}
