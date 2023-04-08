export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
