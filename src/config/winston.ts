import winston from "winston";

const logFormat = winston.format.printf((log) => {
  const date = new Date().toLocaleString();
  return `${date} | ${log.level} | ${JSON.stringify(log.message)}`;
});

const options = {
  console: {
    level: "debug",
    format: winston.format.combine(winston.format.colorize(), logFormat),
    handleExeption: true,
    colorize: true,
    timestamp: true,
    silent: false,
  },
};

const logger = winston.createLogger({ exitOnError: false });

logger.add(new winston.transports.Console(options.console));

const stream = {
  write: function (message: string) {
    logger.info(message);
  },
};

export { stream, logger };
