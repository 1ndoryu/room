// types/index.ts

// Interfaz para las variables de entorno
export interface Env {
    (key: string, defaultValue?: string | number | boolean): any; // Tipo genérico para env
    int(key: string, defaultValue?: number): number;
    bool(key: string, defaultValue?: boolean): boolean;
    array(key: string, defaultValue?: string[]): string[];
    // ... y otras funciones de env si las usas (url, json, etc.)
}

// Interfaz para la configuración del servidor (server.ts)
export interface ServerConfig {
    host: string;
    port: number;
    app: {
        keys: string[];
    };
    admin: {
        path: string;
        auth: {
            secret: string;
        };
        url: string;
        autoOpen: boolean;
    };
    webhooks: {
        populateRelations: boolean;
    };
    logger: any; // Podrías definir un tipo más específico para el logger
}

// Interfaz para la configuración de la base de datos (database.ts)
export interface DatabaseConfig {
    client: string;
    connection: any; // Tipo mas especifico en funcion del cliente (mysql, postgres, etc)
    pool?: any;
    // ... otras opciones de configuración de la base de datos ...
}
// Interfaz para la config de admin
export interface AdminConfig {
    auth: {
        secret: string;
    };
    apiToken: {
        salt: string;
    };
    transfer: {
        token: {
            salt: string;
        };
    };
    flags: {
        nps: boolean;
        promoteEE: boolean;
    };
}
// Puedes añadir más interfaces para otros archivos de configuración (plugins.ts, etc.)
