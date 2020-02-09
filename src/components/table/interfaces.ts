export enum RenderTypes {
    Text,
    Date,
    Barcode
}

interface DataColumn {
    id: string;
    description: string;
    renderAs: RenderTypes;
}

interface DataRecord<T> {
    [key: string]: T;
}

// interface DataRecords{
//   columns:[]
// }
