export class ApiService {
  constructor(private _baseUrl: string) {}
    async get(url: string): Promise<any> {
        const response = await fetch(`${this._baseUrl}/${url}`);
        return response.json();
    }
    async post(url: string, data: any): Promise<any> {
        const response = await fetch(`${this._baseUrl}/${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
    async put(url: string, data: any): Promise<any> {
        const response = await fetch(`${this._baseUrl}/${url}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
}
