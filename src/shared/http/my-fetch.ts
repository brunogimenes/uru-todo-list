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
};


export class MyFetch {
  baseURL?: string;
  static instance: MyFetch;

  private constructor(options: CreateInstanceOptions) {
    const sanitizedBaseURL = options.baseURL?.endsWith('/')
      ? options.baseURL.slice(0, -1)
      : options.baseURL;
    this.baseURL = sanitizedBaseURL;
    MyFetch.instance = this;
  }

  static createInstance(options: CreateInstanceOptions) {
    MyFetch.instance = new MyFetch(options);
  }

  async read<T>(url: string, params?: UrlParams): Promise<T> {
    const urlWithParams = MyFetch.buildUrl(url, params);

    const response = await fetch(urlWithParams);
    const data: T = await response.json();

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

    return data;
  }

  async delete(url: string, params?: UrlParams): Promise<void> {
    const urlWithParams = MyFetch.buildUrl(url, params);
    await fetch(urlWithParams, {
      method: 'DELETE',
    });
  }

  static buildUrl(url: string, params: UrlParams = {}): string {
    const urlWithParams = Object.keys(params).reduce((acc, key) => {
      return acc.replace(`:${key}`, params[key].toString());
    }, url);

    return `${this.instance.baseURL}${urlWithParams}`;
  }
}
