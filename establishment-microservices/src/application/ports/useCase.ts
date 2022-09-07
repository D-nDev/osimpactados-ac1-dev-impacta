export interface useCase {
  execute(...args: any): Promise<any>
}