type UrlParams = {
  [key: string]: string | number;
};

type MyFetchWriteOptions<T> = {
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: UrlParams;
  body?: T;
};

type CreateInstanceOptions = {
  baseURL?: string;
};

export class MyFetch {

  baseURL?: string;

  static instance: MyFetch;

  private constructor(options: CreateInstanceOptions) {
    const sanitizedBaseURL = options.baseURL?.endsWith('/') ? options.baseURL.slice(0, -1) : options.baseURL;
    this.baseURL = sanitizedBaseURL;
    MyFetch.instance = this;
  }

  static createInstance(options: CreateInstanceOptions) {
    MyFetch.instance = new MyFetch(options);
  }

  read<T>(url: string, params?: UrlParams): Promise<T> {
    const urlWithParams = MyFetch.buildUrl(url, params);
    return fetch(urlWithParams).then(response => response.json());
  }

  write<T>(url: string, options: MyFetchWriteOptions<T>): Promise<T> {
    const urlWithParams = MyFetch.buildUrl(url, options.params);
    return fetch(urlWithParams, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options.body)
    }).then(response => response.json());
  }


  static buildUrl(url: string, params: UrlParams = {}): string {
    const urlWithParams = Object.keys(params).reduce((acc, key) => {
      return acc.replace(`:${key}`, params[key].toString());
    }, url);

    return `${this.instance.baseURL}${urlWithParams}`;
  }
}
