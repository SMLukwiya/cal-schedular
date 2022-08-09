type SSRResult<Props> = { props: Props } | { notFound: boolean }; // Server Side R Props

type SSRFn<Props> = (...args: any[]) => Promise<SSRResult<Props>>; // Server Side R Fn Props (server side results promise)

export type inferSSRProps<Tfn extends SSRFn<any>> = Tfn extends SSRFn<infer Props> ? NonNullable<Props> : never;