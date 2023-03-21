export class PrepareStatement {

  private parsed: string[]

  private params: string[] = []

  public constructor(
    private originSql: string
  ) {
    this.parsed = this.originSql.split('??')
  }

  public setString(index: number, value: string) {
    this.params[index - 1] = value
  }

  public setArray(index: number, columns: string[]) {
    this.params[index - 1] = columns.map(column => `"${column}"`).join(', ')
  }

  public setArrayValue(index: number, columns: string[]) {
    this.params[index - 1] = columns.map(column => `:${column}`).join(', ')
  }

  public toString() {
    const parsed: string[] = []
    this.parsed.forEach((item, index) => {
      parsed.push(item)
      if (index !== this.parsed.length - 1) {
        parsed.push(this.params[index])
      }
    })
    return parsed.join('')
  }
}