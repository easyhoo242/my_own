interface ILanguageType {
  [index: number]: string
}

const frontLanguage: ILanguageType = {
  0: 'Html',
  1: 'Css',
  2: 'JavaScript',
  3: 'Vue',
}

interface ILanguageTypeC {
  [index: string]: number
}

const frontLanguageC: ILanguageTypeC = {
  'Html': 0,
  'Css': 1,
  'JavaScript': 2,
  'Vue': 3,
}