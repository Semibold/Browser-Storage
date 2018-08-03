import { metadata } from "./metadata";

interface BrowserStorageDefaultOptions {
    prefix: string;
    parse: (text: string) => any;
    stringify: (value: any) => string;
}

interface ArbitraryJsonObject {
    [name: string]: any;
}

export class BrowserStorage {
    private readonly prefix: BrowserStorageDefaultOptions["prefix"];
    private readonly parse: BrowserStorageDefaultOptions["parse"];
    private readonly stringify: BrowserStorageDefaultOptions["stringify"];

    readonly storage: Storage;

    static get metadata() {
        return metadata;
    }

    constructor(
        private readonly areaName: "localStorage" | "sessionStorage",
        private readonly options: Partial<BrowserStorageDefaultOptions> = {}
    ) {
        this.storage = self[areaName];
        this.prefix = this.options.prefix || "";
        this.parse =
            this.options.parse ||
            function(text: string): any {
                return JSON.parse(text);
            };
        this.stringify =
            this.options.stringify ||
            function(value: any): string {
                return JSON.stringify(value);
            };
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
     */
    available(): boolean {
        try {
            const x = "__storage_test__";
            this.storage.setItem(x, x);
            const ok = this.storage.getItem(x) === x;
            this.storage.removeItem(x);
            return ok;
        } catch (e) {
            return (
                e instanceof DOMException &&
                // everything except Firefox
                (e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === "QuotaExceededError" ||
                    // Firefox
                    e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                // acknowledge QuotaExceededError only if there's something already stored
                this.storage.length !== 0
            );
        }
    }

    get(keys: null | string | string[] | ArbitraryJsonObject): ArbitraryJsonObject {
        const result = {};
        if (keys === null) {
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key != null && key.slice(0, this.prefix.length) === this.prefix) {
                    const value = this.storage.getItem(key);
                    if (value != null) {
                        result[key.slice(this.prefix.length)] = this.parse(value);
                    }
                }
            }
        } else if (typeof keys === "string" || Array.isArray(keys)) {
            const xs = Array.isArray(keys) ? keys : [keys];
            xs.forEach(x => {
                const key = this.prefix + x;
                const value = this.storage.getItem(key);
                if (value != null) {
                    result[x] = this.parse(value);
                }
            });
        } else {
            Object.keys(keys).forEach(x => {
                const key = this.prefix + x;
                const value = this.storage.getItem(key);
                if (value != null) {
                    result[x] = this.parse(value);
                } else {
                    if (keys.hasOwnProperty(x)) {
                        result[x] = keys[x];
                    }
                }
            });
        }
        return result;
    }

    /**
     * @desc approximate value
     */
    getBytesInUse(keys: null | string | string[]): number {
        const caches: string[] = [];
        if (keys === null) {
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key != null && key.slice(0, this.prefix.length) === this.prefix) {
                    const value = this.storage.getItem(key);
                    if (value != null) {
                        caches.push(key, value);
                    }
                }
            }
        } else {
            const xs = Array.isArray(keys) ? keys : [keys];
            for (let i = 0; i < xs.length; i++) {
                const key = this.prefix + xs[i];
                const value = this.storage.getItem(key);
                if (value != null) {
                    caches.push(key, value);
                }
            }
        }
        try {
            return new Blob(caches).size;
        } catch (e) {
            return caches.reduce((previousValue, currentValue) => previousValue + currentValue.length, 0);
        }
    }

    set(items: ArbitraryJsonObject): void {
        Object.keys(items).forEach(x => {
            const key = this.prefix + x;
            this.storage.setItem(key, this.stringify(items[x]));
        });
    }

    remove(keys: string | string[]): void {
        const xs = Array.isArray(keys) ? keys : [keys];
        xs.forEach(x => {
            const key = this.prefix + x;
            this.storage.removeItem(key);
        });
    }

    clear(): void {
        if (this.prefix) {
            for (let i = 0; i < this.storage.length; i++) {
                const key = this.storage.key(i);
                if (key && key.slice(0, this.prefix.length) === this.prefix) {
                    this.storage.removeItem(key);
                }
            }
        } else {
            this.storage.clear();
        }
    }
}
