export function mapSeries<T, U>(
  arr: T[],
  fn: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  return arr.reduce(
    (promise, item, currentIndex) =>
      promise.then((result) =>
        fn(item, currentIndex).then((item) => [...result, item])
      ),
    Promise.resolve([] as U[])
  ) as Promise<U[]>;
}
