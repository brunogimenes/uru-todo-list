type UrlParams = {
  [key: string]: string | number;
};

type MyFetchWriteOptions<TBody> = {
  method: 'POST' | 'PUT' | 'PATCH';
  params?: UrlParams;
  body?: TBody;
};

type CreateInstanceOptions = {
  baseURL?: string;
  cacheTTL: number;
};

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

export class MyFetch {
  baseURL?: string;
  static instance: MyFetch;
  private cache: Map<string, CacheEntry<unknown>>;
  private ttl: number;

  private constructor(options: CreateInstanceOptions) {
    const sanitizedBaseURL = options.baseURL?.endsWith('/')
      ? options.baseURL.slice(0, -1)
      : options.baseURL;
    this.baseURL = sanitizedBaseURL;
    this.cache = new Map();
    this.ttl = options.cacheTTL ?? 10000;
    MyFetch.instance = this;
  }

  static createInstance(options: CreateInstanceOptions) {
    MyFetch.instance = new MyFetch(options);
  }

  private isCacheValid(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp < this.ttl;
  }

  async read<T>(url: string, params?: UrlParams, forceRefresh: boolean = false): Promise<T> {
    const urlWithParams = MyFetch.buildUrl(url, params);

    const cacheEntry = this.cache.get(urlWithParams) as CacheEntry<T> | undefined;
    if (cacheEntry && !forceRefresh && this.isCacheValid(cacheEntry)) {
      console.log('cache hit');
      return cacheEntry.data;
    }

    const response = await fetch(urlWithParams);
    const data: T = await response.json();

    this.cache.set(urlWithParams, { data, timestamp: Date.now() });

    return data;
  }

  async write<T, TBody = object>(url: string, options: MyFetchWriteOptions<TBody>): Promise<T> {
    const urlWithParams = MyFetch.buildUrl(url, options.params);
    const response = await fetch(urlWithParams, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(options.body && { body: JSON.stringify(options.body) }),
    });
    const data: T = await response.json();
    console.log('cache clear');
    this.cache.clear();

    return data;
  }

  async delete(url: string, params?: UrlParams): Promise<void> {
    const urlWithParams = MyFetch.buildUrl(url, params);
    await fetch(urlWithParams, {
      method: 'DELETE',
    });

    this.cache = new Map();
  }

  static buildUrl(url: string, params: UrlParams = {}): string {
    const urlWithParams = Object.keys(params).reduce((acc, key) => {
      return acc.replace(`:${key}`, params[key].toString());
    }, url);

    return `${this.instance.baseURL}${urlWithParams}`;
  }
}
