export interface HeaderContent {
  type: 'header'
  title: string
  subtitle: string
}

export interface FooterContent {
  type: 'footer'
  links: Array<{
    text: string
    url: string
  }>
}

export interface AboutContent {
  type: 'about'
  content: string
}

export type DynamicContent = HeaderContent | FooterContent | AboutContent

export interface UseDynamicContentOptions {
  type: DynamicContent['type']
  initialData?: DynamicContent
}