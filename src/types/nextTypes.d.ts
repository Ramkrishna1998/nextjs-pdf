export type RecursiveRecord = {
  [key in string]: string | RecursiveRecord;
};
export type Keys<T extends RecursiveRecord, K = keyof T> = K extends string
  ? T[K] extends string
    ? K
    : T[K] extends RecursiveRecord
    ? K | Keys<Extract<T[K], RecursiveRecord>>
    : never
  : never;

export type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

export type DotNestedKeys<T> = (
  T extends object
    ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<
        keyof T,
        symbol
      >]
    : ''
) extends infer D
  ? Extract<D, string>
  : never;

// type DotNestedKeys<T> = T extends ObjectId | Date | Function | Array<any>
//   ? ''
//   : (
//       T extends object
//         ? { [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}` }[Exclude<
//             keyof T,
//             symbol
//           >]
//         : ''
//     ) extends infer D
//   ? Extract<D, string>
//   : never;

export type DeepKeyOf<T> = (
  [T] extends [never]
    ? ''
    : T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${undefined extends T[K] ? '?' : ''}${DotPrefix<
          DeepKeyOf<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ''
) extends infer D
  ? Extract<D, string>
  : never;
