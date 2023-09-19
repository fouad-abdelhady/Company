export type TaskResponse ={
    id: number;
    title: string;
    description: string;
    status: number;
    staffMember: null | string; 
    grade: null | string;      
    createdAt: string;         
    lastStateChange: string; 
}