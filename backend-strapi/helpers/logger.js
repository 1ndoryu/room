// helpers/logger.js
const winston = require("winston");
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf, colorize } = format;

// Formato personalizado para los logs
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// Crea el logger
const logger = createLogger({
    level: "debug", // Nivel por defecto.  Se puede cambiar en server.ts
    format: combine(
        label({ label: "Strapi" }), // Etiqueta para identificar los logs
        timestamp(),
        myFormat,
    ),
    transports: [
        // Guarda los logs en archivos
        new transports.DailyRotateFile({
            filename: "logs/strapi-%DATE%.log", // Nombre del archivo con rotación diaria
            datePattern: "YYYY-MM-DD",
            zippedArchive: true, // Comprime los archivos antiguos
            maxSize: "20m", // Tamaño máximo del archivo antes de rotar
            maxFiles: "14d", // Conserva logs de hasta 14 días
            format: combine(timestamp(), myFormat),
        }),
        // También muestra los logs en la consola (con colores!)
        new transports.Console({
            format: combine(colorize(), timestamp(), myFormat),
        }),
    ],
});

module.exports = logger;
