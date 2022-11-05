const getDay = (date: string) => Number(new Date(date).toDateString()?.split(' ')?.[2]);

export { getDay };
