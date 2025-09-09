// covert text to snake_case
// example: 'Hello World' -> 'hello_world'
// Thanks: https://stackoverflow.com/a/30511370/10796681
export const toSnakeCase = (str: string) => str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]|\d+/g)?.map(x => x.toLowerCase()).join('_')
