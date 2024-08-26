// Define the base response type
export type ApiResponse<T> = {
    statusCode: string | null;
    data: T | null;
  };
  
  // Define the packet type for different data formats
  export type Packet =
    | unknown[]
    | string
    | number
    | boolean
    | Record<string, unknown>
    | FormData;
  