export class Services{
    private static readonly BASE_URL = "https://localhost:7012/api";
    getURL(route: string){
       return `${Services.BASE_URL}${route}`;
    }
}