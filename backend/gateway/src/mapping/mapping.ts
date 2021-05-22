import {merge} from "object-mapper";

export async function mergeAsync(src: Promise<any>, mapping: any, onNull?: (e: any) => any): Promise<any> {
    try {
        let result = await src;
        if (!result && onNull) {
            return Promise.reject(onNull(null));
        }
        return merge(result, mapping);
    } catch (e) {
        if (onNull) {
            throw onNull(e);
        } else {
            throw e;
        }
    }
}

export async function mergeTypedAsync<T>(src: Promise<any>, create: new () => T, mapping: any, onNull?: (e: any) => any): Promise<T> {
    try {
        let result = await src;
        if (!result && onNull) {
            return Promise.reject(onNull(null));
        }
        return merge(result, new create(), mapping);
    } catch (e) {
        if (onNull) {
            throw onNull(e);
        } else {
            throw e;
        }
    }
}

export async function mergeListAsync(src: Promise<any[]>, mapping: any, onNull?: (e: any) => any): Promise<any[]> {
    try {
        let items = await src;
        let result: any[] = [];
        for (let item of items) {
            result.push(mergeAsync(item, mapping, onNull));
        }
        return result;
    } catch (e) {
        if (onNull) {
            throw onNull(e);
        } else {
            throw e;
        }
    }
}

export async function mergeListTypedAsync<T>(src: Promise<any[]>, type: new () => T, mapping: any, onNull?: (e: any) => any): Promise<T[]> {
    try {
        let items = await src;
        let result: any[] = [];
        for (let item of items) {
            result.push(mergeTypedAsync(item, type, mapping, onNull));
        }
        return result;
    } catch (e) {
        if (onNull) {
            throw onNull(e);
        } else {
            throw e;
        }
    }
}

export function mergeList<T>(items: any[] | undefined, creator: new () => T, mapping: any, onNull?: (e: any) => any): T[] {
    try {
        if (!items && onNull) {
            throw onNull(items);
        }

        let result: T[] = [];
        for (let item of items || []) {
            if (!item && onNull) {
                throw onNull(item);
            }
            result.push(merge(item, new creator(), mapping));
        }
        return result;
    } catch (e) {
        if (onNull) {
            throw onNull(e);
        } else {
            throw e;
        }
    }
}
